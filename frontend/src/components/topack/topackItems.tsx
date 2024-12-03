import React, { useState, useRef, useEffect } from "react";

interface ToPackItemProps {
  text: string;
  done: boolean;
  persistItem: (text: string) => Promise<void>;
  updateItem: (updatedToPack: { text: string; done: boolean }) => void;
  removeItem: () => void;
  isNew?: boolean;
}

const ToPackItems: React.FC<ToPackItemProps> = ({
  text,
  done,
  persistItem,
  updateItem,
  removeItem,
  isNew = false,
}) => {
  const [taskText, setTaskText] = useState(text);
  const [isChecked, setIsChecked] = useState(done);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextAreaHeight();
    if (isNew && textAreaRef.current) {
      setTimeout(() => {
        textAreaRef.current?.focus();
      }, 0);
    }
  }, [isNew]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskText(e.target.value);
    adjustTextAreaHeight();
  };

  const handleSave = () => {
    if (taskText.trim().length > 0) {
      persistItem(taskText.trim());
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  const handleCheckboxChange = () => {
    const updatedDone = !isChecked;
    setIsChecked(updatedDone);
    updateItem({ text: taskText, done: updatedDone });
  };

  return (
    <div className="form-control bg-white shadow-md rounded-xl p-1 mb-2">
      <div className="collapse collapse-arrow pl-1 pr-1 border border-base-300 bg-base-100 rounded-xl">
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-md font-medium p-1 flex items-center justify-between">
          <span className={`truncate ${taskText.trim() === "" ? "font-thin" : "font-bold"}`}>
            {taskText.split("\n")[0] || "Title..."}
          </span>
        </div>
        <div className="collapse-content p-2">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="checkbox checkbox-primary"
            />
            <span className="ml-2 font-semibold">Mark as done</span>
          </label>

          <textarea
            ref={textAreaRef}
            value={taskText}
            onChange={handleTextChange}
            placeholder="Add a title and details..."
            className="textarea textarea-bordered w-full mt-1 p-1 text-sm resize-none"
            style={{ overflow: "hidden" }}
          />
          <div className="mt-2 flex justify-between items-center">
            <button
              className="btn btn-xs btn-primary font-bold"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="btn btn-xs font-extrabold btn-outline bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600"
              onClick={removeItem}
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToPackItems;
