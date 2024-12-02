import { SpotifyModal } from "@/components/highlights/spotifyModal";
import { createFileRoute, useParams } from "@tanstack/react-router";
import axios from "axios";
import { useState, useEffect } from "react";

const SPOTIFY_BASE_URL = "https://open.spotify.com/track/";
const BACKEND_POST_HIGHLIGHT = "http://localhost:8080/api/highlights";

export const Route = createFileRoute(
  "/dashboard/trips/highlights/$highlightId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [trackData, setTrackData] = useState<{
    id: string;
    name: string;
    artist: string;
    coverArt: string;
  } | null>(null);

  const [highlightData, setHighlightData] = useState<{
    id: string;
    text: string;
    title: string;
    songTitle: string | null;
    songArtist: string | null;
    songUrl: string | null;
    songCoverUrl: string | null;
    imageUrl: string;
  } | null>(null);

  const highlightId = useParams({
    from: "/dashboard/trips/highlights/$highlightId",
    select: (params) => params.highlightId,
  });

  // Update highlightData when dependencies change
  useEffect(() => {
    setHighlightData({
      id: highlightId || "",
      text: content || "",
      title: title || "",
      songTitle: trackData?.name || null,
      songArtist: trackData?.artist || null,
      songUrl: trackData ? SPOTIFY_BASE_URL + trackData.id : null,
      songCoverUrl: trackData?.coverArt || null,
      imageUrl: "https://example.com/highlight-image.jpg",
    });
  }, [highlightId, content, title, trackData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Highlight Data:", highlightData);

    // Send data to the backend
    axios
      .post(BACKEND_POST_HIGHLIGHT, highlightData)
      .then((response) => {
        console.log("Highlight saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error saving highlight:", error);
      });
  };

  return (
    <div className="mb-16">
      <div className="btn ml-2" onClick={() => window.history.back()}>
        Back
      </div>
      <p className="ml-2">Note id: {highlightId}</p>

      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col justify-center items-center gap-2 mt-10 p-3">
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
            <SpotifyModal trackFetch={setTrackData} />
          </div>

          <div className="w-screen p-3 flex flex-col justify-center items-center relative">
            <div className="relative w-full">
              <textarea
                className="textarea textarea-bordered w-full resize-none h-52"
                placeholder="Enter text..."
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
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
                >
                  Submit
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
      <div className="divider mt-24"></div>
    </div>
  );
}
