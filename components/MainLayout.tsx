'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLocalStorage } from "@/lib/useLocalStorage"

const navItems = [
  { name: 'Chats', path: '/chats' },
  { name: 'Legales', path: '/legales' },
  { name: 'Ventas', path: '/ventas' },
  { name: 'General', path: '/general' },
]

export type GlobalInputs = {
  nombre: string;
  empresa: string;
}

type MainLayoutProps = {
  children: ReactNode | ((props: { globalInputs: GlobalInputs }) => ReactNode);
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [globalInputs, setGlobalInputs] = useLocalStorage<GlobalInputs>('globalInputs', {
    nombre: '',
    empresa: '',
  })
  const pathname = usePathname()

  const handleInputChange = (key: keyof GlobalInputs, value: string) => {
    setGlobalInputs({ ...globalInputs, [key]: value })
  }

  return (
    <div className="min-h-screen flex flex-col">
    <header className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-bold mb-4 md:mb-0">Mensaje Predefinido App</Link>
        <div className="flex flex-col md:flex-row gap-4">
          {/* ... (inputs globales) */}
        </div>
      </div>
    </header>

    <nav className="bg-secondary">
      <div className="container mx-auto py-2">
        <ul className="flex flex-wrap justify-center md:justify-start gap-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path} passHref>
                <Button
                  variant={pathname === item.path ? "default" : "ghost"}
                  className="text-secondary-foreground"
                >
                  {item.name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>

    <main className="flex-grow container mx-auto p-4">
      {typeof children === 'function' ? children({ globalInputs }) : children}
    </main>

    <footer className="bg-muted text-muted-foreground p-4">
      <div className="container mx-auto text-center">
        © 2023 Mensaje Predefinido App. Todos los derechos reservados.
      </div>
    </footer>
  </div>
  )
}