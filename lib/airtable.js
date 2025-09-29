const Airtable = require('airtable')

// Initialize Airtable
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID)

/**
 * Fetch product data from Airtable
 */
export async function getProducts() {
  try {
    // If Airtable is not configured, return demo data
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      const demoProducts = require('../data/demo-products.json')
      return demoProducts
    }

    const records = await base(process.env.AIRTABLE_TABLE_NAME)
      .select({
        sort: [{ field: 'created', direction: 'desc' }]
      })
      .all()
    
    return records.map(record => ({
      id: record.id,
      name: record.get('name'),
      description: record.get('description'),
      price: record.get('price'),
      originalPrice: record.get('original_price'),
      images: record.get('images') || [],
      variants: record.get('variants') || [],
      stock: record.get('stock') || 0,
      weight: record.get('weight'),
      capacity: record.get('capacity'),
      features: record.get('features') || [],
      specifications: record.get('specifications') || {},
      isActive: record.get('is_active') !== false,
      slug: record.get('slug') || record.get('name')?.toLowerCase().replace(/\s+/g, '-'),
      seoTitle: record.get('seo_title'),
      seoDescription: record.get('seo_description'),
      createdAt: record.get('created'),
      updatedAt: record.get('updated')
    }))
  } catch (error) {
    console.error('Error fetching products from Airtable:', error)
    // Fallback to demo data
    const demoProducts = require('../data/demo-products.json')
    return demoProducts
  }
}

/**
 * Fetch a single product by ID or slug
 */
export async function getProduct(idOrSlug) {
  try {
    // If Airtable is not configured, return demo data
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      const demoProducts = require('../data/demo-products.json')
      return demoProducts.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null
    }

    // Try to find by ID first
    let records = await base(process.env.AIRTABLE_TABLE_NAME)
      .select({
        filterByFormula: `OR({id} = "${idOrSlug}", {slug} = "${idOrSlug}")`
      })
      .all()
    
    if (records.length === 0) {
      return null
    }
    
    const record = records[0]
    return {
      id: record.id,
      name: record.get('name'),
      description: record.get('description'),
      price: record.get('price'),
      originalPrice: record.get('original_price'),
      images: record.get('images') || [],
      variants: record.get('variants') || [],
      stock: record.get('stock') || 0,
      weight: record.get('weight'),
      capacity: record.get('capacity'),
      features: record.get('features') || [],
      specifications: record.get('specifications') || {},
      isActive: record.get('is_active') !== false,
      slug: record.get('slug') || record.get('name')?.toLowerCase().replace(/\s+/g, '-'),
      seoTitle: record.get('seo_title'),
      seoDescription: record.get('seo_description'),
      createdAt: record.get('created'),
      updatedAt: record.get('updated')
    }
  } catch (error) {
    console.error('Error fetching product from Airtable:', error)
    // Fallback to demo data
    const demoProducts = require('../data/demo-products.json')
    return demoProducts.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null
  }
}

/**
 * Fetch content data (homepage content, FAQ, etc.)
 */
export async function getContent() {
  try {
    // If Airtable is not configured, return demo data
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      const demoContent = require('../data/demo-content.json')
      return demoContent
    }

    const records = await base(process.env.AIRTABLE_CONTENT_TABLE_NAME)
      .select()
      .all()
    
    const content = {}
    records.forEach(record => {
      const key = record.get('key')
      const type = record.get('type')
      
      if (type === 'text') {
        content[key] = record.get('content')
      } else if (type === 'image') {
        content[key] = record.get('image')?.[0]?.url
      } else if (type === 'array') {
        content[key] = record.get('content') || []
      }
    })
    
    return content
  } catch (error) {
    console.error('Error fetching content from Airtable:', error)
    // Fallback to demo data
    const demoContent = require('../data/demo-content.json')
    return demoContent
  }
}

/**
 * Create a new order record in Airtable
 */
export async function createOrder(orderData) {
  try {
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      console.log('Order data (Airtable not configured):', orderData)
      return 'demo-order-id'
    }

    const record = await base('Orders').create([
      {
        fields: {
          'customer_name': orderData.customerName,
          'customer_email': orderData.customerEmail,
          'customer_phone': orderData.customerPhone,
          'shipping_address': JSON.stringify(orderData.shippingAddress),
          'items': JSON.stringify(orderData.items),
          'total_amount': orderData.totalAmount,
          'stripe_payment_intent_id': orderData.stripePaymentIntentId,
          'status': 'completed',
          'order_date': new Date().toISOString(),
          'notes': orderData.notes || ''
        }
      }
    ])
    
    return record[0].id
  } catch (error) {
    console.error('Error creating order in Airtable:', error)
    throw error
  }
}

/**
 * Update product stock after successful order
 */
export async function updateProductStock(productId, quantitySold) {
  try {
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      console.log(`Stock update (Airtable not configured): Product ${productId}, -${quantitySold}`)
      return 50 // Mock stock
    }

    const record = await base(process.env.AIRTABLE_TABLE_NAME).find(productId)
    const currentStock = record.get('stock') || 0
    const newStock = Math.max(0, currentStock - quantitySold)
    
    await base(process.env.AIRTABLE_TABLE_NAME).update([
      {
        id: productId,
        fields: {
          'stock': newStock
        }
      }
    ])
    
    return newStock
  } catch (error) {
    console.error('Error updating product stock:', error)
    throw error
  }
}

/**
 * Submit contact form to Airtable
 */
export async function submitContactForm(formData) {
  try {
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      console.log('Contact form (Airtable not configured):', formData)
      return 'demo-contact-id'
    }

    const record = await base('Contact_Submissions').create([
      {
        fields: {
          'name': formData.name,
          'email': formData.email,
          'phone': formData.phone,
          'subject': formData.subject,
          'message': formData.message,
          'submission_date': new Date().toISOString(),
          'status': 'new'
        }
      }
    ])
    
    return record[0].id
  } catch (error) {
    console.error('Error submitting contact form:', error)
    throw error
  }
}