import React, { useEffect, useState, useRef } from "react";
import TodoItem from "./todoItem";
import { createToDo, getToDosByTrip, updateToDo, deleteToDo } from "../../services/toDoService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToDo {
  id: string | undefined;
  text: string;
  done: boolean;
}

const Todo: React.FC<{ tripId: string }> = ({ tripId }) => {
  const [items, setItems] = useState<ToDo[]>([]);
  const newItemIdRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const todos = await getToDosByTrip(tripId);
        setItems(todos.map((todo) => ({ ...todo, id: String(todo.id) })));
      } catch (error: unknown) {
        if (error instanceof Error && (error as { response?: { status?: number } }).response?.status === 404) {
          toast.error("Trip not found. Please check the ID.");
          setItems([]);
        } else {
          toast.error("Error fetching todos");
          console.error("Error fetching todos:", error);
        }
      }
    };

    fetchToDos();
  }, [tripId]);

  const addNewItem = () => {
    const tempId = `temp-${Date.now()}`;
    const newItem: ToDo = { id: tempId, text: "", done: false };
    setItems((prevItems) => [...prevItems, newItem]);
    newItemIdRef.current = tempId;
  };

  const persistNewItem = async (tempId: string, text: string) => {
    try {
      const createdToDo = await createToDo(tripId, { text, done: false });

      if (createdToDo.id) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === tempId ? { ...createdToDo, id: createdToDo.id as string } : item
          )
        );
        toast.success("New item was successfully added!");
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        toast.error("Failed to add new item. Please try again.");
        setItems((prevItems) => prevItems.filter((item) => item.id !== tempId));
      }
    } catch (error) {
      toast.error("Error creating todo");
      console.error("Error creating todo:", error);
      setItems((prevItems) => prevItems.filter((item) => item.id !== tempId));
    }
  };

  const updateItem = async (updatedItem: ToDo) => {
    try {
      if (updatedItem.id) {
        const updated = await updateToDo(tripId, updatedItem.id, updatedItem);
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === updated.id ? { ...item, text: updated.text, done: updated.done } : item
          )
        );
        toast.success("Item updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating todo");
      console.error("Error updating todo:", error);
    }
  };

  const removeItem = (id: string | undefined) => {
    if (typeof id !== "string") {
      console.error("Invalid ID type, expected a string:", id);
      return;
    }

    if (id.startsWith("temp-")) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } else {
      const originalItems = [...items];
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));

      deleteToDo(tripId, id)
        .then(() => {
          toast.success("Item deleted successfully!");
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            toast.warn("ToDo not found in the database. Removing from the list.");
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));
          } else {
            toast.error("Error deleting todo");
            console.error("Error deleting todo:", error);
            setItems(originalItems);
          }
        });
    }
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between bg-neutral p-4 rounded-xl shadow-md">
        <p className="text-xl font-semibold text-neutral-content">To Do</p>
        <button
          className="btn btn-sm btn-base text-base-content"
          onClick={addNewItem}
        >
          New Item
        </button>
      </div>

      <div className="divider my-4"></div>

      <div>
        {items.map((item) => (
          <div key={item.id}>
            <TodoItem
              text={item.text}
              done={item.done}
              persistItem={(text) => persistNewItem(item.id ?? "default-id", text)}
              updateItem={(updatedTodo) =>
                updateItem({ ...updatedTodo, id: item.id ?? "default-id" })
              }
              removeItem={() => removeItem(item.id ?? "default-id")}
              isNew={item.id === newItemIdRef.current}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
