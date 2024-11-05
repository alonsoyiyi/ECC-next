import * as React from 'react';
import { cn } from '@/lib/utils'; // Asegúrate de ajustar esta importación según tu proyecto

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // Si necesitas agregar propiedades adicionales, agrégalas aquí
  customProp?: string; // Ejemplo de una propiedad personalizada
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
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

Textarea.displayName = 'Textarea';

export { Textarea };
