'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChatData } from '@/types/chatTypes';
import { GlobalInputs } from '@/types/globalTypes';
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"

type ChatDetailProps = {
  selectedChat: ChatData | null;
  globalInputs: GlobalInputs;
  searchResults: ChatData[];
  onSelectSearchResult: (chat: ChatData) => void;
};

export default function ChatDetail({ selectedChat, globalInputs, searchResults, onSelectSearchResult }: ChatDetailProps) {
  const [localInputs, setLocalInputs] = useState<Record<string, string>>({});
  const [finalMessage, setFinalMessage] = useState('');
  const { toast } = useToast();

  const updateFinalMessage = useCallback((chat: ChatData, inputs: Record<string, string>) => {
    let message = chat.message;
    console.log("Mensaje inicial:", message);

    const allInputs = { ...globalInputs, ...inputs };
    console.log("Inputs combinados:", allInputs);

    if (allInputs.nombre) {
      message = message.replace(/{userName}/g, allInputs.nombre);
    }

    const bonusText = allInputs.bonus ? `+${allInputs.bonus}` : '';
    allInputs.bonusText = bonusText;

    let pointDiscountText = '';
    const pointDiscount = parseFloat(allInputs.pointDiscount || '0');
    if (!isNaN(pointDiscount) && pointDiscount > 0) {
      pointDiscountText = `\n💰 Descuento con Claro Puntos: S/ ${pointDiscount.toFixed(2)}`;
    }
    allInputs.pointDiscountText = pointDiscountText;

    Object.entries(allInputs).forEach(([key, value]) => {
      if (key !== 'nombre') {
        message = message.replace(new RegExp(`{${key}}`, 'g'), value || '');
      }
    });

    message = message.replace(/(\r\n|\r|\n)/g, '<br>').trim();
    console.log("Mensaje final antes de setting state:", message);
    
    setFinalMessage(message);
  }, [globalInputs]);

  useEffect(() => {
    if (selectedChat) {
      setLocalInputs({});
      console.log("Mensaje inicial en useEffect:", selectedChat.message);
      updateFinalMessage(selectedChat, {});
    }
  }, [selectedChat, updateFinalMessage]);

  const handleInputChange = (key: string, value: string) => {
    const newLocalInputs = { ...localInputs, [key]: value };
    console.log("Nuevo valor del input:", newLocalInputs);
    setLocalInputs(newLocalInputs);
    if (selectedChat) {
      updateFinalMessage(selectedChat, newLocalInputs);
    }
  };

  const formatFinalMessageForCopy = (message: string) => {
    return message.replace(/<br\s*\/?>/g, '\n');
  };

  const handleReset = () => {
    setLocalInputs({});
    if (selectedChat) {
      updateFinalMessage(selectedChat, {});
    }
    toast({
      title: "Reinicio completado",
      description: "Todas las entradas han sido reiniciadas.",
    });
  };

  if (searchResults.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((chat) => (
          <Card key={chat.id} className="cursor-pointer hover:bg-gray-100" onClick={() => onSelectSearchResult(chat)}>
            <CardContent className="p-4">
              <h3 className="font-bold mb-2">{chat.title}</h3>
              <p className="text-sm text-gray-600">{chat.message.substring(0, 100)}...</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!selectedChat) {
    return <div>Selecciona un chat para ver los detalles</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{selectedChat.title}</h2>
        <Button onClick={handleReset} variant="destructive">
          Reiniciar
        </Button>
      </div>
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
                  className="w-full text-sm h-8 bg-black text-white"
                />
              ) : (
                <Select
                  value={localInputs[input.id] || ''}
                  onValueChange={(value) => handleInputChange(input.id, value)}
                >
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
            </div>))}
        </div>)}
      <div
        dangerouslySetInnerHTML={{ __html: finalMessage.replace(/\n/g, '<br>') }}
        className="min-h-[300px] w-full p-2 bg-black border-4 border-red-500 text-white rounded whitespace-pre-wrap overflow-auto"
        style={{ maxHeight: 'calc(100vh - 300px)' }}
      />

      <div className="flex justify-between mt-4">
        <Button
          onClick={() => {
            const formattedMessage = formatFinalMessageForCopy(finalMessage);
            navigator.clipboard.writeText(formattedMessage);
            toast({
              title: "Mensaje copiado",
              description: "El mensaje ha sido copiado al portapapeles.",
            });
          }}
        >
          Copiar mensaje
        </Button>
      </div>
      <Footer />
    </div>
  );
}