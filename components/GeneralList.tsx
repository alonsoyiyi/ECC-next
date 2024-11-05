"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GeneralDetail from './GeneralDetail';

interface Item {
  id: number; // Cambia el tipo según corresponda
  name: string; // Cambia el tipo según corresponda
  label: string; // Cambia el tipo según corresponda
  message: string; // Asegúrate de incluir esta propiedad
}

interface Data {
  [key: string]: Item; // Cambia esto si la estructura de data es diferente
}

const GeneralList = () => {
  const [data, setData] = useState<Data | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/general');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Aquí podrías manejar el error (por ejemplo, mostrando un mensaje)
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center"> {/* Centrar contenido */}
      <div className="flex space-x-2 mb-4"> {/* Pestañas como botones */}
        {Object.entries(data).map(([key, item]) => (
          <Button
            key={key}
            onClick={() => handleItemClick(item)}
            className={`px-4 py-2 ${selectedItem?.id === item.id ? 'bg-red-500 text-white' : 'bg-gray-700 text-white'}`}
          >
            {item.label}
          </Button>
        ))}
      </div>
      {selectedItem && (
        <GeneralDetail item={selectedItem} />
      )}
    </div>
  );
};

export default GeneralList;
