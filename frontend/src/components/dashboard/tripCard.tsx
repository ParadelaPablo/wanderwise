import { useRouter } from "@tanstack/react-router";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

type TripCardProps = {
  id: number;
  title: string;
  onDelete: (id: number) => void;
};

const myStringArray: string[] = [
  "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
  "https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649",
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
];

const getRandomString = (): string => {
  const randomIndex = Math.floor(Math.random() * myStringArray.length);
  return myStringArray[randomIndex];
};

const TripCard = ({ id, title, onDelete }: TripCardProps) => {
  const router = useRouter();

  return (
    <div>
      <div className="w-full relative">
        <div className="dropdown dropdown-left absolute top-0 right-0 z-10">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost bg-transparent outline-transparent focus:outline-none focus:ring-0 outline-none text-2xl w-16 min-h-8 h-8 flex items-start justify-end rounded-tr-2xl"
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
                Edit trip
              </button>
            </li>
            <div className="divider gap-0 m-0 p-0"></div>
            <li>
              <button
                type="button"
                onClick={() => onDelete(id)}
                className="hover:bg-red-500 hover:rounded hover:text-white"
              >
                <FaRegTrashAlt /> Delete trip
              </button>
            </li>
          </ul>
        </div>

        <button
          className="btn glass p-0 w-80 h-40 relative rounded-2xl overflow-hidden"
          onClick={() => router.navigate({ to: `/dashboard/trips/${id}` })}
        >
          <img
            className="w-full h-full object-cover"
            src={getRandomString()}
            alt=""
          />
          <p className="absolute top-0 left-0 w-full min-h-9 flex gap-2 bg-base-100/80 text-base-content px-4 py-2 shadow-md shadow-black/20 dark:shadow-gray-800">
            {title}
          </p>
        </button>
      </div>
    </div>
  );
};

export default TripCard;
