import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Mail, Phone, Home } from 'lucide-react'
import Layout from '../components/Layout'
import { useCart } from '../context/CartContext'

export default function SuccessPage() {
  const { clearCart } = useCart()
  const [sessionData, setSessionData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Get session ID from URL
    const urlParams = new URLSearchParams(window.location.search)
    const sessionId = urlParams.get('session_id')
    
    if (sessionId) {
      // In a real implementation, you would fetch session details from your backend
      // For now, we'll just simulate success
      setSessionData({
        id: sessionId,
        customer_email: 'customer@example.com',
        amount_total: 50000, // 500 TL in cents
        shipping_details: {
          name: 'Ahmet Yılmaz',
          address: {
            line1: 'Atatürk Caddesi No:123',
            city: 'İstanbul',
            postal_code: '34000',
            country: 'TR'
          }
        }
      })
    }
    
    // Clear cart on successful payment
    clearCart()
    setLoading(false)
  }, [])
  
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }
  
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-gray-600">Sipariş bilgileri yükleniyor...</p>
          </div>
        </div>
      </Layout>
    )
  }
  
  return (
    <>
      <Head>
        <title>Sipariş Başarılı - PowerBottle</title>
        <meta name="description" content="Siparişiniz başarıyla alındı. PowerBottle ürünleriniz en kısa sürede kapınızda." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="container-custom">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="max-w-2xl mx-auto"
            >
              {/* Success Icon */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Siparişiniz Alındı!
                </h1>
                
                <p className="text-xl text-gray-600">
                  PowerBottle ürünleriniz en kısa sürede kapınızda olacak.
                </p>
              </div>
              
              {/* Order Details */}
              {sessionData && (
                <div className="card p-8 mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Sipariş Detayları
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-900">Sipariş No:</p>
                        <p className="text-gray-600">{sessionData.id}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-900">E-posta:</p>
                        <p className="text-gray-600">{sessionData.customer_email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Home className="h-5 w-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-900">Teslimat Adresi:</p>
                        <p className="text-gray-600">
                          {sessionData.shipping_details?.name}
                          <br />
                          {sessionData.shipping_details?.address?.line1}
                          <br />
                          {sessionData.shipping_details?.address?.postal_code} {sessionData.shipping_details?.address?.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Next Steps */}
              <div className="card p-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Sıradaki Adımlar
                </h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        Sipariş Onayı
                      </h3>
                      <p className="text-gray-600">
                        Sipariş onay e-postası {sessionData?.customer_email} adresine gönderildi.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        Hazırlık
                      </h3>
                      <p className="text-gray-600">
                        Ürünleriniz paketleniyor ve kargo firmasına teslim ediliyor.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        Teslimat
                      </h3>
                      <p className="text-gray-600">
                        1-2 iş günü içinde kapınızda. Kargo takip numarası e-posta ile gönderilecek.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="card p-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Yardıma mı İhtiyacınız Var?
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="font-medium text-gray-900">E-posta</p>
                      <a href="mailto:info@powerbottle.com" className="text-primary-600 hover:text-primary-700">
                        info@powerbottle.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="font-medium text-gray-900">Telefon</p>
                      <a href="tel:+905551234567" className="text-primary-600 hover:text-primary-700">
                        +90 555 123 45 67
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/"
                  className="btn-primary flex-1 text-center"
                >
                  Alışverişe Devam Et
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary flex-1 text-center"
                >
                  İletişime Geç
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    </>
  )
}
