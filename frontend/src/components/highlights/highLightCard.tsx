import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { deleteHighlight } from "@/lib/api";
import { toast } from "react-toastify";
import { Highlight } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface HighlightCardProps {
  highlightInfo: Highlight;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ highlightInfo }) => {
  const {
    text,
    title,
    imageUrl,
    songUrl,
    songArtist,
    songCoverUrl,
    songTitle,
    date,
  } = highlightInfo;

  const queryClient = useQueryClient();
  const [deleteButtonContent, setDeleteButtonContent] = useState(
    <>
      <FaRegTrashAlt /> Delete highglight
    </>
  );
  const [updateButtonContent, setUpdateButtonContent] =
    useState("Update highlight");

  const mutation = useMutation({
    mutationFn: deleteHighlight,
    onMutate: () => {
      // Show the loading state when deletion starts
      toast.info("Deleting highlight...");
    },
    onError: (error: Error) => {
      // Handle errors
      toast.error(`Error deleting highlight: ${error.message}`);
    },
    onSuccess: () => {
      // Invalidate and refetch relevant queries after deletion
      queryClient.invalidateQueries({ queryKey: ["highlights_data"] });
      toast.success("Highlight deleted successfully");
    },
  });

  const handleDelete = () => {
    // Call the mutation
    mutation.mutate(highlightInfo.id);
  };



  const goToSpotify = () => {
    window.open(songUrl, "_blank");
  };

  return (
    <div className="w-80 relative">
      <div className="border rounded-2xl p-4 flex flex-col">
        <div className="flex items-center justify-between w-full">
          <p className=" text-gray-400 w-fit">Date: {date}</p>

          {/* <button className="bg-red-200 text-white rounded-full p-2 w-5 h-5 flex items-center justify-center text-sm hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 absolute top-2 right-2">
          <BsThreeDots />
        </button> */}

          <div className="dropdown dropdown-bottom justify-end flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost bg-transparent outline-transparent focus:outline-none focus:ring-0 outline-none outline-0 justify-end text-2xl w-16 h-16"
              style={{
                outline: "none",
                boxShadow: "none",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-8"
              >
                <path d="M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow outline outline-1"
            >
              <li
                className="hover:bg-red-500 hover:rounded hover:text-white"
                onClick={handleDelete}
              >
                <a className=" border-b border-1">{deleteButtonContent}</a>
              </li>
              <li className="hover:bg-yellow-400 hover:rounded hover:text-white">
                <button
                  type="button"
                  className="hover:bg-yellow-400 hover:rounded hover:text-white"
                >
                  <FaRegEdit />
                  Edit highlight
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            <button className="overflow-hidden h-36 w-full">
              <img
                className="object-cover object-center w-full h-full rounded-2xl"
                src={
                  imageUrl ||
                  "https://img.freepik.com/free-psd/holiday-template-design_23-2150299133.jpg"
                }
                alt=""
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://img.freepik.com/free-psd/holiday-template-design_23-2150299133.jpg";
                }}
              />
            </button>
          </div>

          <details className="collapse bg-gray-100 pb-3">
            <summary className="collapse-title text-md text-gray-600 font-medium">
              {title}
            </summary>
            <div className="collapse-content">
              <p className="text-center h-20 pt-1 text-gray-600">{text}</p>
            </div>
          </details>

          {songTitle && (
            <div className="hover:bg-slate-200 p-4 bg-gray-100 rounded-xl shadow-sm flex items-center justify-between gap-2">
              <div className="flex-shrink-0">
                <img src={songCoverUrl} className="w-16 h-16 rounded-md" />
              </div>

              <div className="flex-grow min-w-0">
                <button onClick={goToSpotify}>
                  <h3 className="font-semibold capitalize  overflow-hidden">
                    {songTitle}
                  </h3>
                  <p className="text-sm text-gray-500  overflow-hidden ">
                    {songArtist}
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;
