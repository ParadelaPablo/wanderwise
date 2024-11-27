import React, { useState } from "react";
import ToPackItems from "./topackItems";

const ToPack = () => {
  const [items, setItems] = useState<number[]>([]);

  const addNewItem = () => {
    setItems((prevItems) => [...prevItems, prevItems.length + 1]);
  };

  const removeItem = (itemNumber: number) => {
    setItems((prevItems) => prevItems.filter((item) => item !== itemNumber));
  };

  return (
    <div className="w-full">
      <div className="flex items-start justify-between">
        <p className="text-2xl">To Pack</p>

        <button className="btn btn-active btn-ghost mr-2" onClick={addNewItem}>
          New Item
        </button>
      </div>

      <div className="divider"></div>

      <div>
        {items.map((item) => (
          <ToPackItems key={item} itemNumber={item} removeItem={removeItem} />
        ))}
      </div>
    </div>
  );
};

export default ToPack;





