import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

type Legal = {
  id: string
  title: string
}

type LegalListProps = {
  onSelectLegal: (id: string | null) => void
}

export default function LegalList({ onSelectLegal }: LegalListProps) {
  const [legals, setLegals] = useState<Legal[]>([])
  const [selectedLegal, setSelectedLegal] = useState<string | null>(null)

  useEffect(() => {
    // Aquí deberías cargar los datos legales desde tu archivo JSON
    // Por ahora, usaremos datos de ejemplo
    setLegals([
      { id: '1', title: 'Click para inciar' },
      // { id: '2', title: 'Política de privacidad' },
      // { id: '3', title: 'Aviso legal' },
    ])
  }, [])

  const handleSelectLegal = (id: string) => {
    setSelectedLegal(id)
    onSelectLegal(id)
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Documentos legales</h2>
      <div className="space-y-2">
        {legals.map((legal) => (
          <Button
            key={legal.id}
            variant={selectedLegal === legal.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => handleSelectLegal(legal.id)}
          >
            {legal.title}
          </Button>
        ))}
      </div>
    </div>
  )
}