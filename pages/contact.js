import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import Layout from '../components/Layout'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Lütfen tüm gerekli alanları doldurun')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Mesaj gönderilemedi')
      }
      
      toast.success('Mesajınız başarıyla gönderildi!')
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }
  
  return (
    <>
      <Head>
        <title>İletişim - PowerBottle</title>
        <meta name="description" content="PowerBottle ile iletişime geçin. Sorularınız için 7/24 destek." />
        <meta property="og:title" content="İletişim - PowerBottle" />
        <meta property="og:description" content="PowerBottle ile iletişime geçin. Sorularınız için 7/24 destek." />
      </Head>
      
      <Layout>
        <div className="pt-16">
          <div className="container-custom py-16">
            {/* Header */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                İletişime Geçin
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Sorularınız, önerileriniz veya destek ihtiyaçlarınız için bizimle iletişime geçin. 
                Uzman ekibimiz size yardımcı olmaktan mutluluk duyar.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Mesaj Gönderin
                </h2>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Mesajınız Gönderildi!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      En kısa sürede size geri dönüş yapacağız.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="btn-primary"
                    >
                      Yeni Mesaj Gönder
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ad Soyad *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="input-field"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E-posta *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="input-field"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="+90 555 123 45 67"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Konu
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="input-field"
                        >
                          <option value="">Konu seçin</option>
                          <option value="siparis">Sipariş Sorunu</option>
                          <option value="urun">Ürün Bilgisi</option>
                          <option value="kargo">Kargo & Teslimat</option>
                          <option value="iade">İade & Değişim</option>
                          <option value="garanti">Garanti</option>
                          <option value="diger">Diğer</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mesajınız *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="input-field resize-none"
                        placeholder="Mesajınızı buraya yazın..."
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner"></div>
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Mesaj Gönder
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
              
              {/* Contact Info */}
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className="space-y-8"
              >
                {/* Contact Details */}
                <div className="card p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    İletişim Bilgileri
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary-600 mt-1" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">E-posta</h3>
                        <a href="mailto:info@powerbottle.com" className="text-primary-600 hover:text-primary-700">
                          info@powerbottle.com
                        </a>
                        <p className="text-sm text-gray-600 mt-1">
                          24 saat içinde yanıtlanır
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary-600 mt-1" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                        <a href="tel:+905551234567" className="text-primary-600 hover:text-primary-700">
                          +90 555 123 45 67
                        </a>
                        <p className="text-sm text-gray-600 mt-1">
                          Pazartesi - Cuma: 09:00 - 18:00
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary-600 mt-1" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                        <p className="text-gray-600">
                          Atatürk Caddesi No:123<br />
                          Beşiktaş, İstanbul 34353<br />
                          Türkiye
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary-600 mt-1" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Çalışma Saatleri</h3>
                        <div className="text-gray-600 space-y-1">
                          <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                          <p>Cumartesi: 10:00 - 16:00</p>
                          <p>Pazar: Kapalı</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* FAQ Link */}
                <div className="card p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Sık Sorulan Sorular
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Belki de aradığınız cevap SSS bölümünde mevcut.
                  </p>
                  <Link
                    href="/#faq"
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    SSS'yi İncele
                  </Link>
                </div>
                
                {/* Social Media */}
                <div className="card p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Sosyal Medya
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Güncel haberler ve kampanyalar için bizi takip edin.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Facebook
                    </a>
                    <a href="#" className="p-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                      Instagram
                    </a>
                    <a href="#" className="p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                      Twitter
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
