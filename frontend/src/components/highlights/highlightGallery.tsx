import { useQuery } from "@tanstack/react-query";
import HighlightCard from "./highLightCard";
import { Highlight } from "@/lib/types";
import { fetchHighlights } from "@/lib/api";

interface HighlightGalleryProps {
  tripId2: string; // Define tripId2 explicitly
}

const HighlightGallery: React.FC<HighlightGalleryProps> = ({ tripId2 }) => {
  const {
    data: highlights,
    isLoading,
    isError,
    error,
  } = useQuery<Highlight[]>({
    queryKey: ["highlights_data"],
    queryFn: () => {
      return fetchHighlights(Number(tripId2));
    },
    // staleTime: 1000 * 60 * 5,
    // refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <p className="text-gray-500">Loading highlights...</p>;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        <p>Error fetching highlights: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center p-4 mb-32">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
        {highlights && highlights.length > 0 ? (
          highlights.map((highlight) => (
            <HighlightCard key={highlight.id} highlightInfo={highlight} />
          ))
        ) : (
          <p className="text-gray-500">No highlights available</p>
        )}
      </div>
    </div>
  );
};

export default HighlightGallery;