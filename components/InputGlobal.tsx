import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type InputGlobalProps = {
  inputs: Record<string, string>
  onChange: (key: string, value: string) => void
}

export default function InputGlobal({ inputs, onChange }: InputGlobalProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          id="nombre"
          value={inputs.nombre || ''}
          onChange={(e) => onChange('nombre', e.target.value)}
          placeholder="Ingrese su nombre"
        />
      </div>
      <div>
        <Label htmlFor="empresa">Empresa</Label>
        <Input
          id="empresa"
          value={inputs.empresa || ''}
          onChange={(e) => onChange('empresa', e.target.value)}
          placeholder="Ingrese su empresa"
        />
      </div>
    </div>
  )
}