import React, { useEffect, useState } from "react";
import TodoItem from "./todoItem";
import { createToDo, getToDosByTrip, updateToDo, deleteToDo } from "../../services/todoService";

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
        setItems(todos.map(todo => ({ ...todo, id: todo.id ?? "" })));
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchToDos();
  }, [tripId]);

  const addNewItem = async () => {
    const newItem: ToDo = { id: undefined, text: "New Task", done: false };

    setItems((prevItems) => [...prevItems, newItem]);

    try {
      const createdToDo = await createToDo(tripId, { text: "New Task", done: false });

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === undefined ? { ...createdToDo, id: createdToDo.id } : item
        )
      );
    } catch (error) {
      console.error("Error creating todo:", error);

      setItems((prevItems) => prevItems.filter((item) => item.id !== undefined));
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
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const removeItem = async (id: string) => {
    const originalItems = [...items];
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));

    try {
      await deleteToDo(tripId, id);
    } catch (error) {
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
            id={item.id ?? "default-id"} 
            text={item.text}
            done={item.done}
            updateItem={(updatedTodo) => updateItem({ ...updatedTodo, id: item.id ?? "default-id" })}
            removeItem={() => removeItem(item.id ?? "default-id")}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
