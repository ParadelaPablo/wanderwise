import { SpotifyModal } from "@/components/highlights/spotifyModal";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
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
import { toast } from "react-toastify";
import { postHighLight } from "@/lib/api";

const SPOTIFY_BASE_URL = "https://open.spotify.com/track/";
//const BACKEND_POST_HIGHLIGHT = import.meta.env.VITE_BASE_BACKEND_URL;

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



  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const { refetch } = useQuery({ queryKey: ["highlights"] });

  const [date, setDate] = useState();

  const [trackData, setTrackData] = useState<{
    id: string;
    name: string;
    artist: string;
    coverArt: string;
    songURL: string;
  } | null>(null);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postHighLight,
    onMutate: async () => {
      console.log("onMutate");
    },
    onError: (error) => {
      console.log("onError", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights_data"] });
      toast.success("Highlight saved successfully!");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("hi");
    setLoadingButton(true);
    e.preventDefault();

    if (!file) {
      alert("Please select an image file.");
      setLoadingButton(false);
      return;
    }

    // send date in yyyy-mm-dd format
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
    const highlightData = {
      tripId: tripId!,
      text: content,
      title,
      date: formattedDate,
      songTitle: trackData?.name || null,
      artist: trackData?.artist || null,
      songUrl: trackData ? `${SPOTIFY_BASE_URL}${trackData.id}` : null,
      songCoverUrl: trackData?.coverArt || null,
      image: file,
    };

    mutate(highlightData);
    setLoadingButton(false);

  };

  if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="btn relative right-1/3"
        onClick={() => window.history.back()}
      >
        Back
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center gap-4 mt-10 p-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"secondary"}
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
          <div className="input_form">
            <div className="flex gap-x-5">
              <input
                type="text"
                placeholder="Title..."
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full ml-4"
                required
              />
              <label
                htmlFor="my_modal_7"
                className="btn btn-outline mr-4 text-gray-600"
              >
                Add song
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

            <div className="p-3 flex flex-col justify-center items-center relative">
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
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            window.open(SPOTIFY_BASE_URL + trackData?.id, "_blank")
          }
          className="flex flex-row items-center max-w-80 p-2 m-5 bg-gray-200 rounded-xl shadow-md"
        >
          {trackData?.coverArt && (
            <figure className="flex-shrink-0">
              <img
                className="w-16 h-16 object-cover rounded-md"
                src={trackData.coverArt}
                alt={trackData.name}
              />
            </figure>
          )}
          <div className="flex flex-col mx-2 justify-center text-gray-600  overflow-hidden text-ellipsis whitespace-nowrap">
            <h2 className="text-lg font-semibold truncate">
              {trackData?.name || "No track selected"}
            </h2>
            <p className="text-sm text-gray-400 truncate">
              {trackData?.artist}
            </p>
          </div>
          <div className="ml-auto flex items-center justify-center"></div>
        </button>

        <button
          onClick={() => {
            console.log("hi");
          }}
          type="submit"
          className="btn btn-primary mx-5 mb-10 text-gray-50"
          disabled={isPending}
        >
          {loadingButton ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Save"
          )}
        </button>
      </form>
    </div>
  );
}
