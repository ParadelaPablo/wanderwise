import React, { useState } from "react";

interface TodoItemProps {
  text: string;
  done: boolean;
  persistItem: (text: string) => void;
  updateItem: (updatedTodo: { text: string; done: boolean }) => void;
  removeItem: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  text,
  done,
  persistItem,
  updateItem,
  removeItem,
}) => {
  const [taskText, setTaskText] = useState(text);
  const [isChecked, setIsChecked] = useState(done);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && taskText.trim().length > 0) {
      persistItem(taskText.trim());
    }
  };

  const handleCheckboxChange = () => {
    const updatedDone = !isChecked;
    setIsChecked(updatedDone);
    updateItem({ text: taskText, done: updatedDone });
  };

  return (
    <div className="form-control bg-white shadow-xl rounded-lg p-3 mb-4">
      <label className="label cursor-pointer justify-between items-center space-x-3">
        <input
          type="checkbox"
          className="peer hidden"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <div className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center peer-checked:border-green-500 peer-checked:bg-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <input
          type="text"
          value={taskText}
          onChange={handleTextChange}
          onKeyPress={handleKeyPress}
          placeholder="Item..."
          className="input input-bordered w-full max-w-xs h-8 px-2 text-sm rounded-md focus:ring-2 focus:ring-green-400"
        />

        <button
          className="btn btn-xs w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
          onClick={removeItem}
        >
          ✖
        </button>
      </label>
    </div>
  );
};

export default TodoItem;
