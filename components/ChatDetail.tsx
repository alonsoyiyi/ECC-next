import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { GlobalInputs } from '@/components/MainLayout'

type ChatDetailProps = {
  globalInputs: GlobalInputs;
  selectedChatId: string | null;
}

type ChatData = {
  id: string;
  title: string;
  inputs: { id: string; label: string }[];
  message: string;
}

export default function ChatDetail({ globalInputs, selectedChatId }: ChatDetailProps) {
  const [chatData, setChatData] = useState<ChatData | null>(null)
  const [localInputs, setLocalInputs] = useState<Record<string, string>>({})
  const [finalMessage, setFinalMessage] = useState('')

  useEffect(() => {
    if (selectedChatId) {
      // Cargar datos del chat (ejemplo)
      setChatData({
        id: selectedChatId,
        title: `Chat ${selectedChatId}`,
        inputs: [
          { id: 'nombre_cliente', label: 'Nombre del cliente' },
          { id: 'producto', label: 'Producto' },
        ],
        message: 'Hola {nombre_cliente}, gracias por tu interés en {producto}. {nombre} de {empresa} está aquí para ayudarte.',
      })
      setLocalInputs({})
    }
  }, [selectedChatId])

  useEffect(() => {
    if (chatData) {
      let message = chatData.message
      Object.entries({ ...globalInputs, ...localInputs }).forEach(([key, value]) => {
        message = message.replace(new RegExp(`{${key}}`, 'g'), value || `{${key}}`)
      })
      setFinalMessage(message)
    }
  }, [chatData, globalInputs, localInputs])

  const handleInputChange = (key: string, value: string) => {
    setLocalInputs(prev => ({ ...prev, [key]: value }))
  }

  if (!chatData) {
    return <div>Selecciona un chat para ver los detalles</div>
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{chatData.title}</h2>
      <div className="space-y-4 mb-4">
        {chatData.inputs.map((input) => (
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
        Copiar mensaje
      </Button>
    </div>
  )
}