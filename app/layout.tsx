import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ToasterProvider } from '@/toast-provide'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ROIPro',
  description: 'ROIPro created in next.js framework',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
