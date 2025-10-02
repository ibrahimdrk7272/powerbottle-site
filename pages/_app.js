import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '../context/CartContext'
import Analytics from '../components/Analytics'

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Analytics />
    </CartProvider>
  )
}
