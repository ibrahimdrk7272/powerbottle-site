import { useEffect } from 'react'
import Head from 'next/head'

export default function Analytics() {
  useEffect(() => {
    // Google Analytics 4
    if (process.env.NEXT_PUBLIC_GA_ID) {
      // Load gtag script
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`
      document.head.appendChild(script)
      
      // Initialize gtag
      window.dataLayer = window.dataLayer || []
      function gtag(){dataLayer.push(arguments)}
      window.gtag = gtag
      gtag('js', new Date())
      gtag('config', process.env.NEXT_PUBLIC_GA_ID)
    }
    
    // Plausible Analytics
    if (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
      const script = document.createElement('script')
      script.defer = true
      script.setAttribute('data-domain', process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN)
      script.src = 'https://plausible.io/js/script.js'
      document.head.appendChild(script)
    }
  }, [])
  
  return (
    <Head>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `,
            }}
          />
        </>
      )}
    </Head>
  )
}
