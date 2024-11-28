import Footer from "@/components/Footer";
import EquipmentSearch from "@/components/EquipmentSearch";
import UserNotes from "@/components/UserNotes";

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

interface Item {
  id: string;
  label: string;
  message: string;
  data?: Brand[];
}

const GeneralDetail: React.FC<{ item: Item }> = ({ item }) => {
  if (item.id === "equipos") {
    return (
      <div className="mt-4 w-full">
        <EquipmentSearch equipmentData={item.data || []} />
        <Footer />
      </div>
    );
  }

  if (item.id === "userChats") {
    return (
      <div className="mt-4 w-full">
        <UserNotes />
        <Footer />
      </div>
    );
  }

  return (
    <div className="mt-4 w-full">
      <textarea
        className="w-full p-2 bg-black border-2 border-red-500 text-white rounded"
        value={item.message}
        readOnly
        style={{ minHeight: "300px" }}
      />
      <Footer />
    </div>
  );
};

export default GeneralDetail;