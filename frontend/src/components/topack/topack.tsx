import React, { useEffect, useState } from "react";
import ToPackItems from "./topackItems";
import { createToPack, getToPacksByTrip, updateToPack, deleteToPack } from "../../services/toPackService";

interface ToPack {
  id: string | undefined;
  text: string;
  done: boolean;
}

const ToPack: React.FC<{ tripId: string }> = ({ tripId }) => {
  const [items, setItems] = useState<ToPack[]>([]);

  useEffect(() => {
    const fetchToPacks = async () => {
      try {
        const topacks = await getToPacksByTrip(tripId);
        setItems(topacks.map(pack => ({ ...pack, id: pack.id ?? "" })));
      } catch (error) {
        console.error("Error fetching topacks:", error);
      }
    };

    fetchToPacks();
  }, [tripId]);

  const addNewItem = async () => {
    const newItem: ToPack = { id: undefined, text: "New Item", done: false };
    setItems(prevItems => [...prevItems, newItem]);

    try {
      const createdToPack = await createToPack(tripId, { text: "New Item", done: false });
      setItems(prevItems =>
        prevItems.map(item => (item.id === undefined ? { ...createdToPack, id: createdToPack.id } : item))
      );
    } catch (error) {
      console.error("Error creating topack:", error);
      setItems(prevItems => prevItems.filter(item => item.id !== undefined));
    }
  };

  const updateItem = async (updatedItem: ToPack) => {
    try {
      if (updatedItem.id) {
        const updated = await updateToPack(tripId, updatedItem.id, updatedItem);
        setItems(prevItems =>
          prevItems.map(item => (item.id === updated.id ? { ...item, text: updated.text, done: updated.done } : item))
        );
      }
    } catch (error) {
      console.error("Error updating topack:", error);
    }
  };

  const removeItem = async (id: string) => {
    const originalItems = [...items];
    setItems(prevItems => prevItems.filter(item => item.id !== id));

    try {
      await deleteToPack(tripId, id);
    } catch (error) {
      console.error("Error deleting topack:", error);
      setItems(originalItems);
    }
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
        {items.map(item => (
          <ToPackItems
            key={item.id ?? "default-id"}
            id={item.id ?? "default-id"}
            text={item.text}
            done={item.done}
            updateItem={(updatedToPack) => updateItem({ ...updatedToPack, id: item.id ?? "default-id" })}
            removeItem={() => removeItem(item.id ?? "default-id")}
          />
        ))}
      </div>
    </div>
  );
};

export default ToPack;
