// GlobalInputsProvider.tsx

'use client';

import React, { createContext, useContext } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from 'next/image'
import { useLocalStorage } from '@/lib/useLocalStorage';
import { GlobalInputs } from '@/types/globalInputs';
import Link from 'next/link';
import { Button } from "@/components/ui/button"; // Asegúrate de tener tu botón importado

const GlobalInputsContext = createContext<{
  globalInputs: GlobalInputs;
  setGlobalInputs: (value: GlobalInputs | ((prev: GlobalInputs) => GlobalInputs)) => void;
} | null>(null);

export const useGlobalInputs = () => {
  const context = useContext(GlobalInputsContext);
  if (!context) {
    throw new Error('useGlobalInputs must be used within a GlobalInputsProvider');
  }
  return context;
};

export function GlobalInputsProvider({ children }: { children: React.ReactNode }) {
  const [globalInputs, setGlobalInputs] = useLocalStorage<GlobalInputs>('globalInputs', {
    nombre: '',
    bonus: '',
    pointDiscount: ''
  });

  const handleInputChange = (key: keyof GlobalInputs, value: string) => {
    setGlobalInputs(prev => ({
      ...prev,
      [key]: value
    }));
  }

  return (
    <GlobalInputsContext.Provider value={{ globalInputs, setGlobalInputs }}>
      <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between"> {/* Ajusta para espacio entre */}
        <div className="flex items-center"> {/* Contenedor para imagen y h1 */}
          {/* Imagen clickeable */}
          <Link href="/">
          <Image
              src="/images/logo.png" // Ruta de tu imagen
              alt="Logo"
              width={32}
  height={32}
              className="h-10 w-auto cursor-pointer mr-4" // Estilos para la imagen
            />
          </Link>
          <h1 className="text-2xl font-bold">EasyChat Claro</h1>
        </div>
        
        <div className="flex-1 flex justify-center"> {/* Espacio flexible para centrar el input */}
          <div className="flex flex-col items-center"> {/* Alinear verticalmente */}
            <Label htmlFor="nombre" className="sr-only">Nombre</Label>
            <Input
              id="nombre"
              value={globalInputs.nombre}
              onChange={(e) => handleInputChange('nombre', e.target.value)}
              placeholder="Ingresa tu nombre"
              className="text-center" // Centrar texto en el input
            />
          </div>
        </div>

        <Button className="ml-4">Login</Button> {/* Botón de login */}
      </header>
      <main className="flex-1 p-4">
        {children}
      </main>
    </GlobalInputsContext.Provider>
  );
}
