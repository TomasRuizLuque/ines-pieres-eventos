import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import FloatingContact from '@/components/FloatingContact'

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair'
})

const lato = Lato({ 
  subsets: ['latin'], 
  weight: ['300', '400', '700'],
  variable: '--font-lato'
})

export const metadata: Metadata = {
  title: 'Inés Pieres Eventos - Ambientación',
  description: 'Ambientación elegante y profesional para eventos. Transformamos espacios en experiencias memorables.',
  icons: [
    {
      media: '(prefers-color-scheme: light)',
      url: '/images/favicon oscuro y claro/Para fondo claro.png',
      href: '/images/favicon oscuro y claro/Para fondo claro.png',
    },
    {
      media: '(prefers-color-scheme: dark)',
      url: '/images/favicon oscuro y claro/Para fondo oscuro.png',
      href: '/images/favicon oscuro y claro/Para fondo oscuro.png',
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${lato.variable}`}>
      <body>
        <Header />
        {children}
        <FloatingContact />
      </body>
    </html>
  )
}
