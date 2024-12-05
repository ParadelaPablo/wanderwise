import React, { useState, useRef, useEffect } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required").max(40, "Title is too long"),
  taskText: z.string().min(1, "Text is required").max(1000, "Text is too long"),
});

interface TodoItemProps {
  text: string;
  done: boolean;
  persistItem: (text: string) => void;
  updateItem: (updatedTodo: { text: string; done: boolean }) => void;
  removeItem: () => void;
  isNew?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  text,
  done,
  persistItem,
  updateItem,
  removeItem,
  isNew = false,
}) => {


  const [taskText, setTaskText] = useState(text);
  const [isChecked, setIsChecked] = useState(done);
  const [errors, setErrors] = useState<{ title?: string; taskText?: string }>(
    {}
  );
  const [title, setTitle] = useState("");

  useEffect(() => {
    const parts = text.split("\n", 2);
    setTitle(parts[0] || "");
    setTaskText(parts[1] || "");
  }, [text]);

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
    try {
      schema.parse({ title, taskText });
      const fullText = `${title} \n ${taskText}`;
      console.log(fullText);

      persistItem(fullText.trim());
      setErrors({});

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { title?: string; taskText?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === "title") newErrors.title = err.message;
          if (err.path[0] === "taskText") newErrors.taskText = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleCheckboxChange = () => {
    const updatedDone = !isChecked;
    setIsChecked(updatedDone);
    updateItem({ text: taskText, done: updatedDone });
  };

  return (
    <div className="form-control bg-white shadow-md p-1 rounded-xl mb-2">
      <div className="collapse collapse-arrow border pl-1 pr-1 border-base-300 bg-base-100 rounded-xl">
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-md font-medium p-1 flex items-center justify-between">
          <span
            className={`truncate ${title === "" ? "font-thin" : "font-bold"}`}
          >
            {title || "Title..."}
          </span>
        </div>
        <div className="collapse-content p-2">
          <div className="container flex flex-row items-center  justify-start mb-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="checkbox checkbox-primary"
            />
            <span className="ml-2 font-semibold">Mark as done</span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full max-w-xs text-sm"
            placeholder="Title..."
            maxLength={40}
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title}</p>
          )}
          <textarea
            ref={textAreaRef}
            value={taskText}
            onChange={handleTextChange}
            placeholder="Add a title and details..."
            className="textarea textarea-bordered w-full mt-1 p-1 text-sm resize-none"
            style={{ overflow: "hidden" }}
          />
          {errors.taskText && (
            <p className="text-red-500 text-xs">{errors.taskText}</p>
          )}
          <div className="mt-2 flex justify-between items-center">
            <button
              className="btn btn-xs btn-primary font-bold"
              onClick={handleSave}
            >
              Save
            </button>

            <div className="dropdown dropdown-top dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost bg-transparent outline-transparent focus:outline-none focus:ring-0 outline-none text-2xl w-16 min-h-8 h-8 flex items-start justify-end"
                style={{
                  outline: "none",
                  boxShadow: "none",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path d="M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-2xl z-20 w-52 p-2 shadow outline outline-1"
              >
                <li>
                  <button
                    type="button"
                    className="hover:bg-yellow-400 hover:rounded hover:text-white"
                  >
                    <FaRegEdit />
                    Edit
                  </button>
                </li>
                <div className="divider gap-0 m-0 p-0"></div>
                <li>
                  <button
                    type="button"
                    onClick={removeItem}
                    className="hover:bg-red-500 hover:rounded hover:text-white"
                  >
                    <FaRegTrashAlt /> Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
