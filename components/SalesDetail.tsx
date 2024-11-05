"use client";

import { useEffect, useState } from 'react';
import { useGlobalInputs } from '@/components/GlobalInputsProvider'; // Importa el hook
import Footer from "@/components/Footer";
import { SalesDetailProps } from "@/types/salesTypes";

interface InputConfig {
  type?: string;
  label?: string;
  options?: { value: string, label: string }[];
}

interface InputValues {
  [key: string]: string | number | undefined; // Permitir cualquier clave que tenga string, number o undefined como valor
}

const SalesDetail: React.FC<SalesDetailProps> = ({ template, inputs }) => {
  const [inputValues, setInputValues] = useState<InputValues>({});
  
  const { globalInputs } = useGlobalInputs();

  useEffect(() => {
    // Verifica si inputs tiene una clave llamada userName
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
      return value !== undefined ? String(value) : match; // Asegúrate de que siempre se devuelva un string
    });
  };

  const inputRefs = template.inputref || [];

  return (
    <>
      <h3 className="text-xl font-semibold mb-2">{template.label}</h3>
      <div className="grid grid-cols-3 gap-2 mb-4"> {/* Tres columnas */}
        {inputRefs.map((inputRef) => {
          const inputConfig: InputConfig = inputs[inputRef.key] || { type: 'text', label: inputRef.label }; // Valor por defecto
          return (
            <div key={inputRef.key} className="mb-1"> {/* Espacio vertical reducido */}
              <label className="block text-xs">{inputConfig.label}</label> {/* Usar el label del JSON */}
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
      <textarea
        className="border-2 border-red-600 rounded p-2 w-full h-60 bg-black text-white"
        value={renderMessage(template.message)}
        readOnly
      />
      <Footer />
    </>
  );
};

export default SalesDetail;
