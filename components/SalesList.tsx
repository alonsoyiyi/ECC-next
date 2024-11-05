"use client";

import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import SalesDetail from './SalesDetail';
import { Button } from "@/components/ui/button"; // Asegúrate de que Button esté importado

const SalesList = () => {
  const [data, setData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  // const router = useRouter();

  useEffect(() => {
    const fetchSalesData = async () => {
      const response = await fetch('/api/ventas');
      const data = await response.json();
      setData(data);
    };

    fetchSalesData();
  }, []);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <div className="w-1/4 space-y-2 p-2 h-screen sticky top-0 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Plantillas de Venta</h2>
        <div className="space-y-2"> {/* Usar espacio similar a LegalList */}
          {Object.entries(data.plantillas).map(([key, template]) => (
            <Button
              key={key}
              variant={selectedTemplate?.label === template.label ? "default" : "outline"}
              className="w-full justify-start text-xs" // Ajuste de tamaño de letra
              onClick={() => handleTemplateClick(template)}
            >
              {template.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex-1 border-l pl-4">
        {selectedTemplate ? (
          <SalesDetail template={selectedTemplate} inputs={data.inputs} />
        ) : (
          <p className="text-gray-500">Selecciona una plantilla para ver los detalles.</p>
        )}
      </div>
    </div>
  );
};

export default SalesList;
