import React, { useState, useEffect } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type GeneralDetailProps = {
  selectedItemId: string | null;
}

type GeneralItem = {
  id: string;
  title: string;
  content: string;
}

export default function GeneralDetail({ selectedItemId }: GeneralDetailProps) {
  const [generalItem, setGeneralItem] = useState<GeneralItem | null>(null)

  useEffect(() => {
    if (selectedItemId) {
      // Aquí deberías cargar los datos generales desde tu archivo JSON
      // Por ahora, usaremos datos de ejemplo
      setGeneralItem({
        id: selectedItemId,
        title: `Información general ${selectedItemId}`,
        content: 'Este es un contenido de ejemplo para la información general. Aquí puedes incluir detalles sobre la empresa, políticas, o cualquier otra información relevante.',
      })
    }
  }, [selectedItemId])

  if (!generalItem) {
    return <div className="w-full md:w-2/3 pl-4">Selecciona un ítem para ver los detalles</div>
  }

  return (
    <div className="w-full md:w-2/3 pl-4">
      <h2 className="text-xl font-bold mb-4">{generalItem.title}</h2>
      <Textarea
        value={generalItem.content}
        readOnly
        className="h-40"
      />
      <Button
        className="mt-4"
        onClick={() => navigator.clipboard.writeText(generalItem.content)}
      >
        Copiar contenido
      </Button>
    </div>
  )
}