import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

export default function OrderPage() {
  const [table, setTable] = useState("");
  const [order, setOrder] = useState([]);
  const [comments, setComments] = useState("");
  const sugarOptions = ["Σκέτο", "Μετρίο", "Προς το Γλυκό", "Γλυκό"];
  const milkOptions = ["Κανένα", "Φρέσκο", "Εβαπορέ"];
  
  const menu = [
    { id: 1, name: "Espresso", price: 2.0, customizable: true },
    { id: 2, name: "Cappuccino", price: 2.5, customizable: true },
    { id: 3, name: "Beer", price: 4.0, customizable: false },
    { id: 4, name: "Fries", price: 3.5, customizable: false },
  ];

  const addToOrder = (item, sugar = "Σκέτο", milk = "Κανένα") => {
    setOrder([...order, { ...item, sugar, milk }]);
  };

  const removeFromOrder = (index) => {
    setOrder(order.filter((_, i) => i !== index));
  };

  const submitOrder = async () => {
    if (!table) {
      toast.error("Παρακαλώ εισάγετε αριθμό τραπεζιού");
      return;
    }

    const orderData = { table, items: order, comments };

    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    toast.success("Η παραγγελία στάλθηκε!");
    setOrder([]);
    setComments("");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Κάντε την παραγγελία σας</h1>
      <Input
        type="number"
        placeholder="Αριθμός Τραπεζιού"
        value={table}
        onChange={(e) => setTable(e.target.value)}
        className="my-2"
      />
      <div className="grid grid-cols-2 gap-2">
        {menu.map((item) => (
          <Card key={item.id} className="p-2">
            <CardContent>
              <p>{item.name} - €{item.price.toFixed(2)}</p>
              {item.customizable && (
                <>
                  <Select onValueChange={(value) => addToOrder(item, value, "Κανένα")}>
                    {sugarOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option} Ζάχαρη</SelectItem>
                    ))}
                  </Select>
                  <Select onValueChange={(value) => addToOrder(item, "Σκέτο", value)}>
                    {milkOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option} Γάλα</SelectItem>
                    ))}
                  </Select>
                </>
              )}
              <Button onClick={() => addToOrder(item)}>Προσθήκη</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <h2 className="text-lg font-bold mt-4">Η Παραγγελία σας</h2>
      <ul>
        {order.map((item, index) => (
          <li key={index} className="flex justify-between p-2 border-b">
            {item.name} - €{item.price.toFixed(2)} ({item.sugar}, {item.milk})
            <Button variant="destructive" onClick={() => removeFromOrder(index)}>X</Button>
          </li>
        ))}
      </ul>
      <Textarea
        placeholder="Σχόλια για την παραγγελία (π.χ. χωρίς πάγο)"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        className="mt-2"
      />
      <Button onClick={submitOrder} className="mt-4 w-full">Αποστολή Παραγγελίας</Button>
    </div>
  );
}
