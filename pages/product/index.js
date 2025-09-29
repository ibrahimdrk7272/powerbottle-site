import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Filter, Search } from 'lucide-react'
import Layout from '../../components/Layout'
import { getProducts } from '../../lib/airtable'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductsPage({ products: initialProducts }) {
  const { addToCart } = useCart()
  const [products, setProducts] = useState(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [selectedVariants, setSelectedVariants] = useState({})
  
  useEffect(() => {
    let filtered = [...products]
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category === selectedCategory
      )
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        default:
          return 0
      }
    })
    
    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, sortBy])
  
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
  
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))]
  
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
  
  return (
    <>
      <Head>
        <title>Ürünler - PowerBottle</title>
        <meta name="description" content="PowerBottle ürünleri. Sporcular için özel olarak tasarlanmış dumbbell formunda su bidonları." />
        <meta property="og:title" content="Ürünler - PowerBottle" />
        <meta property="og:description" content="PowerBottle ürünleri. Sporcular için özel olarak tasarlanmış dumbbell formunda su bidonları." />
        <meta property="og:type" content="website" />
      </Head>
      
      <Layout>
        <div className="pt-16">
          <div className="container-custom py-8">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                PowerBottle Ürünleri
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Sporcular için özel olarak tasarlanmış, dayanıklı ve ergonomik su bidonları
              </p>
            </div>
            
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ürün ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">Tüm Kategoriler</option>
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="name">İsme Göre</option>
                  <option value="price-low">Fiyat (Düşük-Yüksek)</option>
                  <option value="price-high">Fiyat (Yüksek-Düşük)</option>
                  <option value="newest">En Yeni</option>
                </select>
                
                {/* Results Count */}
                <div className="flex items-center text-gray-600">
                  <Filter className="h-5 w-5 mr-2" />
                  <span>{filteredProducts.length} ürün bulundu</span>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="card group hover:shadow-xl transition-all duration-300"
                >
                  {/* Product Image */}
                  <Link href={`/product/${product.slug}`}>
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={product.images?.[0] || '/images/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
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
                  </Link>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                      {product.description}
                    </p>
                    
                    {/* Variants */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="mb-4">
                        <select
                          value={selectedVariants[product.id] || 'default'}
                          onChange={(e) => handleVariantChange(product.id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        >
                          {product.variants.map((variant) => (
                            <option key={variant.value} value={variant.value}>
                              {variant.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    
                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary-600">
                          {product.price} TL
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice} TL
                          </span>
                        )}
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">4.9</span>
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
            </motion.div>
            
            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ürün bulunamadı
                </h3>
                <p className="text-gray-600 mb-6">
                  Arama kriterlerinizi değiştirerek tekrar deneyin.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                    setSortBy('name')
                  }}
                  className="btn-primary"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  try {
    const products = await getProducts()
    
    return {
      props: {
        products: products.filter(p => p.isActive)
      },
      revalidate: 300
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      props: {
        products: []
      },
      revalidate: 60
    }
  }
}
