import { useState } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import Cart from './Cart'

export default function Layout({ children, title, description, image }) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {image && <meta property="og:image" content={image} />}
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header onCartClick={() => setIsCartOpen(true)} />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </div>
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  )
}
