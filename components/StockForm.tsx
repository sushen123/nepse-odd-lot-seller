"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function StockForm() {
  const [stockName, setStockName] = useState('');
  const [stockPrice, setStockPrice] = useState('');
  const [stockUnits, setStockUnits] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stockName || !stockPrice || !stockUnits) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const units = parseInt(stockUnits, 10);
    if (isNaN(units) || units >= 10) {
      toast({
        title: "Error",
        description: "Stock units must be less than 10.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send this data to your backend
    console.log('Stock listed:', { stockName, stockPrice, stockUnits });
    toast({
      title: "Success",
      description: "Stock listed successfully!",
    });

    // Clear the form
    setStockName('');
    setStockPrice('');
    setStockUnits('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>List Odd Stock</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Stock Name"
              value={stockName}
              onChange={(e) => setStockName(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Stock Price"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Number of Units (less than 10)"
              value={stockUnits}
              onChange={(e) => setStockUnits(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">List Stock</Button>
        </form>
      </CardContent>
    </Card>
  );
}