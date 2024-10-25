import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { GlobalInputs } from '@/components/MainLayout'

type LegalDetailProps = {
  globalInputs: GlobalInputs;
  selectedLegalId: string | null;
}

type LegalData = {
  id: string;
  title: string;
  inputs: { id: string; label: string }[];
  content: string;
}

export default function LegalDetail({ globalInputs, selectedLegalId }: LegalDetailProps) {
  const [legalData, setLegalData] = useState<LegalData | null>(null)
  const [localInputs, setLocalInputs] = useState<Record<string, string>>({})
  const [finalContent, setFinalContent] = useState('')

  useEffect(() => {
    if (selectedLegalId) {
      // Aquí deberías cargar los datos legales desde tu archivo JSON
      // Por ahora, usaremos datos de ejemplo
      setLegalData({
        id: selectedLegalId,
        title: `Documento legal ${selectedLegalId}`,
        inputs: [
          { id: 'nombre_cliente', label: 'Nombre del cliente' },
          { id: 'fecha', label: 'Fecha' },
        ],
        content: 'Yo, {nombre_cliente}, en la fecha {fecha}, acepto los términos y condiciones presentados por {empresa}.',
      })
      setLocalInputs({})
    }
  }, [selectedLegalId])

  useEffect(() => {
    if (legalData) {
      let content = legalData.content
      Object.entries({ ...globalInputs, ...localInputs }).forEach(([key, value]) => {
        content = content.replace(new RegExp(`{${key}}`, 'g'), value || `{${key}}`)
      })
      setFinalContent(content)
    }
  }, [legalData, globalInputs, localInputs])

  const handleInputChange = (key: string, value: string) => {
    setLocalInputs(prev => ({ ...prev, [key]: value }))
  }

  if (!legalData) {
    return <div>Selecciona un documento legal para ver los detalles</div>
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{legalData.title}</h2>
      <div className="space-y-4 mb-4">
        {legalData.inputs.map((input) => (
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
        value={finalContent}
        readOnly
        className="h-40"
      />
      <Button
        className="mt-4"
        onClick={() => navigator.clipboard.writeText(finalContent)}
      >
        Copiar contenido legal
      </Button>
    </div>
  )
}