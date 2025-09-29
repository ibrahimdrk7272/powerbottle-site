const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

/**
 * Create a Stripe checkout session
 */
export async function createCheckoutSession(items, customerEmail = null, successUrl, cancelUrl) {
  try {
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'try', // Turkish Lira
        product_data: {
          name: item.name,
          description: item.variant !== 'default' ? `Varyant: ${item.variant}` : undefined,
          images: item.image ? [item.image] : undefined,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }))
    
    const sessionParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        items: JSON.stringify(items.map(item => ({
          id: item.id,
          name: item.name,
          variant: item.variant,
          quantity: item.quantity
        })))
      }
    }
    
    // Add customer email if provided
    if (customerEmail) {
      sessionParams.customer_email = customerEmail
    }
    
    // Add shipping address collection
    sessionParams.shipping_address_collection = {
      allowed_countries: ['TR'], // Only Turkey for now
    }
    
    const session = await stripe.checkout.sessions.create(sessionParams)
    
    return {
      sessionId: session.id,
      url: session.url
    }
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error)
    throw error
  }
}

/**
 * Verify Stripe webhook signature
 */
export function verifyWebhookSignature(payload, signature) {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
    return event
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message)
    throw error
  }
}

/**
 * Retrieve a Stripe payment intent
 */
export async function getPaymentIntent(paymentIntentId) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    return paymentIntent
  } catch (error) {
    console.error('Error retrieving payment intent:', error)
    throw error
  }
}

/**
 * Create a Stripe customer
 */
export async function createCustomer(customerData) {
  try {
    const customer = await stripe.customers.create({
      email: customerData.email,
      name: customerData.name,
      phone: customerData.phone,
      metadata: {
        source: 'powerbottle_website'
      }
    })
    
    return customer
  } catch (error) {
    console.error('Error creating Stripe customer:', error)
    throw error
  }
}

/**
 * Calculate shipping cost based on order value and location
 */
export function calculateShipping(totalAmount) {
  // Free shipping for orders over 500 TL
  if (totalAmount >= 500) {
    return 0
  }
  
  // Standard shipping cost
  return 25 // 25 TL
}

/**
 * Format price for display
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Calculate tax (KDV) for Turkey
 */
export function calculateTax(amount) {
  return Math.round(amount * 0.18) // 18% KDV
}