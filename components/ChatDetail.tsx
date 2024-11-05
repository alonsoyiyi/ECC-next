'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useGlobalInputs } from '@/components/GlobalInputsProvider'
import { ChatData } from '@/types/chatTypes'
import { GlobalInputs } from '@/types/globalTypes' // Asegúrate de crear este tipo
import Footer from "@/components/Footer";

type ChatDetailProps = {
  selectedChat: ChatData | null;
  globalInputs: GlobalInputs;
}

export default function ChatDetail({ selectedChat, globalInputs }: ChatDetailProps) {
  const [localInputs, setLocalInputs] = useState<Record<string, string>>({})
  const [finalMessage, setFinalMessage] = useState('')

  const updateFinalMessage = useCallback((chat: ChatData, inputs: Record<string, string>) => {
    let message = chat.message;
    const allInputs = { ...globalInputs, ...inputs };

    if (allInputs.nombre) {
      message = message.replace(/{userName}/g, allInputs.nombre);
    }

    const bonusText = allInputs.bonus ? `+${allInputs.bonus}` : '';
    allInputs.bonusText = bonusText;

    let pointDiscountText = '';
    const pointDiscount = parseFloat(allInputs.pointDiscount || '0');
    if (!isNaN(pointDiscount) && pointDiscount > 0) {
      pointDiscountText = `💰 Descuento con Claro Puntos: S/ ${pointDiscount.toFixed(2)}`;
    }
    allInputs.pointDiscountText = pointDiscountText;

    Object.entries(allInputs).forEach(([key, value]) => {
      if (key !== 'nombre') {
        message = message.replace(new RegExp(`{${key}}`, 'g'), value || '');
      }
    });

    message = message.replace(/^\s*[\r\n]/gm, '').trim();
    console.log("Mensaje final:", message);
    setFinalMessage(message);
  }, [globalInputs]);

  useEffect(() => {
    if (selectedChat) {
      setLocalInputs({})
      updateFinalMessage(selectedChat, {})
    }
  }, [selectedChat, updateFinalMessage]);

  const handleInputChange = (key: string, value: string) => {
    const newLocalInputs = { ...localInputs, [key]: value }
    setLocalInputs(newLocalInputs)
    if (selectedChat) {
      updateFinalMessage(selectedChat, newLocalInputs)
    }
  }

  if (!selectedChat) {
    return <div>Selecciona un chat para ver los detalles</div>
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{selectedChat.title}</h2>
      {selectedChat.inputs && selectedChat.inputs.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {selectedChat.inputs.map((input) => (
            <div key={input.id}>
              <Label htmlFor={input.id} className="text-sm">{input.label}</Label>
              {input.type === 'text' ? (
                <Input
                  id={input.id}
                  value={localInputs[input.id] || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(input.id, e.target.value)}
                  placeholder={`Ingrese ${input.label.toLowerCase()}`}
                  className="w-full text-sm h-8"
                />
              ) : (
                <Select onValueChange={(value) => handleInputChange(input.id, value)}>
                  <SelectTrigger className="w-full text-sm h-8">
                    <SelectValue placeholder={`Seleccione ${input.label ? input.label.toLowerCase() : ''}`} />
                  </SelectTrigger>
                  <SelectContent className="max-h-48 overflow-y-auto">
                    {input.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
      )}
      <div 
        dangerouslySetInnerHTML={{ __html: finalMessage.replace(/\n\n/g, '<br><br>') }}
        className="min-h-[300px] w-full p-2 bg-black border-4 border-red-500 text-white rounded whitespace-pre-wrap overflow-auto"
        style={{ maxHeight: 'calc(100vh - 300px)' }}
      />

      <Button
        className="mt-4"
        onClick={() => navigator.clipboard.writeText(finalMessage)}
      >
        Copiar mensaje
      </Button>
      <Footer/>
    </div>
  )
}