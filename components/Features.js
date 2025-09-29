import { motion } from 'framer-motion'
import { Shield, Zap, Droplets, Award, Truck, Headphones } from 'lucide-react'

export default function Features({ content }) {
  const features = [
    {
      icon: Shield,
      title: 'Dayanıklı Tasarım',
      description: 'BPA-free malzeme ile üretilmiş, çatlamaya karşı dayanıklı yapı'
    },
    {
      icon: Zap,
      title: 'Ergonomik Tutuş',
      description: 'Dumbbell formu sayesinde kolay tutuş ve antrenman sırasında rahat kullanım'
    },
    {
      icon: Droplets,
      title: 'Sızdırmaz Kapak',
      description: 'Çift katmanlı kapak sistemi ile hiç sızıntı olmayan güvenli tasarım'
    },
    {
      icon: Award,
      title: 'Premium Kalite',
      description: 'Sporcular tarafından test edilmiş, profesyonel standartlarda üretim'
    },
    {
      icon: Truck,
      title: 'Hızlı Kargo',
      description: 'Türkiye geneli ücretsiz kargo, 1-2 gün içinde kapınızda'
    },
    {
      icon: Headphones,
      title: '7/24 Destek',
      description: 'Uzman ekibimiz her zaman yanınızda, sorularınız için ulaşabilirsiniz'
    }
  ]
  
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
    <section className="section-padding bg-gray-50">
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
              Neden PowerBottle?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sporcular için özel olarak tasarlanmış özellikler ve kalite standartları
            </p>
          </motion.div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card p-8 text-center hover:shadow-lg transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <feature.icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-white rounded-2xl p-8 md:p-12 text-center"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              10.000+ Mutlu Sporcu
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              PowerBottle, Türkiye'deki binlerce sporcu tarafından tercih ediliyor. 
              Dayanıklılığı, ergonomik tasarımı ve kalitesi ile antrenman deneyiminizi 
              bir üst seviyeye taşıyor.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
                <div className="text-gray-600">Satılan Ürün</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">4.9/5</div>
                <div className="text-gray-600">Müşteri Puanı</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">99%</div>
                <div className="text-gray-600">Memnuniyet</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
                <div className="text-gray-600">Destek</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
