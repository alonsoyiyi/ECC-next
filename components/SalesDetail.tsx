"use client";

import { useEffect, useState } from 'react';
import { useGlobalInputs } from '@/components/GlobalInputsProvider';
import Footer from "@/components/Footer";
import { SalesDetailProps } from "@/types/salesTypes";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface InputConfig {
  type?: string;
  label?: string;
  options?: { value: string, label: string }[];
}

interface InputValues {
  [key: string]: string | number | undefined;
}

const SalesDetail: React.FC<SalesDetailProps> = ({ template, inputs }) => {
  const [inputValues, setInputValues] = useState<InputValues>({});
  const [isCopied, setIsCopied] = useState(false);

  const { globalInputs } = useGlobalInputs();

  useEffect(() => {
    if (inputs && 'userName' in inputs) {
      setInputValues(prevValues => ({
        ...prevValues,
        userName: globalInputs.nombre,
      }));
    }
  }, [template, inputs, globalInputs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const renderMessage = (messageTemplate: string) => {
    return messageTemplate.replace(/\{(.*?)\}/g, (match, key) => {
      const value = inputValues[key];
      return value !== undefined ? String(value) : match;
    });
  };

  const copyToClipboard = () => {
    const text = renderMessage(template.message);
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      toast({
        title: "Copiado al portapapeles",
        description: "El texto ha sido copiado exitosamente.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Error al copiar: ', err);
      toast({
        title: "Error",
        description: "No se pudo copiar el texto. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    });
  };

  const inputRefs = template.inputref || [];

  return (
    <>
      <h3 className="text-xl font-semibold mb-2">{template.label}</h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {inputRefs.map((inputRef) => {
          const inputConfig: InputConfig = inputs[inputRef.key] || { type: 'text', label: inputRef.label };
          return (
            <div key={inputRef.key} className="mb-1">
              <label className="block text-xs">{inputConfig.label}</label>
              {inputConfig.type === 'select' ? (
                <select
                  name={inputRef.key}
                  value={inputValues[inputRef.key] as string || ''}
                  onChange={handleInputChange}
                  className="border rounded p-0.5 w-full text-black"
                >
                  {inputConfig.options && inputConfig.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={inputConfig.type || 'text'}
                  name={inputRef.key}
                  value={inputValues[inputRef.key] as string || ''}
                  onChange={handleInputChange}
                  className="border rounded p-0.5 w-full text-black"
                  placeholder={`Ingrese ${inputConfig.label}`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="relative">
        <textarea
          className="border-2 border-red-600 rounded p-2 w-full h-60 bg-black text-white"
          value={renderMessage(template.message)}
          readOnly
        />
        <div className="mt-2 flex justify-center">
          <Button
            onClick={copyToClipboard}
            className={`px-4 py-2 text-white rounded border-2 ${isCopied ? 'bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600' : 'bg-black border-red-500 hover:bg-red-700 hover:border-red-600'} text-white rounded`}
          >
            {isCopied ? 'Copiado!' : 'Copiar'}
          </Button>
        </div>
      </div>


      <Footer />
    </>
  );
};

export default SalesDetail;