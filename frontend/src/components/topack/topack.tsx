import { useState } from "react";
import ToPackItems from "./topackItems";

const ToPack = () => {
  const [items, setItems] = useState<number[]>([]);

  const addNewItem = () => {
    setItems((prevItems) => [...prevItems, prevItems.length + 1]);
  };

  return (
    <div className="w-full">
      <div className="flex items-start justify-between">
        <p className="text-2xl">To Pack</p>

        <button className="btn btn-active btn-ghost" onClick={addNewItem}>
          New Note
        </button>
      </div>

      <div className="divider"></div>

      <div>
        {items.map((item, index) => (
          <ToPackItems key={index} itemNumber={item} />
        ))}
      </div>
    </div>
  );
};

export default ToPack;
