import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, Truck, Shield, RefreshCw } from 'lucide-react'
import Layout from '../components/Layout'
import { useCart } from '../context/CartContext'
import { formatPrice, calculateShipping } from '../lib/stripe'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  })
  
  useEffect(() => {
    // Redirect if cart is empty
    if (items.length === 0) {
      window.location.href = '/'
    }
  }, [items])
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleCheckout = async () => {
    if (!customerInfo.email || !customerInfo.firstName || !customerInfo.lastName) {
      toast.error('Lütfen tüm gerekli alanları doldurun')
      return
    }
    
    setIsProcessing(true)
    
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          customerEmail: customerInfo.email
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Checkout oluşturulamadı')
      }
      
      // Redirect to Stripe Checkout
      window.location.href = data.url
      
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error(error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsProcessing(false)
    }
  }
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Sepetiniz boş
            </h1>
            <a href="/" className="btn-primary">
              Alışverişe Başla
            </a>
          </div>
        </div>
      </Layout>
    )
  }
  
  const subtotal = getTotalPrice()
  const shippingCost = calculateShipping(subtotal)
  const total = subtotal + shippingCost
  
  return (
    <>
      <Head>
        <title>Ödeme - PowerBottle</title>
        <meta name="description" content="PowerBottle ürünlerinizi güvenli ödeme ile satın alın." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <Layout>
        <div className="pt-16">
          <div className="container-custom py-8">
            {/* Header */}
            <div className="mb-8">
              <a href="/cart" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Sepete Dön
              </a>
              <h1 className="text-3xl font-bold text-gray-900">
                Ödeme
              </h1>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Checkout Form */}
              <div>
                <div className="card p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Müşteri Bilgileri
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta Adresi *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ad *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={customerInfo.firstName}
                          onChange={handleInputChange}
                          className="input-field"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Soyad *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={customerInfo.lastName}
                          onChange={handleInputChange}
                          className="input-field"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon Numarası
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="+90 555 123 45 67"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Payment Info */}
                <div className="card p-8 mt-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Ödeme Bilgileri
                  </h2>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">
                      Güvenli ödeme için Stripe kullanıyoruz. Kredi kartı bilgileriniz 
                      güvenli bir şekilde işlenir ve saklanmaz.
                    </p>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl mb-1">💳</div>
                      <div className="text-xs text-gray-600">Kredi Kartı</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl mb-1">🏦</div>
                      <div className="text-xs text-gray-600">Banka Kartı</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl mb-1">📱</div>
                      <div className="text-xs text-gray-600">Mobil Ödeme</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="card p-8 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Sipariş Özeti
                  </h2>
                  
                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.variant}`} className="flex gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {item.name}
                          </h4>
                          {item.variant !== 'default' && (
                            <p className="text-sm text-gray-500">
                              Varyant: {item.variant}
                            </p>
                          )}
                          <p className="text-sm text-gray-600">
                            {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                        
                        <div className="text-sm font-medium text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Totals */}
                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Ara Toplam:</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Kargo:</span>
                      <span>
                        {shippingCost === 0 ? (
                          <span className="text-green-600">Ücretsiz</span>
                        ) : (
                          formatPrice(shippingCost)
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Toplam:</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Truck className="h-4 w-4 text-primary-600" />
                      <span>1-2 gün içinde teslimat</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Shield className="h-4 w-4 text-primary-600" />
                      <span>2 yıl garanti</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <RefreshCw className="h-4 w-4 text-primary-600" />
                      <span>14 gün iade hakkı</span>
                    </div>
                  </div>
                  
                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full mt-6 btn-primary text-lg py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="spinner"></div>
                        İşleniyor...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5" />
                        Güvenli Ödeme
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Ödeme yaparak{' '}
                    <a href="/terms" className="underline hover:no-underline">
                      kullanım şartlarını
                    </a>{' '}
                    kabul etmiş olursunuz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
