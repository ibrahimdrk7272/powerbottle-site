import Link from 'next/link'
import { Dumbbell, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    'Ürünler': [
      { name: 'PowerBottle 1L', href: '/product/powerbottle-1l' },
      { name: 'PowerBottle 1.5L', href: '/product/powerbottle-1-5l' },
      { name: 'Aksesuarlar', href: '/accessories' },
      { name: 'Yedek Parçalar', href: '/spare-parts' }
    ],
    'Şirket': [
      { name: 'Hakkımızda', href: '/about' },
      { name: 'Kariyer', href: '/careers' },
      { name: 'Basın', href: '/press' },
      { name: 'Partnerlik', href: '/partnership' }
    ],
    'Destek': [
      { name: 'Sık Sorulan Sorular', href: '/faq' },
      { name: 'Kargo & Teslimat', href: '/shipping' },
      { name: 'İade & Değişim', href: '/returns' },
      { name: 'Garanti', href: '/warranty' }
    ],
    'Yasal': [
      { name: 'Gizlilik Politikası', href: '/privacy' },
      { name: 'Kullanım Şartları', href: '/terms' },
      { name: 'Çerez Politikası', href: '/cookies' },
      { name: 'KVKK', href: '/kvkk' }
    ]
  }
  
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/powerbottle' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/powerbottle' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/powerbottle' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/powerbottle' }
  ]
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-primary-600 rounded-lg">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">PowerBottle</span>
              </Link>
              
              <p className="text-gray-300 mb-6 max-w-md">
                Sporcular için özel olarak tasarlanmış dumbbell formunda su bidonu. 
                Dayanıklı, ergonomik ve şık tasarım ile antrenmanlarınızı bir üst seviyeye taşıyın.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="h-5 w-5 text-primary-400" />
                  <a href="mailto:info@powerbottle.com" className="hover:text-white transition-colors">
                    info@powerbottle.com
                  </a>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="h-5 w-5 text-primary-400" />
                  <a href="tel:+905551234567" className="hover:text-white transition-colors">
                    +90 555 123 45 67
                  </a>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="h-5 w-5 text-primary-400" />
                  <span>İstanbul, Türkiye</span>
                </div>
              </div>
            </div>
            
            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-4">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} PowerBottle. Tüm hakları saklıdır.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-primary-600 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>Güvenli Ödeme:</span>
              <div className="flex items-center space-x-1">
                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center text-xs font-bold">
                  💳
                </div>
                <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center text-xs font-bold">
                  🏦
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
