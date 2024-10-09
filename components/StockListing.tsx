"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, ArrowUpDown } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Stock {
  id: string;
  name: string;
  price: number;
  views: number;
}

export default function StockListing() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [visiblePrices, setVisiblePrices] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { toast } = useToast();

  useEffect(() => {
    // In a real application, this would fetch data from an API
    const mockStocks: Stock[] = [
      { id: '1', name: 'NABIL', price: 1000, views: 0 },
      { id: '2', name: 'NRIC', price: 800, views: 0 },
      { id: '3', name: 'UPPER', price: 600, views: 0 },
    ];
    setStocks(mockStocks);
  }, []);

  const togglePriceVisibility = (id: string) => {
    setVisiblePrices(prev => {
      const newState = { ...prev, [id]: !prev[id] };
      if (newState[id]) {
        setStocks(stocks.map(stock => 
          stock.id === id ? { ...stock, views: stock.views + 1 } : stock
        ));
      }
      return newState;
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const filteredAndSortedStocks = stocks
    .filter(stock => stock.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.views - b.views;
      } else {
        return b.views - a.views;
      }
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Odd Stocks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button onClick={toggleSortOrder}>
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort by Views
          </Button>
        </div>
        <ul className="space-y-4">
          {filteredAndSortedStocks.map(stock => (
            <li key={stock.id} className="flex items-center justify-between p-2 border rounded">
              <span>{stock.name}</span>
              <div className="flex items-center space-x-2">
                {visiblePrices[stock.id] ? (
                  <span>Rs. {stock.price}</span>
                ) : (
                  <span>Price hidden</span>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => togglePriceVisibility(stock.id)}
                >
                  {visiblePrices[stock.id] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <span className="text-sm text-gray-500">Views: {stock.views}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}