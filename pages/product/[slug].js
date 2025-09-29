import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Share2, Star, Check, Truck, Shield, RefreshCw } from 'lucide-react'
import Layout from '../../components/Layout'
import { getProduct, getProducts } from '../../lib/airtable'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductPage({ product }) {
  const router = useRouter()
  const { addToCart, getItemQuantity } = useCart()
  const [selectedVariant, setSelectedVariant] = useState('default')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0].value)
    }
  }, [product])
  
  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Ürün bulunamadı
            </h1>
            <button
              onClick={() => router.push('/')}
              className="btn-primary"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </Layout>
    )
  }
  
  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    
    try {
      addToCart(product, selectedVariant, quantity)
      toast.success(`${product.name} sepete eklendi!`)
    } catch (error) {
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsAddingToCart(false)
    }
  }
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link kopyalandı!')
    }
  }
  
  const currentVariant = product.variants?.find(v => v.value === selectedVariant)
  const currentPrice = currentVariant?.price || product.price
  const currentStock = currentVariant?.stock || product.stock
  
  return (
    <>
      <Head>
        <title>{product.seoTitle || `${product.name} - PowerBottle`}</title>
        <meta 
          name="description" 
          content={product.seoDescription || product.description} 
        />
        <meta property="og:title" content={product.seoTitle || product.name} />
        <meta property="og:description" content={product.seoDescription || product.description} />
        <meta property="og:image" content={product.images?.[0]} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/product/${product.slug}`} />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": product.name,
              "description": product.description,
              "image": product.images,
              "brand": {
                "@type": "Brand",
                "name": "PowerBottle"
              },
              "offers": {
                "@type": "Offer",
                "price": currentPrice,
                "priceCurrency": "TRY",
                "availability": currentStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                "seller": {
                  "@type": "Organization",
                  "name": "PowerBottle"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "127"
              }
            })
          }}
        />
      </Head>
      
      <Layout>
        <div className="pt-16">
          <div className="container-custom py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                  <Image
                    src={product.images?.[selectedImageIndex] || '/images/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {/* Image Navigation */}
                  {product.images && product.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                        disabled={selectedImageIndex === 0}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full disabled:opacity-50"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => setSelectedImageIndex(Math.min(product.images.length - 1, selectedImageIndex + 1))}
                        disabled={selectedImageIndex === product.images.length - 1}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full disabled:opacity-50"
                      >
                        →
                      </button>
                    </>
                  )}
                </div>
                
                {/* Thumbnail Images */}
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                          index === selectedImageIndex 
                            ? 'border-primary-600' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div className="space-y-6">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500">
                  <a href="/" className="hover:text-primary-600">Ana Sayfa</a>
                  <span className="mx-2">/</span>
                  <a href="/product" className="hover:text-primary-600">Ürünler</a>
                  <span className="mx-2">/</span>
                  <span className="text-gray-900">{product.name}</span>
                </nav>
                
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">(127 değerlendirme)</span>
                </div>
                
                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary-600">
                    {currentPrice} TL
                  </span>
                  {product.originalPrice && product.originalPrice > currentPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {product.originalPrice} TL
                    </span>
                  )}
                </div>
                
                {/* Description */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                
                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Varyant Seçin:
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {product.variants.map((variant) => (
                        <button
                          key={variant.value}
                          onClick={() => setSelectedVariant(variant.value)}
                          className={`p-4 border-2 rounded-lg text-left transition-colors ${
                            selectedVariant === variant.value
                              ? 'border-primary-600 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-medium text-gray-900">
                            {variant.name}
                          </div>
                          {variant.price && (
                            <div className="text-sm text-primary-600 font-medium">
                              {variant.price} TL
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quantity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Miktar:
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-gray-50 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-3 font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                        disabled={quantity >= currentStock}
                        className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                    
                    <span className="text-sm text-gray-500">
                      {currentStock > 0 ? `${currentStock} adet stokta` : 'Stokta yok'}
                    </span>
                  </div>
                </div>
                
                {/* Add to Cart */}
                <div className="space-y-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={currentStock === 0 || isAddingToCart}
                    className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="spinner"></div>
                        Ekleniyor...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5" />
                        {currentStock === 0 ? 'Stokta Yok' : 'Sepete Ekle'}
                      </>
                    )}
                  </button>
                  
                  <div className="flex gap-4">
                    <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
                      <Heart className="h-4 w-4" />
                      Favorilere Ekle
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex-1 btn-secondary flex items-center justify-center gap-2"
                    >
                      <Share2 className="h-4 w-4" />
                      Paylaş
                    </button>
                  </div>
                </div>
                
                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary-600" />
                    <span className="text-sm text-gray-600">Ücretsiz Kargo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary-600" />
                    <span className="text-sm text-gray-600">2 Yıl Garanti</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RefreshCw className="h-5 w-5 text-primary-600" />
                    <span className="text-sm text-gray-600">14 Gün İade</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Features */}
            {product.features && product.features.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Ürün Özellikleri
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  try {
    const products = await getProducts()
    const paths = products.map((product) => ({
      params: { slug: product.slug },
    }))
    
    return {
      paths,
      fallback: 'blocking'
    }
  } catch (error) {
    console.error('Error generating static paths:', error)
    return {
      paths: [],
      fallback: 'blocking'
    }
  }
}

export async function getStaticProps({ params }) {
  try {
    const product = await getProduct(params.slug)
    
    if (!product) {
      return {
        notFound: true,
      }
    }
    
    return {
      props: {
        product,
      },
      revalidate: 300
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      notFound: true,
    }
  }
}
