'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useUser } from '@auth0/nextjs-auth0/client'
import { toast } from "@/hooks/use-toast"

const UserNotes: React.FC = () => {
  const { user, error, isLoading } = useUser()
  const [notes, setNotes] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const [isLoadingNotes, setIsLoadingNotes] = useState(true)

  useEffect(() => {
    if (user) {
      fetchNotes()
    }
  }, [user])

  const fetchNotes = async () => {
    try {
      setIsLoadingNotes(true)
      const response = await fetch('/api/notes')
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al cargar las notas')
      }
      const data = await response.json()
      setNotes(data.notes)
    } catch (error) {
      console.error('Error fetching notes:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudieron cargar las notas",
        variant: "destructive",
      })
    } finally {
      setIsLoadingNotes(false)
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al guardar las notas')
      }

      toast({
        title: "Éxito",
        description: "Notas guardadas correctamente",
      })
    } catch (error) {
      console.error('Error saving notes:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudieron guardar las notas",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleClear = () => {
    setIsDialogOpen(true)
  }

  const confirmClear = async () => {
    setIsClearing(true)
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes: '' }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al borrar las notas')
      }

      setNotes('')
      setIsDialogOpen(false)
      toast({
        title: "Notas borradas",
        description: "Todas las notas han sido borradas correctamente.",
      })
    } catch (error) {
      console.error('Error clearing notes:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudieron borrar las notas",
        variant: "destructive",
      })
    } finally {
      setIsClearing(false)
    }
  }

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>{error.message}</div>

  if (!user) {
    return (
      <div className="bg-black border-2 border-red-500 p-4 text-center">
        <p className="text-white mb-4">Para usar esta función debes estar logeado</p>
        <Button className="bg-red-500 text-white border border-black" onClick={() => window.location.href = '/api/auth/login'}>
          Login
        </Button>
      </div>
    )
  }

  if (isLoadingNotes) {
    return (
      <div className="bg-black border-2 border-red-500 p-4 text-center">
        <p className="text-white">Cargando notas...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full p-2 bg-black border-2 border-red-500 text-white rounded"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={10}
        placeholder="Escribe tus notas aquí..."
      />
      <div className="flex justify-between">
        <Button 
          onClick={handleSave} 
          className="bg-green-500 text-white"
          disabled={isSaving}
        >
          {isSaving ? 'Guardando...' : 'Guardar'}
        </Button>
        <Button 
          onClick={handleClear} 
          className="bg-red-500 text-white"
          disabled={isClearing}
        >
          {isClearing ? 'Borrando...' : 'Limpiar'}
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar borrado</DialogTitle>
          </DialogHeader>
          <p>Estás a punto de borrar todo lo que has escrito. ¿Deseas proceder?</p>
          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={() => setIsDialogOpen(false)}>No</Button>
            <Button onClick={confirmClear} className="bg-red-500 text-white">
              Sí
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UserNotes