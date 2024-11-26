import React, { useState } from "react";
import TodoItem from "./todoItem";

const Todo = () => {
  const [items, setItems] = useState<number[]>([]); 

  const addNewItem = () => {
    setItems((prevItems) => [...prevItems, prevItems.length + 1]);
  };

  return (
    <div className="w-full">
      <div className="flex items-start justify-between">
        <p className="text-2xl">To Do</p>

        <button className="btn btn-active btn-ghost" onClick={addNewItem}>
          New Note
        </button>
      </div>

      <div className="divider"></div>

      <div>
        {items.map((item, index) => (
          <TodoItem key={index} itemNumber={item} />
        ))}
      </div>

    </div>
  );
};

export default Todo;