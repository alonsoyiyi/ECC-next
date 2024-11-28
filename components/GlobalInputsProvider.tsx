'use client';

import React, { createContext, useContext, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from 'next/image'
import { useLocalStorage } from '@/lib/useLocalStorage';
import { GlobalInputs } from '@/types/globalTypes';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
  const { user, isLoading } = useUser();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleInputChange = (key: keyof GlobalInputs, value: string) => {
    setGlobalInputs(prev => ({
      ...prev,
      [key]: value
    }));
  }

  const handleLogin = () => {
    window.location.href = '/api/auth/login';
  }

  const handleLogout = () => {
    setIsLogoutDialogOpen(true);
  }

  const confirmLogout = () => {
    window.location.href = '/api/auth/logout';
    setIsLogoutDialogOpen(false);
  };

  return (
    <GlobalInputsContext.Provider value={{ globalInputs, setGlobalInputs }}>
      <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="h-10 w-auto cursor-pointer mr-4"
            />
          </Link>
          <h1 className="text-2xl font-bold flex items-center">
            EasyChat Claro
            <span className="text-sm text-gray-400 ml-2 align-top">Version 1.0</span>
          </h1>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="flex flex-col items-center">
            <Label htmlFor="nombre" className="sr-only">Nombre</Label>
            <Input
              id="nombre"
              value={globalInputs.nombre}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('nombre', e.target.value)}
              placeholder="Ingresa tu nombre"
              className="text-center bg-black text-white"
            />
          </div>
        </div>

        {isLoading ? (
          <div>Cargando...</div>
        ) : user ? (
          <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button onClick={handleLogout} className="ml-4">{user.name || 'Usuario'}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Deseas deslogearte de EasyChat Claro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción cerrará tu sesión actual.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No</AlertDialogCancel>
                <AlertDialogAction onClick={confirmLogout}>Sí</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button onClick={handleLogin} className="ml-4">Login</Button>
        )}
      </header>
      <main className="flex-1 p-4">
        {children}
      </main>
    </GlobalInputsContext.Provider>
  );
}