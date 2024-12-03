import { SpotifyModal } from "@/components/highlights/spotifyModal";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
const SPOTIFY_BASE_URL = "https://open.spotify.com/track/";
const BACKEND_POST_HIGHLIGHT = import.meta.env.VITE_BASE_BACKEND_URL;

export const Route = createFileRoute(
  "/dashboard/trips/$tripId/hightlights/create"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const tripId = useParams({
    from: "/dashboard/trips/$tripId/hightlights/create",
    select: (params) => params.tripId,
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  console.log(date);
  const [trackData, setTrackData] = useState<{
    id: string;
    name: string;
    artist: string;
    coverArt: string;
    songURL: string;
  } | null>(null);

  const highlightId = useParams({
    from: "/dashboard/trips/highlights/$highlightId",
    select: (params) => params.highlightId,
  });

  const [highlightData, setHighlightData] = useState<{
    id: string;
    tripId: string;
    text: string;
    title: string;
    date: string;
    songTitle: string | null;
    artist: string | null;
    songUrl: string | null;
    songCoverUrl: string | null;
  } | null>(null);

  useEffect(() => {
    const updatedHighlightData = {
      tripId: parseInt(tripId, 10),
      text: content || "",
      title: title || "",
      date: "date",
      songTitle: trackData?.name || null,
      artist: trackData?.artist || null,
      songUrl: trackData?.id ? SPOTIFY_BASE_URL + trackData.id : null,
      songCoverUrl: trackData?.coverArt || null,
      imageUrl: "https://example.com/highlight-image.jpg",
    };
    setHighlightData(updatedHighlightData);
    console.log("Updated Highlight Data:", updatedHighlightData);
  }, [content, title, trackData, tripId]);

  const mutation = useMutation({
    mutationFn: async (highlight: typeof highlightData) => {
      if (!highlight) throw new Error("Highlight data is missing");
      const response = await fetch(BACKEND_POST_HIGHLIGHT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(highlight),
      });
      if (!response.ok) {
        throw new Error("Failed to save highlight");
      }
      return response.json();
    },
    onSuccess: (data) => {
      console.log("Highlight saved successfully:", data);
    },
    onError: (error) => {
      console.error("Error saving highlight:", error);
    },
  });

  const { isLoading } = mutation;



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("tripId", "855");
    formData.append("text", content);
    formData.append("title", title);
    if (trackData) {
      formData.append("songTitle", trackData.name);
      formData.append("songArtist", trackData.artist);
      formData.append("songUrl", SPOTIFY_BASE_URL + trackData.id);
      formData.append("songCoverUrl", trackData.coverArt);
    }
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:8080/api/highlights/new", formData);
      console.log("Highlight saved successfully:", response.data);
      toast.success("Highlight saved successfully!");
    } catch (error) {
      console.error("Error saving highlight:", error.message);
      toast.error("Error saving highlight");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="btn relative right-1/3"
        onClick={() => window.history.back()}
      >
        Back
      </div>

      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col justify-center items-center gap-2 mt-10 p-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"ghost"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="flex w-screen gap-x-5">
            <input
              type="text"
              placeholder="Title..."
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full ml-4"
              required
            />
            <label
              htmlFor="my_modal_7"
              className="btn btn-outline btn-success mr-4"
            >
              Spotify
            </label>
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <SpotifyModal
              trackFetch={(trackDetails) => {
                setTrackData({
                  ...trackDetails,
                  songURL: `https://open.spotify.com/track/${trackDetails.id}`,
                });
              }}
            />
          </div>

          <div className="w-screen p-3 flex flex-col justify-center items-center relative">
            <div className="relative w-full">
              <textarea
                className="textarea textarea-bordered w-full resize-none h-52"
                placeholder="Enter text..."
                onChange={(e) => setContent(e.target.value)}
              ></textarea>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full mt-4"
              />

              <div className="absolute bottom-2 right-2 flex gap-2 items-end">
                <button className="btn btn-outline min-h-10 h-10 w-10 text-2xl">
                  ♫
                </button>
                <button className="btn btn-outline min-h-10 h-10 w-10 text-2xl">
                  ⌅
                </button>
                <button
                  type="submit"
                  className="btn btn-success min-h-10 h-10"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="card h-32 w-full max-w-md image-full shadow-xl relative">
        {trackData?.coverArt && (
          <figure className="w-full h-full">
            <img
              className="w-full h-full object-cover"
              src={trackData.coverArt}
              alt={trackData.name}
            />
          </figure>
        )}
        <div className="card-body">
          <h2 className="card-title">
            {trackData?.name || "No track selected"}
          </h2>
          <p>{trackData?.artist}</p>
          <p>Highlight Title: {highlightData?.title || "No title yet"}</p>
          <div className="card-actions justify-end">
            <button
              onClick={() =>
                window.open(SPOTIFY_BASE_URL + trackData?.id, "_blank")
              }
              className="btn btn-primary"
            >
              Go To Spotify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
