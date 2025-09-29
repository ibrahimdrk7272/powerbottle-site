import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductShowcase({ products }) {
  const { addToCart } = useCart()
  const [selectedVariants, setSelectedVariants] = useState({})
  
  const handleAddToCart = (product) => {
    const variant = selectedVariants[product.id] || 'default'
    addToCart(product, variant, 1)
    toast.success(`${product.name} sepete eklendi!`)
  }
  
  const handleVariantChange = (productId, variant) => {
    setSelectedVariants(prev => ({
      ...prev,
      [productId]: variant
    }))
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }
  
  if (!products || products.length === 0) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ürünlerimiz
            </h2>
            <p className="text-gray-600">
              Şu anda ürün bulunmuyor. Lütfen daha sonra tekrar kontrol edin.
            </p>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              PowerBottle Ürünleri
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sporcular için özel olarak tasarlanmış, dayanıklı ve ergonomik su bidonları
            </p>
          </motion.div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="card group hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.images?.[0] || '/images/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                      <Heart className="h-4 w-4 text-gray-700" />
                    </button>
                    <Link
                      href={`/product/${product.slug}`}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    >
                      <Eye className="h-4 w-4 text-gray-700" />
                    </Link>
                  </div>
                  
                  {/* Stock Badge */}
                  {product.stock <= 5 && product.stock > 0 && (
                    <div className="absolute top-4 left-4 bg-secondary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Son {product.stock} adet!
                    </div>
                  )}
                  
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium">
                        Stokta Yok
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Variants */}
                  {product.variants && product.variants.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Varyant:
                      </label>
                      <select
                        value={selectedVariants[product.id] || 'default'}
                        onChange={(e) => handleVariantChange(product.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        {product.variants.map((variant) => (
                          <option key={variant.value} value={variant.value}>
                            {variant.name} - {variant.price ? `${variant.price} TL` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary-600">
                        {product.price} TL
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-lg text-gray-500 line-through">
                          {product.originalPrice} TL
                        </span>
                      )}
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">(127)</span>
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {product.stock === 0 ? 'Stokta Yok' : 'Sepete Ekle'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* View All Products Button */}
          <motion.div variants={itemVariants} className="text-center">
            <Link
              href="/product"
              className="btn-secondary inline-flex items-center gap-2"
            >
              Tüm Ürünleri Gör
              <Eye className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
