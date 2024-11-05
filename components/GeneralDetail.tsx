import Footer from "@/components/Footer";

const GeneralDetail = ({ item }) => {
  return (
    <div className="mt-4 w-full">
      <textarea
        className="w-full p-2 bg-black border-2 border-red-500 text-white rounded"
        value={item.message}
        readOnly
        style={{ minHeight: '300px' }} // Aumentar la altura mínima
      />
      <Footer/>
    </div>
  );
};

export default GeneralDetail;
