import { useNavigate } from "@tanstack/react-router";
import HighlightGallery from "./highlightGallery";

const Highlights = ({ tripId }: { tripId: string }) => {
  const navigate = useNavigate();

  //do we nee to save the date? maybe yes
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <h1>Journal</h1>

      <button
        onClick={() =>
          navigate({ to: `/dashboard/trips/${tripId}/hightlights/create` })
        }
        className="btn"
      >
        Add notes
      </button>
      <div className="flex flex-row flex-wrap justify-center items-center gap-y-20 mt-10">
        <HighlightGallery tripId2={tripId} />
      </div>
    </div>
  );
};
export default Highlights;
