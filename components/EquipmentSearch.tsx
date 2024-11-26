'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from 'lucide-react'
import Image from 'next/image'

interface Equipment {
  label: string
  id: string
  specs: string
  img: string
}

interface Brand {
  brand: string
  models: Equipment[]
}

interface EquipmentSearchProps {
  equipmentData: Brand[]
}

export default function EquipmentSearch({ equipmentData }: EquipmentSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Equipment[]>([])
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([])
      return
    }

    const results = equipmentData.flatMap(brand => 
      brand.models.filter(model => 
        model.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    setSearchResults(results)
  }, [searchTerm, equipmentData])

  const handleEquipmentClick = (equipment: Equipment) => {
    setSelectedEquipment(equipment)
    setIsModalOpen(true)
  }

  const copySpecs = () => {
    if (selectedEquipment) {
      navigator.clipboard.writeText(selectedEquipment.specs)
      alert('Especificaciones copiadas al portapapeles')
    }
  }

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Buscar equipos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-black border-red-500 text-white placeholder-gray-400"
      />

      <div className="border-2 border-red-500 bg-black p-4 min-h-[300px] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((equipment) => (
            <Card key={equipment.id} className="cursor-pointer bg-white hover:bg-gray-100" onClick={() => handleEquipmentClick(equipment)}>
              <CardContent className="p-4">
                <h3 className="font-bold mb-2 text-black">{equipment.label}</h3>
                <p className="text-sm text-gray-700">{equipment.specs.substring(0, 100)}...</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl h-auto">
          <DialogHeader>
            <DialogTitle>{selectedEquipment?.label}</DialogTitle>
            <Button 
              className="absolute right-4 top-4" 
              variant="ghost" 
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Image
                src={`/images/${selectedEquipment?.img}.jpg`}
                alt={selectedEquipment?.label || 'Equipment image'}
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm">{selectedEquipment?.specs}</p>
              <Button onClick={copySpecs} className="mt-4">Copiar especificaciones</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}