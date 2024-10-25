import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

type GeneralItem = {
  id: string
  title: string
}

type GeneralListProps = {
  onSelectItem: (id: string) => void
}

export default function GeneralList({ onSelectItem }: GeneralListProps) {
  const [items, setItems] = useState<GeneralItem[]>([])
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  useEffect(() => {
    // Aquí deberías cargar los datos generales desde tu archivo JSON
    // Por ahora, usaremos datos de ejemplo
    setItems([
      { id: '1', title: 'Información de la empresa' },
      { id: '2', title: 'Horario de atención' },
      { id: '3', title: 'Contacto' },
    ])
  }, [])

  const handleSelectItem = (id: string) => {
    setSelectedItem(id)
    onSelectItem(id)
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Información general</h2>
      <div className="space-y-2">
        {items.map((item) => (
          <Button
            key={item.id}
            variant={selectedItem === item.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => handleSelectItem(item.id)}
          >
            {item.title}
          </Button>
        ))}
      </div>
    </div>
  )
}