import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { GlobalInputs } from '@/components/MainLayout'

type SalesDetailProps = {
  globalInputs: GlobalInputs;
  selectedSaleId: string | null;
}

type SaleData = {
  id: string;
  title: string;
  inputs: { id: string; label: string }[];
  message: string;
}

export default function SalesDetail({ globalInputs, selectedSaleId }: SalesDetailProps) {
  const [saleData, setSaleData] = useState<SaleData | null>(null)
  const [localInputs, setLocalInputs] = useState<Record<string, string>>({})
  const [finalMessage, setFinalMessage] = useState('')

  useEffect(() => {
    if (selectedSaleId) {
      // Aquí deberías cargar los datos de ventas desde tu archivo JSON
      // Por ahora, usaremos datos de ejemplo
      setSaleData({
        id: selectedSaleId,
        title: `Plantilla de venta ${selectedSaleId}`,
        inputs: [
          { id: 'producto', label: 'Producto' },
          { id: 'descuento', label: 'Porcentaje de descuento' },
        ],
        message: 'Estimado {nombre_cliente}, tenemos una oferta especial para ti. Nuestro producto {producto} tiene un descuento del {descuento}%. No pierdas esta oportunidad. Contacta a {nombre} de {empresa} para más detalles.',
      })
      setLocalInputs({})
    }
  }, [selectedSaleId])

  useEffect(() => {
    if (saleData) {
      let message = saleData.message
      Object.entries({ ...globalInputs, ...localInputs }).forEach(([key, value]) => {
        message = message.replace(new RegExp(`{${key}}`, 'g'), value || `{${key}}`)
      })
      setFinalMessage(message)
    }
  }, [saleData, globalInputs, localInputs])

  const handleInputChange = (key: string, value: string) => {
    setLocalInputs(prev => ({ ...prev, [key]: value }))
  }

  if (!saleData) {
    return <div>Selecciona una plantilla de venta para ver los detalles</div>
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{saleData.title}</h2>
      <div className="space-y-4 mb-4">
        {saleData.inputs.map((input) => (
          <div key={input.id}>
            <Label htmlFor={input.id}>{input.label}</Label>
            <Input
              id={input.id}
              value={localInputs[input.id] || ''}
              onChange={(e) => handleInputChange(input.id, e.target.value)}
              placeholder={`Ingrese ${input.label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
      <Textarea
        value={finalMessage}
        readOnly
        className="h-40"
      />
      <Button
        className="mt-4"
        onClick={() => navigator.clipboard.writeText(finalMessage)}
      >
        Copiar mensaje de venta
      </Button>
    </div>
  )
}