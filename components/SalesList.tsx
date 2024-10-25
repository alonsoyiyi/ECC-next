import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

type Sale = {
  id: string
  title: string
}

type SalesListProps = {
  onSelectSale: (id: string | null) => void
}

export default function SalesList({ onSelectSale }: SalesListProps) {
  const [sales, setSales] = useState<Sale[]>([])
  const [selectedSale, setSelectedSale] = useState<string | null>(null)

  useEffect(() => {
    // Aquí deberías cargar los datos de ventas desde tu archivo JSON
    // Por ahora, usaremos datos de ejemplo
    setSales([
      { id: '1', title: 'Oferta especial' },
      { id: '2', title: 'Descuento por volumen' },
      { id: '3', title: 'Promoción de temporada' },
    ])
  }, [])

  const handleSelectSale = (id: string) => {
    setSelectedSale(id)
    onSelectSale(id)
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Plantillas de ventas</h2>
      <div className="space-y-2">
        {sales.map((sale) => (
          <Button
            key={sale.id}
            variant={selectedSale === sale.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => handleSelectSale(sale.id)}
          >
            {sale.title}
          </Button>
        ))}
      </div>
    </div>
  )
}