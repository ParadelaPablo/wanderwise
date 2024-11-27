import React, { useState } from "react";
import TodoItem from "./todoItem";

const Todo = () => {
  const [items, setItems] = useState<number[]>([]);

  const addNewItem = () => {
    setItems((prevItems) => [...prevItems, prevItems.length + 1]);
  };

  const removeItem = (itemNumber: number) => {
    setItems((prevItems) => prevItems.filter((item) => item !== itemNumber));
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
          <TodoItem key={item} itemNumber={item} removeItem={removeItem} />
        ))}
      </div>
    </div>
  );
};

export default Todo;
