import { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import ProductShowcase from '../components/ProductShowcase'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Newsletter from '../components/Newsletter'
import { getProducts, getContent } from '../lib/airtable'

export default function Home({ products, content }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return null
  }
  
  return (
    <>
      <Head>
        <title>{content.homepage_title || 'PowerBottle - Sporcular için Su Bidonu'}</title>
        <meta 
          name="description" 
          content={content.homepage_description || 'PowerBottle, sporcular için özel olarak tasarlanmış dumbbell formunda su bidonu. Dayanıklı, ergonomik ve şık tasarım.'} 
        />
        <meta name="keywords" content="su bidonu, spor, fitness, dumbbell, PowerBottle, spor ekipmanı" />
        <meta property="og:title" content={content.homepage_title || 'PowerBottle - Sporcular için Su Bidonu'} />
        <meta property="og:description" content={content.homepage_description || 'PowerBottle, sporcular için özel olarak tasarlanmış dumbbell formunda su bidonu.'} />
        <meta property="og:image" content={content.homepage_image || '/images/og-image.jpg'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content.homepage_title || 'PowerBottle - Sporcular için Su Bidonu'} />
        <meta name="twitter:description" content={content.homepage_description || 'PowerBottle, sporcular için özel olarak tasarlanmış dumbbell formunda su bidonu.'} />
        <meta name="twitter:image" content={content.homepage_image || '/images/og-image.jpg'} />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "PowerBottle",
              "description": content.homepage_description || 'PowerBottle, sporcular için özel olarak tasarlanmış dumbbell formunda su bidonu.',
              "image": products[0]?.images?.[0] || '/images/product-1.jpg',
              "brand": {
                "@type": "Brand",
                "name": "PowerBottle"
              },
              "offers": {
                "@type": "Offer",
                "price": products[0]?.price || 299,
                "priceCurrency": "TRY",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "PowerBottle"
                }
              }
            })
          }}
        />
      </Head>
      
      <Layout>
        <Hero content={content} />
        <ProductShowcase products={products} />
        <Features content={content} />
        <Testimonials content={content} />
        <FAQ content={content} />
        <Newsletter content={content} />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  try {
    const [products, content] = await Promise.all([
      getProducts(),
      getContent()
    ])
    
    return {
      props: {
        products: products.filter(p => p.isActive),
        content
      },
      revalidate: 300 // Revalidate every 5 minutes
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      props: {
        products: [],
        content: {}
      },
      revalidate: 60
    }
  }
}
