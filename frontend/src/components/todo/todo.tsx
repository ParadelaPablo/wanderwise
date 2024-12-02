import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const todos = await getToDosByTrip(tripId);
        setItems(todos.map((todo) => ({ ...todo, id: todo.id ?? "" })));
      } catch (error) {
        toast.error("Error fetching todos");
        console.error("Error fetching todos:", error);
      }
    };

    fetchToDos();
  }, [tripId]);

  const addNewItem = async () => {
    const tempId = `temp-${Date.now()}`;
    const newItem: ToDo = { id: tempId, text: "", done: false };
    setItems((prevItems) => [...prevItems, newItem]);
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

  const removeItem = async (id: string) => {
    const originalItems = [...items];
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));

    try {
      await deleteToDo(tripId, id);
      toast.success("Item deleted successfully!");
    } catch (error) {
      toast.error("Error deleting todo");
      console.error("Error deleting todo:", error);
      setItems(originalItems);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between bg-green-400 p-4 rounded-lg text-white shadow-md">
        <p className="text-xl font-semibold">To Do</p>
        <button
          className="btn btn-sm bg-white text-green-500 font-medium rounded-md hover:bg-green-100"
          onClick={addNewItem}
        >
          New Item
        </button>
      </div>

      <div className="divider my-4"></div>

      <div>
        {items.map((item) => (
          <TodoItem
            key={item.id ?? "default-id"}
            text={item.text}
            done={item.done}
            persistItem={(text) => persistNewItem(item.id ?? "default-id", text)}
            updateItem={(updatedTodo) =>
              updateItem({ ...updatedTodo, id: item.id ?? "default-id" })
            }
            removeItem={() => removeItem(item.id ?? "default-id")}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
