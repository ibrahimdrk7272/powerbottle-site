import { verifyWebhookSignature } from '../../lib/stripe'
import { createOrder, updateProductStock } from '../../lib/airtable'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  const payload = JSON.stringify(req.body)
  const signature = req.headers['stripe-signature']
  
  let event
  
  try {
    event = verifyWebhookSignature(payload, signature)
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message)
    return res.status(400).json({ error: 'Invalid signature' })
  }
  
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object)
        break
      
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object)
        break
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
    
    res.status(200).json({ received: true })
    
  } catch (error) {
    console.error('Error processing webhook:', error)
    res.status(500).json({ error: 'Webhook processing failed' })
  }
}

async function handleCheckoutSessionCompleted(session) {
  try {
    console.log('Processing checkout session completed:', session.id)
    
    // Extract order data from session
    const items = JSON.parse(session.metadata.items || '[]')
    const customerEmail = session.customer_email || session.customer_details?.email
    const shippingAddress = session.shipping_details?.address
    
    // Calculate total amount (excluding shipping for now)
    const totalAmount = session.amount_total / 100 // Convert from cents
    
    // Create order in Airtable
    const orderData = {
      customerName: session.customer_details?.name || 'N/A',
      customerEmail: customerEmail,
      customerPhone: session.customer_details?.phone || '',
      shippingAddress: shippingAddress ? {
        line1: shippingAddress.line1,
        line2: shippingAddress.line2,
        city: shippingAddress.city,
        postal_code: shippingAddress.postal_code,
        country: shippingAddress.country
      } : {},
      items: items,
      totalAmount: totalAmount,
      stripePaymentIntentId: session.payment_intent,
      notes: `Checkout session: ${session.id}`
    }
    
    const orderId = await createOrder(orderData)
    console.log('Order created in Airtable:', orderId)
    
    // Update product stock
    for (const item of items) {
      try {
        await updateProductStock(item.id, item.quantity)
        console.log(`Updated stock for product ${item.id}: -${item.quantity}`)
      } catch (error) {
        console.error(`Failed to update stock for product ${item.id}:`, error)
      }
    }
    
    // Send confirmation email (optional)
    // await sendOrderConfirmationEmail(orderData)
    
  } catch (error) {
    console.error('Error handling checkout session completed:', error)
    throw error
  }
}

async function handlePaymentIntentSucceeded(paymentIntent) {
  try {
    console.log('Payment intent succeeded:', paymentIntent.id)
    
    // Additional processing if needed
    // For example, sending confirmation emails, updating internal systems, etc.
    
  } catch (error) {
    console.error('Error handling payment intent succeeded:', error)
    throw error
  }
}

async function handlePaymentFailed(paymentIntent) {
  try {
    console.log('Payment intent failed:', paymentIntent.id)
    
    // Handle failed payment
    // For example, send notification to customer, update order status, etc.
    
  } catch (error) {
    console.error('Error handling payment failed:', error)
    throw error
  }
}

// Disable body parsing for webhooks
export const config = {
  api: {
    bodyParser: false,
  },
}