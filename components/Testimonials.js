import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

export default function Testimonials({ content }) {
  const testimonials = [
    {
      name: 'Ahmet Yılmaz',
      role: 'Fitness Antrenörü',
      image: '/images/testimonial-1.jpg',
      rating: 5,
      text: 'PowerBottle gerçekten harika bir ürün. Antrenmanlarım sırasında hiç sızıntı yaşamadım ve dumbbell formu sayesinde çok rahat kullanabiliyorum. Kesinlikle tavsiye ederim!'
    },
    {
      name: 'Zeynep Kaya',
      role: 'CrossFit Sporcusu',
      image: '/images/testimonial-2.jpg',
      rating: 5,
      text: 'Uzun süredir arıyordum böyle bir ürün. Kalitesi mükemmel, tasarımı çok şık. Spor salonunda herkes soruyor nereden aldığımı. Teşekkürler PowerBottle!'
    },
    {
      name: 'Mehmet Demir',
      role: 'Maraton Koşucusu',
      image: '/images/testimonial-3.jpg',
      rating: 5,
      text: 'Koşu antrenmanlarımda PowerBottle\'u kullanıyorum. Ergonomik tasarımı sayesinde hiç rahatsızlık vermiyor. Dayanıklılığı da gerçekten etkileyici.'
    },
    {
      name: 'Ayşe Özkan',
      role: 'Yoga Eğitmeni',
      image: '/images/testimonial-4.jpg',
      rating: 5,
      text: 'Yoga derslerimde öğrencilerime PowerBottle\'u öneriyorum. BPA-free olması ve güvenli tasarımı çok önemli. Müşteri hizmetleri de çok ilgili.'
    }
  ]
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
              Müşteri Yorumları
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              PowerBottle kullanan sporcuların gerçek deneyimleri
            </p>
          </motion.div>
          
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card p-6 hover:shadow-lg transition-all duration-300"
              >
                {/* Quote Icon */}
                <div className="flex justify-center mb-4">
                  <Quote className="h-8 w-8 text-primary-200" />
                </div>
                
                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                {/* Customer Info */}
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Overall Rating */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-8 w-8 text-yellow-300 fill-current"
                />
              ))}
            </div>
            
            <h3 className="text-3xl font-bold mb-2">
              4.9/5 Ortalama Puan
            </h3>
            
            <p className="text-xl mb-6 opacity-90">
              2,847 müşteri değerlendirmesi
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl font-bold mb-1">98%</div>
                <div className="opacity-90">Tekrar Satın Alır</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">96%</div>
                <div className="opacity-90">Tavsiye Eder</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">99%</div>
                <div className="opacity-90">Kaliteden Memnun</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
