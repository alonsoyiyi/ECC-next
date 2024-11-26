import Footer from "@/components/Footer"
import EquipmentSearch from "@/components/EquipmentSearch"

interface Item {
  id: string
  label: string
  message: string
  data?: any
}

const GeneralDetail: React.FC<{ item: Item }> = ({ item }) => {
  if (item.id === 'equipos') {
    return (
      <div className="mt-4 w-full">
        <EquipmentSearch equipmentData={item.data} />
        <Footer />
      </div>
    )
  }

  return (
    <div className="mt-4 w-full">
      <textarea
        className="w-full p-2 bg-black border-2 border-red-500 text-white rounded"
        value={item.message}
        readOnly
        style={{ minHeight: '300px' }}
      />
      <Footer />
    </div>
  )
}

export default GeneralDetail