import MainLayout from '@/components/MainLayout'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <MainLayout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a Mensaje Predefinido App</h1>
        <p className="text-xl mb-8">Selecciona una categoría para comenzar:</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/chats">
            <Button>Chats</Button>
          </Link>
          <Link href="/legales">
            <Button>Legales</Button>
          </Link>
          <Link href="/ventas">
            <Button>Ventas</Button>
          </Link>
          <Link href="/general">
            <Button>General</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}