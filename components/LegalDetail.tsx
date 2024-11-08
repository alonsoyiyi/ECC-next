// components/LegalDetail.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GlobalInputs } from '@/types/globalTypes'
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast"


interface LegalDetailProps {
  selectedLegalId: string;
  globalInputs: GlobalInputs;
}

interface MensajeLegal {
  id: string
  label: string
  inputref: string[]
  message: string
}

interface InputLegal {
  label: string
  type: string
  options?: { value: string; label: string }[]
}

interface DatosLegales {
  messages: MensajeLegal[]
  inputs: { [key: string]: InputLegal }
}

export default function LegalDetail({ globalInputs }: LegalDetailProps) {
  const [step, setStep] = useState(1)
  const [selectedOption1, setSelectedOption1] = useState<string | null>(null)
  const [selectedOption2, setSelectedOption2] = useState<string | null>(null)
  const [selectedOption4, setSelectedOption4] = useState<string | null>(null)
  const [selectedOption5, setSelectedOption5] = useState<string | null>(null)
  const [selectedOption6, setSelectedOption6] = useState<string | null>(null)
  const [selectedOption8, setSelectedOption8] = useState<string | null>(null)
  const [codes, setCodes] = useState<number[]>([])
  const [datosLegales, setDatosLegales] = useState<DatosLegales | null>(null)
  const [mensajeFinal, setMensajeFinal] = useState('')
  const [valoresInput, setValoresInput] = useState<{ [key: string]: string }>({})
  const { toast } = useToast();
  const [states, setStates] = useState<StateType>({
    s1: 0,
    s2: 0,
    s4: 0,
    s5: 0,
    s6: 0,
    s8: 0,
  });

  type StateType = {
    s1: number;
    s2: number;
    s4: number;
    s5: number;
    s6: number;
    s8: number;
  };



  const updateState = (key: keyof StateType, value: number) => {
    setStates(prev => ({
      ...prev,
      [key]: value,
    }));
  };


  useEffect(() => {
    obtenerDatosLegales()
  }, [])

  const obtenerDatosLegales = async () => {
    try {
      const respuesta = await fetch('/api/legales')
      if (!respuesta.ok) throw new Error('Error al obtener datos legales')
      const datos: DatosLegales = await respuesta.json()
      setDatosLegales(datos)
    } catch (error) {
      console.error('Error al obtener datos legales:', error)
    }
  }

  // Función para obtener los valores de la primera pregunta
  const getPaymentOptions = () => {
    switch (selectedOption1) {
      case 'Contado':
        return [1, 2];
      case 'Cuotas sin inicial':
        return [1, 3];
      case 'Cuotas con inicial':
        return [1, 4];
      default:
        return [];
    }
  };

  // Función para obtener los valores de la segunda pregunta
  const getAccessoryOptions = () => {
    switch (selectedOption2) {
      case 'Sin accesorio':
        return [5];
      case 'Con accesorio al contado':
        return [6];
      case 'Con accesorio a cuotas sin inicial':
        return [7];
      case 'Con accesorio a cuotas con inicial':
        return [8];
      default:
        return [];
    }
  };

  // Función para obtener los valores de la quinta pregunta
  const getPlanOptions = () => {
    switch (selectedOption5) {
      case 'Mismo plan':
        return [13, 14];
      case 'Plan Max':
        return [13, 15];
      case 'Plan Max Ilimitado':
        return [13, 16];
      default:
        return [];
    }
  };

  // Función para obtener los valores de la sexta pregunta
  const getDeliveryOptions = (): number[] => {
    return (selectedOption6 === 'Delivery' || selectedOption6 === 'Recojo') ? [17, 18] : [];
  };




  useEffect(() => {
    if (step === 1 && states.s1 > 0) {
      console.log('Nuevo valor de s1:', states.s1);
      setStep(2);
    }
    else if (step === 2 && states.s2 === 3) {
      console.log('Nuevo valor de s2:', states.s2);

      if (selectedOption2 === 'Sin accesorio') {
        setCodes((prev) => [...prev, 10]);
      } else {
        setCodes((prev) => [...prev, 9]);
      }

      setStep(4);
    }
    else if (step === 4 && states.s4 === 5) {
      console.log(states.s4);
      setStep(5);

    }
    else if (step === 5 && states.s5 === 7) {
      console.log(states.s5);
      setStep(6);
    }
    else if (step === 6 && states.s6 === 9) {
      console.log(states.s6);
      setStep(8);
    }
    else if (step === 8 && states.s8 > 10) {
      console.log(states.s8);
      if ((selectedOption1 === 'Contado' || selectedOption1 === 'Cuotas con inicial') && selectedOption6 === 'Delivery') {
        setCodes((prev) => [...prev, 45]);
      } else if (selectedOption1 === 'Cuotas sin inicial' && selectedOption6 === 'Delivery') {
        setCodes((prev) => [...prev, 46]);
      } else if ((selectedOption1 === 'Contado' || selectedOption1 === 'Cuotas con inicial') && selectedOption6 === 'Recojo') {
        setCodes((prev) => [...prev, 47]);
      } else if (selectedOption1 === 'Cuotas sin inicial' && selectedOption6 === 'Recojo') {
        setCodes((prev) => [...prev, 48]);
      }
      setStep(9);
    }

  }, [codes, step, states.s1, states.s2, states.s4, states.s5, states.s6, states.s8]);



  // Función para manejar el botón "Siguiente"
  const handleNextClick = () => {

    if (step === 1) {
      const paymentOptions = getPaymentOptions();
      setCodes(paymentOptions);
      updateState("s1", paymentOptions.length)
      console.log(paymentOptions.length);

      if (paymentOptions.length < 1) {
        console.log("hago aca");
        toast({
          variant: "destructive",
          title: "Por favor selecciona alguna opción",
          description: "Gracias",
        });
      }

    }


    if (step === 2) {
      const paymentOptions = getPaymentOptions();
      setCodes(paymentOptions);
      console.log(paymentOptions.length);

      const updatedCodes = [...codes, ...getAccessoryOptions()];
      setCodes(updatedCodes);
      updateState("s2", updatedCodes.length)
      console.log(updatedCodes.length);

      if (updatedCodes.length < 3) {
        console.log("hago aca");
        toast({
          variant: "destructive",
          title: "Por favor selecciona alguna opción",
          description: "Gracias",
        });
      }

    }
    if (step === 4) {
      if (selectedOption4 === 'Con renta') {
        setCodes((prev) => {
          const updatedCodes = [...prev, 11];
          updateState("s4", updatedCodes.length);
          return updatedCodes;
        });
      } else if (selectedOption4 === 'Sin renta') {
        setCodes((prev) => {
          const updatedCodes = [...prev, 12];
          updateState("s4", updatedCodes.length);
          return updatedCodes;
        });
      }
      else {
        console.log("hago aca");
        toast({
          variant: "destructive",
          title: "Por favor selecciona alguna opción",
          description: "Gracias",
        });
      }
    }



    if (step === 5) {
      const updatedCodes = [...codes, ...getPlanOptions()];
      setCodes(updatedCodes);

      console.log(updatedCodes.length);
      updateState("s5", updatedCodes.length);

      if (updatedCodes.length < 7) {
        console.log("hago aca");
        toast({
          variant: "destructive",
          title: "Por favor selecciona alguna opción",
          description: "Gracias",
        })
      };


    } if (step === 6) {



      const updatedCodes = [...codes, ...getDeliveryOptions()];
      setCodes(updatedCodes);

      console.log(updatedCodes.length);
      updateState("s6", updatedCodes.length);

      if (updatedCodes.length < 9) {
        console.log("hago aca");
        toast({
          variant: "destructive",
          title: "Por favor selecciona alguna opción",
          description: "Gracias",
        })
      };


      // Evaluación de la pregunta 7
      if (selectedOption1 === 'Contado' && selectedOption2 === 'Sin accesorio' && selectedOption6 === 'Delivery') {
        setCodes((prev) => [...prev, 19]);
      } else if (selectedOption1 === 'Contado' && selectedOption2 === 'Con accesorio al contado' && selectedOption6 === 'Delivery') {
        setCodes((prev) => [...prev, 20]);
      } else if (selectedOption1 === 'Contado' && selectedOption2 === 'Con accesorio a cuotas sin inicial' && selectedOption6 === 'Delivery') {
        setCodes((prev) => [...prev, 21]);
      } else if (selectedOption1 === 'Contado' && selectedOption2 === 'Con accesorio a cuotas con inicial' && selectedOption6 === 'Delivery') {
        setCodes((prev) => [...prev, 22]);
      }

      else if (selectedOption1 === 'Cuotas sin inicial' && selectedOption2 === 'Sin accesorio' && selectedOption6 === 'Delivery') {
        setCodes((prev) => [...prev, 23]);
      } else if (selectedOption1 === 'Cuotas sin inicial' && selectedOption2 === 'Con accesorio al contado' && selectedOption6 === 'Delivery') {
        setCodes((prev) => [...prev, 24]);
      } else if (selectedOption1 === 'Cuotas sin inicial' && selectedOption2 === 'Con accesorio a cuotas sin inicial' && selectedOption6 === 'Delivery') {
        setCodes((prev) => [...prev, 25]);
      } else if (selectedOption1 === 'Cuotas sin inicial' && selectedOption2 === 'Con accesorio a cuotas con inicial' && selectedOption6 === 'Delivery') {
        setCodes((prev) => [...prev, 26]);
      }

      else if (selectedOption1 === 'Cuotas con inicial' && selectedOption2 === 'Sin accesorio' && selectedOption6 === 'Delivery') {
        setCodes((prev) => [...prev, 27]);
      } else if (selectedOption1 === 'Cuotas con inicial' && selectedOption2 === 'Con accesorio al contado' && selectedOption6 === 'Delivery') {
        setCodes((prev) => [...prev, 28]);
      } else if (selectedOption1 === 'Cuotas con inicial' && selectedOption2 === 'Con accesorio a cuotas sin inicial' && selectedOption6 === 'Delivery') {
        setCodes((prev) => [...prev, 29]);
      } else if (selectedOption1 === 'Cuotas con inicial' && selectedOption2 === 'Con accesorio a cuotas con inicial' && selectedOption6 === 'Delivery') {
        setCodes((prev) => [...prev, 30]);
      }

      else if (selectedOption1 === 'Contado' && selectedOption2 === 'Sin accesorio' && selectedOption6 === 'Recojo') {
        setCodes((prev) => [...prev, 31]);
      } else if (selectedOption1 === 'Contado' && selectedOption2 === 'Con accesorio al contado' && selectedOption6 === 'Recojo') {
        setCodes((prev) => [...prev, 32]);
      } else if (selectedOption1 === 'Contado' && selectedOption2 === 'Con accesorio a cuotas sin inicial' && selectedOption6 === 'Recojo') {
        setCodes((prev) => [...prev, 33]);
      } else if (selectedOption1 === 'Contado' && selectedOption2 === 'Con accesorio a cuotas con inicial' && selectedOption6 === 'Recojo') {
        setCodes((prev) => [...prev, 34]);
      }

      else if (selectedOption1 === 'Cuotas sin inicial' && selectedOption2 === 'Sin accesorio' && selectedOption6 === 'Recojo') {
        setCodes((prev) => [...prev, 35]);
      } else if (selectedOption1 === 'Cuotas sin inicial' && selectedOption2 === 'Con accesorio al contado' && selectedOption6 === 'Recojo') {
        setCodes((prev) => [...prev, 36]);
      } else if (selectedOption1 === 'Cuotas sin inicial' && selectedOption2 === 'Con accesorio a cuotas sin inicial' && selectedOption6 === 'Recojo') {
        setCodes((prev) => [...prev, 37]);
      } else if (selectedOption1 === 'Cuotas sin inicial' && selectedOption2 === 'Con accesorio a cuotas con inicial' && selectedOption6 === 'Recojo') {
        setCodes((prev) => [...prev, 38]);
      }

      else if (selectedOption1 === 'Cuotas con inicial' && selectedOption2 === 'Sin accesorio' && selectedOption6 === 'Recojo') {
        setCodes((prev) => [...prev, 39]);
      } else if (selectedOption1 === 'Cuotas con inicial' && selectedOption2 === 'Con accesorio al contado' && selectedOption6 === 'Recojo') {
        setCodes((prev) => [...prev, 40]);
      } else if (selectedOption1 === 'Cuotas con inicial' && selectedOption2 === 'Con accesorio a cuotas sin inicial' && selectedOption6 === 'Recojo') {
        setCodes((prev) => [...prev, 41]);
      } else if (selectedOption1 === 'Cuotas con inicial' && selectedOption2 === 'Con accesorio a cuotas con inicial' && selectedOption6 === 'Recojo') {
        setCodes((prev) => [...prev, 42]);
      }
      const s6 = codes.length;
      console.log(s6);

      // setStep(8);
    } if (step === 8) {

      if (selectedOption8 === 'Con PM') {
        setCodes((prev) => {
          const updatedCodes = [...prev, 43];
          updateState("s8", updatedCodes.length);
          // console.log(updatedCodes);
          return updatedCodes;

        });
      } else if (selectedOption8 === 'Sin PM') {
        setCodes((prev) => {
          const updatedCodes = [...prev, 44];
          updateState("s8", updatedCodes.length);
          // console.log(updatedCodes);
          return updatedCodes;
        });
      }
      else {
        console.log("hago aca");
        toast({
          variant: "destructive",
          title: "Por favor selecciona alguna opción",
          description: "Gracias",
        });
      }

    }
  };




  useEffect(() => {
    if (step === 9) {
      const s9 = codes.length;
      console.log(s9);
      generarMensajeFinal();
    }
  }, [step, codes]);


  const generarMensajeFinal = useCallback(() => {
    if (!datosLegales) return

    const mensajes = codes
      .map(code => datosLegales.messages.find(m => m.id === code.toString()))
      .filter((m): m is MensajeLegal => m !== undefined)

    const mensajesFormateados = mensajes.map(m => {
      let mensajeFormateado = m.message
      m.inputref.forEach(inputKey => {

        const valor = inputKey === 'userName' ? globalInputs.nombre : (valoresInput[inputKey] || `{${inputKey}}`)
        mensajeFormateado = mensajeFormateado.split(`{${inputKey}}`).join(valor)

      })
      return mensajeFormateado
    })

    setMensajeFinal(mensajesFormateados.join('\n\n'))
  }, [codes, datosLegales, valoresInput, globalInputs])

  useEffect(() => {
    generarMensajeFinal()
  }, [generarMensajeFinal])

  const renderizarInputs = () => {
    if (!datosLegales) return null

    const inputRefsUnicos = Array.from(new Set(codes.flatMap(code =>
      datosLegales.messages.find(m => m.id === code.toString())?.inputref || []
    ))).filter(inputRef => inputRef !== 'userName') // Excluye userName

    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-1/2 pr-4  ">
        {inputRefsUnicos.map(inputRef => {
          const input = datosLegales.inputs[inputRef]
          if (!input) return null

          return (
            <div key={inputRef} className="mb-2">
              <Label htmlFor={inputRef} className="text-sm">{input.label}</Label>
              {input.type === 'text' ? (
                <Input
                  id={inputRef}
                  value={valoresInput[inputRef] || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValoresInput(prev => ({ ...prev, [inputRef]: e.target.value }))
                  }}
                  placeholder={`Ingrese ${input.label.toLowerCase()}`}
                  className="w-full text-sm h-8 bg-black text-white"

                />
              ) : (
                <Select
                  onValueChange={(value) => {
                    setValoresInput(prev => ({ ...prev, [inputRef]: value }))
                  }}
                >
                  <SelectTrigger className="w-full text-sm h-8">
                    <SelectValue placeholder={`Seleccione ${input.label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent className="max-h-48 overflow-y-auto">
                    {input.options?.filter(option => option.value !== '').map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )
        })}
      </div>
    )
  };



  // Función para reiniciar el proceso
  const handleClear = () => {
    setStep(1);
    setSelectedOption1(null);
    setSelectedOption2(null);
    setSelectedOption4(null);
    setSelectedOption5(null);
    setSelectedOption6(null);
    setSelectedOption8(null);
    setMensajeFinal('');
    setValoresInput({});
    setCodes([]);
    setStates({
      s1: 0,
      s2: 0,
      s4: 0,
      s5: 0,
      s6: 0,
      s8: 0,
    });
  };






  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-2 text-center">Lecturas Legales</h1>

      <div className="flex flex-col items-center">
        {step <= 8 && (
          <>

            {step === 1 && (
              <div className="text-center">
                <p className="text-lg mb-4">1. ¿Venta al contado o a cuotas?</p>
                <div className="flex flex-col space-y-2 mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="Contado"
                      onChange={() => setSelectedOption1('Contado')}
                      checked={selectedOption1 === 'Contado'}
                    />
                    <span>Contado</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="Cuotas sin inicial"
                      onChange={() => setSelectedOption1('Cuotas sin inicial')}
                      checked={selectedOption1 === 'Cuotas sin inicial'}
                    />
                    <span>Cuotas sin inicial</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="Cuotas con inicial"
                      onChange={() => setSelectedOption1('Cuotas con inicial')}
                      checked={selectedOption1 === 'Cuotas con inicial'}
                    />
                    <span>Cuotas con inicial</span>
                  </label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="text-lg mb-4">2. ¿Venta con accesorio?</p>
                <div className="flex flex-col space-y-2 mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="accessoryOption"
                      value="Sin accesorio"
                      onChange={() => setSelectedOption2('Sin accesorio')}
                      checked={selectedOption2 === 'Sin accesorio'}
                    />
                    <span>Sin accesorio</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="accessoryOption"
                      value="Con accesorio al contado"
                      onChange={() => setSelectedOption2('Con accesorio al contado')}
                      checked={selectedOption2 === 'Con accesorio al contado'}
                    />
                    <span>Con accesorio al contado</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="accessoryOption"
                      value="Con accesorio a cuotas con inicial"
                      onChange={() => setSelectedOption2('Con accesorio a cuotas con inicial')}
                      checked={selectedOption2 === 'Con accesorio a cuotas con inicial'}
                    />
                    <span>Con accesorio a cuotas con inicial</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="accessoryOption"
                      value="Con accesorio a cuotas sin inicial"
                      onChange={() => setSelectedOption2('Con accesorio a cuotas sin inicial')}
                      checked={selectedOption2 === 'Con accesorio a cuotas sin inicial'}
                    />
                    <span>Con accesorio a cuotas sin inicial</span>
                  </label>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <p className="text-lg mb-4">3. ¿Venta con renta adelantada o sin renta adelantada?</p>
                <div className="flex flex-col space-y-2 mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="rentaOption"
                      value="Con renta"
                      onChange={() => setSelectedOption4('Con renta')}
                      checked={selectedOption4 === 'Con renta'}
                    />
                    <span>Con renta</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="rentaOption"
                      value="Sin renta"
                      onChange={() => setSelectedOption4('Sin renta')}
                      checked={selectedOption4 === 'Sin renta'}
                    />
                    <span>Sin renta</span>
                  </label>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <p className="text-lg mb-4">4. ¿Qué plan desea?</p>
                <div className="flex flex-col space-y-2 mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="planOption"
                      value="Mismo plan"
                      onChange={() => setSelectedOption5('Mismo plan')}
                      checked={selectedOption5 === 'Mismo plan'}
                    />
                    <span>Mismo plan</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="planOption"
                      value="Plan Max"
                      onChange={() => setSelectedOption5('Plan Max')}
                      checked={selectedOption5 === 'Plan Max'}
                    />
                    <span>Plan Max</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="planOption"
                      value="Plan Max Ilimitado"
                      onChange={() => setSelectedOption5('Plan Max Ilimitado')}
                      checked={selectedOption5 === 'Plan Max Ilimitado'}
                    />
                    <span>Plan Max Ilimitado</span>
                  </label>
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <p className="text-lg mb-4">5. ¿Cómo será la entrega?</p>
                <div className="flex flex-col space-y-2 mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="Delivery"
                      onChange={() => setSelectedOption6('Delivery')}
                      checked={selectedOption6 === 'Delivery'}
                    />
                    <span>Delivery</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="Recojo"
                      onChange={() => setSelectedOption6('Recojo')}
                      checked={selectedOption6 === 'Recojo'}
                    />
                    <span>Recojo</span>
                  </label>
                </div>
              </div>
            )}
            {step === 8 && (
              <div>
                <p className="text-lg mb-4">6. ¿Activa Protección Móvil?</p>
                <div className="flex flex-col space-y-2 mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="additionalOption"
                      value="Con PM"
                      onChange={() => setSelectedOption8('Con PM')}
                      checked={selectedOption8 === 'Con PM'}
                    />
                    <span>Con PM</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="additionalOption"
                      value="Sin PM"
                      onChange={() => setSelectedOption8('Sin PM')}
                      checked={selectedOption8 === 'Sin PM'}
                    />
                    <span>Sin PM</span>
                  </label>
                </div>
              </div>
            )}

            {step === 9 && (
              <>
                <Textarea
                  value={mensajeFinal}
                  readOnly
                  className="w-full h-60 mb-4 p-2 border border-gray-300 rounded"
                />
                {renderizarInputs()}
              </>
            )}

            <div className="flex justify-center mt-4">
              <Button onClick={handleNextClick} className="mr-2">Siguiente</Button>
              <Button variant="secondary" onClick={handleClear} className="ml-2">Reiniciar</Button>
            </div>

          </>
        )}

        {step <= 8 && (
          <div className="hidden">
            <h2 className="text-lg font-bold text-center">Códigos seleccionados:</h2>
            <Textarea
              className="w-full h-5 p-2 bg-black border-2 border-red-500 text-red-500 rounded"
              value={codes.join(', ')}
              readOnly
            />
          </div>
        )}

        {step > 8 && (
          <div className="flex  w-full h-full mt-4">
            {renderizarInputs()}
            <div className="w-1/2 pl-4 sticky top-0 self-start flex flex-col space-y-4">
              <Textarea
                value={mensajeFinal}
                readOnly
                className="w-full h-[calc(100vh-100px)] p-2 bg-black border-4 border-red-500 text-white rounded"
              />
            </div>
          </div>
        )}


      </div>
      <Footer />
    </div>
  )
}  