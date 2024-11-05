// app/legales/page.tsx
'use client';

import LegalDetail from '@/components/LegalDetail';

export default function LegalPage() {
  return (
    <div className="container mx-auto p-4">
      <LegalDetail selectedLegalId={'1'} globalInputs={{}} /> {/* Pasamos directamente el ID del documento */}
    </div>
  );
}
