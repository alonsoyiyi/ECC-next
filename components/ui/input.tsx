import * as React from 'react';
import { cn } from '@/lib/utils'; // Asegúrate de ajustar esta importación según tu proyecto

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Si necesitas agregar propiedades adicionales, agrégalas aquí
  customProp?: string; // Ejemplo de una propiedad personalizada
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "border border-gray-300 focus:ring-2 focus:ring-blue-500 p-2 rounded-md",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
