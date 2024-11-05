'use client'

import React from 'react';
import LegalDetail from '@/components/LegalDetail';
import { useGlobalInputs } from '@/components/GlobalInputsProvider'; // Importar el hook

export default function LegalesPage() {
  const { globalInputs } = useGlobalInputs(); // Usar el hook para obtener globalInputs

  return (
    <div className="container mx-auto p-4">
      <LegalDetail 
        selectedLegalId="1" 
        globalInputs={globalInputs} // Pasar los globalInputs directamente
      />
    </div>
  );
}
