import Footer from "@/components/Footer";

// Define la interfaz para el tipo de item
interface ItemType {
  message: string; // Propiedad que contiene el mensaje
  id?: number; // Otras propiedades que pueda tener item
}

// Usa el tipo en la declaración del componente
const GeneralDetail: React.FC<{ item: ItemType }> = ({ item }) => {
  return (
    <div className="mt-4 w-full">
      <textarea
        className="w-full p-2 bg-black border-2 border-red-500 text-white rounded"
        value={item.message}
        readOnly
        style={{ minHeight: '300px' }} // Aumentar la altura mínima
      />
      <Footer />
    </div>
  );
};

export default GeneralDetail;
