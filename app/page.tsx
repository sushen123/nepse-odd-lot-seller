import StockListing from '@/components/StockListing';
import StockForm from '@/components/StockForm';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">NEPSE Odd Stock Market</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StockForm />
        <StockListing />
      </div>
    </div>
  );
}