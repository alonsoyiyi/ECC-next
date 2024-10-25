import MainLayout from '@/components/MainLayout'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

const navItems = [
  { name: 'Chats', path: '/chats' },
  { name: 'Legales', path: '/legales' },
  { name: 'Ventas', path: '/ventas' },
  { name: 'General', path: '/general' },
]

export default function Home() {
  return (
    <MainLayout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a EasyChat Claro</h1>
        <p className="text-xl mb-8">Selecciona una categoría para comenzar:</p>
        <div className="flex flex-wrap justify-center gap-4">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <Button size="lg">{item.name}</Button>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}