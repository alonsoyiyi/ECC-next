'use client'

import React, { useState, useEffect } from 'react'
import GeneralDetail from './GeneralDetail'
import { Button } from "@/components/ui/button"

interface Model {
  label: string;
  id: string;
  specs: string;
  img: string;
}

interface Brand {
  brand: string;
  models: Model[];
}

interface GeneralItem {
  id: string;
  label: string;
  message: string;
  data?: Brand[]; // Definimos el tipo de data
}

const GeneralList: React.FC = () => {
  const [generalData, setGeneralData] = useState<GeneralItem[]>([])
  const [selectedItem, setSelectedItem] = useState<GeneralItem | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getData?category=GeneralData')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data: Record<string, { label: string; message: string; data?: Brand[] }> = await response.json()
        setGeneralData(
          Object.entries(data).map(([id, value]) => ({
            id,
            label: value.label,
            message: value.message,
            data: value.data
          }))
        )
      } catch (error) {
        console.error('Error fetching general data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-black p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-white">Información General</h2>
        <ul className="space-y-2">
          {generalData.map((item) => (
            <li key={item.id}>
              <Button
                className="w-full bg-black text-white border border-red-500 hover:bg-red-500 hover:text-white"
                onClick={() => setSelectedItem(item)}
              >
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 bg-black p-4 overflow-y-auto">
        {selectedItem && <GeneralDetail item={selectedItem} />}
      </div>
    </div>
  )
}

export default GeneralList
