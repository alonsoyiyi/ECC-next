'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLocalStorage } from "@/lib/useLocalStorage"
import { Home } from 'lucide-react'

export type GlobalInputs = {
  nombre: string;
  empresa: string;
}

type MainLayoutProps = {
  children: React.ReactNode | ((props: { globalInputs: GlobalInputs }) => React.ReactNode);
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
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/" className="mr-4">
              <Button variant="ghost" size="icon">
                <Home className="h-6 w-6" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">EasyChat Claro</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <Label htmlFor="nombre" className="text-primary-foreground">Nombre</Label>
              <Input
                id="nombre"
                value={globalInputs.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className="bg-primary-foreground text-primary"
              />
            </div>
            <div>
              <Label htmlFor="empresa" className="text-primary-foreground">Empresa</Label>
              <Input
                id="empresa"
                value={globalInputs.empresa}
                onChange={(e) => handleInputChange('empresa', e.target.value)}
                className="bg-primary-foreground text-primary"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        {typeof children === 'function' ? children({ globalInputs }) : children}
      </main>

      <footer className="bg-muted text-muted-foreground p-4">
        <div className="container mx-auto text-center">
          © 2024 EasyChat Claro. Todos los derechos reservados.
          Contacto y soporte :angel.paz.consultas@gmail.com
        </div>
      </footer>
    </div>
  )
}