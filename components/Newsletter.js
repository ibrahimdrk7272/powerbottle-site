import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Newsletter({ content }) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Lütfen e-posta adresinizi girin')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would typically send the email to your backend
      // For now, we'll just show a success message
      toast.success('Başarıyla abone oldunuz!')
      setIsSubscribed(true)
      setEmail('')
    } catch (error) {
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-white"
        >
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Mail className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Güncel Kalın
            </h2>
            
            <p className="text-xl opacity-90 mb-8">
              PowerBottle'dan özel indirimler, yeni ürün duyuruları ve 
              spor ipuçları için e-posta listemize katılın.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E-posta adresiniz"
                      className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4" />
                        Abone Ol
                      </>
                    )}
                  </button>
                </div>
                
                <p className="text-sm opacity-75 mt-4">
                  E-posta adresinizi paylaşarak{' '}
                  <a href="/privacy" className="underline hover:no-underline">
                    gizlilik politikamızı
                  </a>{' '}
                  kabul etmiş olursunuz.
                </p>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-3 text-lg">
                <Check className="h-6 w-6" />
                <span>Başarıyla abone oldunuz!</span>
              </div>
            )}
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold mb-2">5,000+</div>
                <div className="opacity-90">Abone</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">%15</div>
                <div className="opacity-90">İlk Sipariş İndirimi</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">Haftalık</div>
                <div className="opacity-90">Güncellemeler</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
