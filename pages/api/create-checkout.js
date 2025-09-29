import { createCheckoutSession, calculateShipping } from '../../lib/stripe'
import { getProduct } from '../../lib/airtable'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  try {
    const { items, customerEmail } = req.body
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items are required' })
    }
    
    // Validate items and get product details
    const validatedItems = []
    let totalAmount = 0
    
    for (const item of items) {
      const product = await getProduct(item.id)
      
      if (!product) {
        return res.status(400).json({ error: `Product ${item.id} not found` })
      }
      
      if (!product.isActive) {
        return res.status(400).json({ error: `Product ${product.name} is not available` })
      }
      
      // Check stock
      const currentStock = product.stock || 0
      if (currentStock < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient stock for ${product.name}. Available: ${currentStock}` 
        })
      }
      
      // Get variant price if applicable
      let itemPrice = product.price
      if (item.variant && item.variant !== 'default') {
        const variant = product.variants?.find(v => v.value === item.variant)
        if (variant && variant.price) {
          itemPrice = variant.price
        }
      }
      
      validatedItems.push({
        id: product.id,
        name: product.name,
        price: itemPrice,
        quantity: item.quantity,
        variant: item.variant || 'default',
        image: product.images?.[0] || '/images/placeholder.jpg'
      })
      
      totalAmount += itemPrice * item.quantity
    }
    
    // Calculate shipping
    const shippingCost = calculateShipping(totalAmount)
    const finalAmount = totalAmount + shippingCost
    
    // Create checkout session
    const successUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/cart`
    
    const { sessionId, url } = await createCheckoutSession(
      validatedItems,
      customerEmail,
      successUrl,
      cancelUrl
    )
    
    // Add shipping as line item if applicable
    if (shippingCost > 0) {
      // Note: In a real implementation, you might want to add shipping as a separate line item
      // For now, we'll include it in the total amount
    }
    
    res.status(200).json({
      sessionId,
      url,
      totalAmount: finalAmount,
      shippingCost
    })
    
  } catch (error) {
    console.error('Error creating checkout session:', error)
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}