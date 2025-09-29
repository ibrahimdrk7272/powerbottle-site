import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/stripe'

export default function Cart({ isOpen, onClose }) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  
  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Redirect to checkout
    window.location.href = '/checkout'
  }
  
  const slideIn = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: { type: 'tween', duration: 0.3 }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          
          {/* Cart Drawer */}
          <motion.div
            variants={slideIn}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Sepet ({getTotalItems()})
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Sepetiniz boş
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Ürün eklemek için alışverişe başlayın
                  </p>
                  <button
                    onClick={onClose}
                    className="btn-primary"
                  >
                    Alışverişe Başla
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.variant}`} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      {/* Product Image */}
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {item.name}
                        </h4>
                        {item.variant !== 'default' && (
                          <p className="text-sm text-gray-500">
                            Varyant: {item.variant}
                          </p>
                        )}
                        <p className="text-sm font-medium text-primary-600">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id, item.variant)}
                        className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Toplam:</span>
                  <span className="text-primary-600">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                
                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="spinner"></div>
                      Yönlendiriliyor...
                    </>
                  ) : (
                    <>
                      Ödemeye Geç
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                
                {/* Continue Shopping */}
                <button
                  onClick={onClose}
                  className="w-full text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Alışverişe Devam Et
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
