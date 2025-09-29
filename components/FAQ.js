import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQ({ content }) {
  const [openIndex, setOpenIndex] = useState(null)
  
  const faqs = [
    {
      question: 'PowerBottle hangi malzemelerden üretiliyor?',
      answer: 'PowerBottle, BPA-free ve güvenli gıda sınıfı plastikten üretilmiştir. Tamamen geri dönüştürülebilir malzeme kullanılmaktadır.'
    },
    {
      question: 'Hangi kapasitelerde mevcut?',
      answer: 'PowerBottle 1L ve 1.5L kapasitelerde mevcuttur. Her iki boyut da aynı ergonomik dumbbell tasarımına sahiptir.'
    },
    {
      question: 'Buzlu su için uygun mu?',
      answer: 'Evet, PowerBottle -20°C ile +80°C arası sıcaklıklarda güvenle kullanılabilir. Buzlu su için özel olarak tasarlanmıştır.'
    },
    {
      question: 'Temizliği nasıl yapılır?',
      answer: 'El ile yıkayabilir veya bulaşık makinesinin üst rafında yıkayabilirsiniz. Ağız kısmı çıkarılabilir ve kolayca temizlenebilir.'
    },
    {
      question: 'Kargo süresi ne kadar?',
      answer: 'Türkiye geneli 1-2 iş günü içinde teslimat yapılmaktadır. 500 TL ve üzeri alışverişlerde kargo ücretsizdir.'
    },
    {
      question: 'Garanti süresi ne kadar?',
      answer: 'PowerBottle 2 yıl garanti ile gelir. Normal kullanımda oluşan üretim hataları ücretsiz olarak değiştirilir.'
    },
    {
      question: 'İade politikası nasıl?',
      answer: '14 gün içinde ürünü iade edebilirsiniz. Ürün kullanılmamış ve orijinal ambalajında olmalıdır. İade kargo ücreti müşteriye aittir.'
    },
    {
      question: 'Toplu alım indirimi var mı?',
      answer: 'Evet, 10 adet ve üzeri alımlarda özel indirimler uygulanmaktadır. Detaylı bilgi için iletişime geçebilirsiniz.'
    }
  ]
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  
  return (
    <section id="faq" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sık Sorulan Sorular
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              PowerBottle hakkında merak ettiklerinizin cevapları
            </p>
          </div>
          
          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-4"
              >
                <div className="card overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    
                    <div className="flex-shrink-0">
                      {openIndex === index ? (
                        <ChevronUp className="h-5 w-5 text-primary-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Sorunuz mu var?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Aradığınız cevabı bulamadıysanız, uzman ekibimiz size yardımcı olmaktan mutluluk duyar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:info@powerbottle.com"
                  className="btn-primary inline-flex items-center justify-center"
                >
                  E-posta Gönder
                </a>
                <a
                  href="tel:+905551234567"
                  className="btn-secondary inline-flex items-center justify-center"
                >
                  Telefon Et
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
