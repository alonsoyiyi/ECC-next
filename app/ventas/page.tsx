'use client'

import { useState } from 'react'
import MainLayout, { GlobalInputs } from '@/components/MainLayout'
import SalesList from '@/components/SalesList'
import SalesDetail from '@/components/SalesDetail'

export default function VentasPage() {
  const [selectedSaleId, setSelectedSaleId] = useState<string | null>(null)

  return (
    <MainLayout>
      {({ globalInputs }: { globalInputs: GlobalInputs }) => (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <SalesList onSelectSale={setSelectedSaleId} />
          </div>
          <div className="w-full md:w-2/3">
            <SalesDetail selectedSaleId={selectedSaleId} globalInputs={globalInputs} />
          </div>
        </div>
      )}
    </MainLayout>
  )
}