import SalesList from '@/components/SalesList';

const SalesPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Plantillas BO de ventas</h1>
      <SalesList />
    </div>
  );
};

export default SalesPage;
