import { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import ProductShowcase from '../components/ProductShowcase'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Newsletter from '../components/Newsletter'

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
        <title>{content.homepage_title}</title>
        <meta name="description" content={content.homepage_description} />
        <meta name="keywords" content="su bidonu, spor, fitness, dumbbell, PowerBottle, spor ekipmanı" />
        <meta property="og:title" content={content.homepage_title} />
        <meta property="og:description" content={content.homepage_description} />
        <meta property="og:image" content={content.homepage_image} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content.homepage_title} />
        <meta name="twitter:description" content={content.homepage_description} />
        <meta name="twitter:image" content={content.homepage_image} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "PowerBottle",
              "description": content.homepage_description,
              "image": products[0]?.image || '/images/product-1.jpg',
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
        <Hero />
        <ProductShowcase products={products} />
        <Features />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </Layout>
    </>
  )
}

// ✅ Airtable yerine static dummy data
export async function getStaticProps() {
  const products = [
    { id: 1, name: 'PowerBottle 1L', price: '₺199', image: '/images/bottle1.jpg' },
    { id: 2, name: 'PowerBottle 2L', price: '₺249', image: '/images/bottle2.jpg' }
  ]

  const content = {
    homepage_title: 'PowerBottle - Sporcular için Su Bidonu',
    homepage_description: 'Dayanıklı, ergonomik ve şık dumbbell formunda su bidonu.',
    homepage_image: '/images/og-image.jpg'
  }

  return {
    props: {
      products,
      content
    }
  }
}
