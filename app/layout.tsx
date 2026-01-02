
import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/auth/auth-provider'
import { ToastProvider } from '@/components/hooks/use-toast'
import { OptInDialogProvider } from '@/components/landingpage/OptInDialogProvider'
import TopLoader from 'nextjs-toploader';
import Script from "next/script";
export const metadata: Metadata = {
  title: 'Notifly',
  description: 'Created with v0',
  generator: 'v0.dev',
   icons: {
    icon: '/logo-icon.png', 
  }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <head>
       <link href="https://fonts.googleapis.com/css2?family=Sansation:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.google.com/share?selection.family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900" rel="stylesheet" />
      </head>
      <body className="font-inter sansation-font">
        <TopLoader showSpinner={false}/>
        <AuthProvider>
          <OptInDialogProvider>
            <ToastProvider />
            {children}
          </OptInDialogProvider>
        </AuthProvider>

         <Script
          id="mailerlite-universal"
          strategy="afterInteractive"
        >
          {`
            (function(w,d,e,u,f,l,n){
              w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);}
              l=d.createElement(e);l.async=1;l.src=u;
              n=d.getElementsByTagName(e)[0];n.parentNode.insertBefore(l,n);
            })(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
            ml('account', '2004462');
          `}
        </Script>
      </body>
    </html>
  )
}


