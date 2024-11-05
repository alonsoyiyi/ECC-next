"use client";

import { useEffect, useState } from 'react';
import { useGlobalInputs } from '@/components/GlobalInputsProvider'; // Importa el hook
import Footer from "@/components/Footer";

const SalesDetail = ({ template, inputs }) => {
  const [inputValues, setInputValues] = useState({});
  const { globalInputs } = useGlobalInputs(); // Usa el hook para obtener valores globales

  useEffect(() => {
    // Inicializa inputValues con userName del contexto global si está presente en inputs
    setInputValues(prevValues => ({
      ...prevValues,
      userName: inputs.userName ? globalInputs.nombre : prevValues.userName
    }));
  }, [template, inputs, globalInputs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const renderMessage = (messageTemplate) => {
    return messageTemplate.replace(/\{(.*?)\}/g, (match, key) => {
      return inputValues[key] || match;
    });
  };

  const inputRefs = template.inputref || [];

  return (
    <>
      <h3 className="text-xl font-semibold mb-2">{template.label}</h3>
      <div className="grid grid-cols-3 gap-2 mb-4"> {/* Tres columnas */}
        {inputRefs.map((inputRef) => {
          const inputConfig = (inputs && inputs[inputRef.key]) || { type: 'text', label: inputRef.label }; // Valor por defecto
          return (
            <div key={inputRef.key} className="mb-1"> {/* Espacio vertical reducido */}
              <label className="block text-xs">{inputConfig.label}</label> {/* Usar el label del JSON */}
              {inputConfig.type === 'select' ? (
                <select
                  name={inputRef.key}
                  value={inputValues[inputRef.key] || ''}
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
                  value={inputValues[inputRef.key] || ''}
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
      <Footer/>
    </>
  );
};

export default SalesDetail;
