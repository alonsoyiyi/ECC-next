"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GeneralDetail from './GeneralDetail';

const GeneralList = () => {
  const [data, setData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/general');
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  const handleItemClick = (item) => {
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
            className={`px-4 py-2 ${selectedItem?.label === item.label ? 'bg-red-500 text-white' : 'bg-gray-700 text-white'}`}
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
