import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer"; // Importa el Footer

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold">
            Bienvenido a EasyChat Claro
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Selecciona una sección para comenzar
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Link href="/chats" className="w-full">
            <Button className="w-full" variant="outline">
              Mensajes WhatsApp Predeterminados
            </Button>
          </Link>
          <Link href="/legales" className="w-full">
            <Button className="w-full" variant="outline">
              Extractos Legales para Grabación
            </Button>
          </Link>
          <Link href="/ventas" className="w-full">
            <Button className="w-full" variant="outline">
              Plantillas de Ventas y BO
            </Button>
          </Link>
          <Link href="/general" className="w-full">
            <Button className="w-full" variant="outline">
              Información General
            </Button>
          </Link>
        </div>
      </div>
      <Footer /> {/* Agrega el Footer aquí */}
    </div>
  );
}
