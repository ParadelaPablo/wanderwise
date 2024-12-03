import axios from "axios";
import HighlightCard from "./highLightCard";
import { useState } from "react";

const BACKEND_GET_HIGHLIGHT = "http://localhost:8080/api/highlights";

interface Highlight {
  id: number;
  text: string;
  title: string;
  imageUrl?: string;
}

const HighlightGallery = () => {
  const [highLight, setHighlight] = useState<Highlight[]>([]);

  const getAllHighlights = async () => {
    const response = await axios.get(BACKEND_GET_HIGHLIGHT);
    setHighlight(response.data); 
    console.log(response);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={getAllHighlights}
        className="border w-10 h-10 my-10 bg-blue-500 text-white rounded-md"
      >
        Fetch Highlights
      </button>

      <div>
        {highLight.length > 0 ? (
          highLight.map((e) => <HighlightCard key={e.id} highlightInfo={e} />)
        ) : (
          <p>No highlights available</p>
        )}
      </div>
    </div>
  );
};

export default HighlightGallery;
