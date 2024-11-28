import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GlobalInputsProvider } from '@/components/GlobalInputsProvider'
import { Toaster } from '@/components/ui/toaster'
import { UserProvider } from '@auth0/nextjs-auth0/client'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EasyChat Claro',
  description: 'Aplicación para generar mensajes predefinidos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <UserProvider>
          <div className="min-h-screen flex flex-col">
            <GlobalInputsProvider>
              {children}
              <Toaster/>
            </GlobalInputsProvider>
          </div>
        </UserProvider>
      </body>
    </html>
  )
}