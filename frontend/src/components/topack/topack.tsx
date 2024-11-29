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

  const addNewItem = () => {
    const tempId = `temp-${Date.now()}`;
    const newItem: ToPack = { id: tempId, text: "", done: false };
    setItems(prevItems => [...prevItems, newItem]);
  };

  const persistNewItem = async (tempId: string, text: string) => {
    try {
      console.log("Sending to backend:", { text, done: false });
      const createdToPack = await createToPack(tripId, { text, done: false });

      if (createdToPack.id) {
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === tempId ? { ...createdToPack, id: createdToPack.id } : item
          )
        );
        alert("New item successfully persisted!");
      } else {
        console.error("Created ToPack does not have a valid ID.");
        setItems(prevItems => prevItems.filter(item => item.id !== tempId));
      }
    } catch (error) {
      console.error("Error creating topack:", error);
      setItems(prevItems => prevItems.filter(item => item.id !== tempId));
    }
  };

  const updateItem = async (updatedItem: ToPack) => {
    try {
      if (updatedItem.id) {
        const updated = await updateToPack(tripId, updatedItem.id, updatedItem);
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === updated.id ? { ...item, text: updated.text, done: updated.done } : item
          )
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
    <div className="w-full p-4">
      <div className="flex items-center justify-between bg-teal-600 p-4 rounded-lg text-white shadow-md">
        <p className="text-xl font-semibold">To Pack</p>
        <button className="btn btn-sm bg-white text-green-500 font-medium rounded-md hover:bg-green-100" onClick={addNewItem}>
          New Item
        </button>
      </div>

      <div className="divider my-4"></div>

      <div>
        {items.map(item => (
          <ToPackItems
            key={item.id ?? "default-id"}
            text={item.text}
            done={item.done}
            persistItem={(text) => persistNewItem(item.id ?? "default-id", text)}
            updateItem={(updatedToPack) => updateItem({ ...updatedToPack, id: item.id ?? "default-id" })}
            removeItem={() => removeItem(item.id ?? "default-id")}
          />
        ))}
      </div>
    </div>
  );
};

export default ToPack;
