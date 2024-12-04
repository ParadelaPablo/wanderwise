import React, { useEffect, useState, useRef } from "react";
import ToPackItems from "./topackItems";
import { createToPack, getToPacksByTrip, updateToPack, deleteToPack } from "../../services/toPackService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToPack {
  id: string | number | undefined;
  text: string;
  done: boolean;
}

const ToPack: React.FC<{ tripId: string }> = ({ tripId }) => {
  const [items, setItems] = useState<ToPack[]>([]);
  const newItemIdRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchToPacks = async () => {
      try {
        const response = await getToPacksByTrip(tripId);
        
        const topacks = Array.isArray(response) ? response : [];
        
        setItems(topacks.map(pack => ({ ...pack, id: pack.id ?? "" })));
      } catch (error) {
        console.error("Error fetching topacks:", error);
        toast.error("Failed to fetch ToPack items. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    };

    fetchToPacks();
  }, [tripId]);

  const addNewItem = () => {
    const tempId = `temp-${Date.now()}`;
    const newItem: ToPack = { id: tempId, text: "", done: false };
    setItems(prevItems => [...prevItems, newItem]);
    newItemIdRef.current = tempId;
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
        toast.success("New item was successfully added!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else {
        console.error("Created ToPack does not have a valid ID.");
        setItems(prevItems => prevItems.filter(item => item.id !== tempId));
        toast.error("Failed to persist the item. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error creating topack:", error);
      setItems(prevItems => prevItems.filter(item => item.id !== tempId));
      toast.error("Error creating ToPack item. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const updateItem = async (updatedItem: ToPack) => {
    try {
      if (updatedItem.id) {
        const updated = await updateToPack(tripId, String(updatedItem.id), { ...updatedItem, id: String(updatedItem.id) });
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === updated.id ? { ...item, text: updated.text, done: updated.done } : item
          )
        );
        toast.info("Item updated successfully.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error updating topack:", error);
      toast.error("Failed to update the item. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const removeItem = (id: string | number) => {
    if (typeof id === 'string' && id.startsWith("temp-")) {
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } else {
      const originalItems = [...items];
      setItems(prevItems => prevItems.filter(item => item.id !== id));
  
      deleteToPack(tripId, String(id)) 
        .then(() => {
          toast.success("Item deleted successfully.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
          });
        })
        .catch((error) => {
          console.error("Error deleting topack:", error);
          setItems(originalItems);
          toast.error("Failed to delete the item. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
          });
        });
    }
  };
  

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between bg-neutral p-4 rounded-xl shadow-md">
        <p className="text-xl font-semibold text-neutral-content">To Pack</p>
        <button className="btn btn-sm btn-base text-base-content" onClick={addNewItem}>
          New Item
        </button>
      </div>

      <div className="divider my-4"></div>

      <div>
        {items.map(item => (
          <div key={item.id}>
            <ToPackItems
              text={item.text}
              done={item.done}
              persistItem={(text) => persistNewItem(String(item.id ?? "default-id"), text)}
              updateItem={(updatedToPack) => updateItem({ ...updatedToPack, id: item.id ?? "default-id" })}
              removeItem={() => removeItem(item.id ?? "default-id")}
              isNew={item.id === newItemIdRef.current}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToPack;
