import { SpotifyModal } from "@/components/highlights/spotifyModal";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute(
  "/dashboard/trips/highlights/$highlightId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [someState, setSomeState] = useState<{
    name: string;
    artist: string;
    coverArt: string;
  } | null>(null);

  const highlightId = useParams({
    from: "/dashboard/trips/highlights/$highlightId",
    select: (params) => params.highlightId,
  });

  return (
    <div className="mb-16">
      <div className="btn ml-2" onClick={() => window.history.back()}>
        Back
      </div>
      <p className="ml-2">Note id: {highlightId}</p>
      <div className="w-full flex flex-col justify-center items-center gap-2 mt-10 p-3">
        <div className="flex w-screen gap-x-5">
          <input
            type="text"
            placeholder="Title..."
            className="input input-bordered w-full ml-4"
          />
          <label
            htmlFor="my_modal_7"
            className="btn btn-outline btn-success mr-4"
          >
            Spotify
          </label>
          <input type="checkbox" id="my_modal_7" className="modal-toggle" />
          <SpotifyModal func={setSomeState} />
        </div>

        <div className="w-screen p-3 flex flex-col justify-center items-center relative">
          <div className="relative w-full">
            <textarea
              className="textarea textarea-bordered w-full resize-none h-52"
              placeholder="Enter text..."
            ></textarea>
            <div className="absolute bottom-2 right-2 flex gap-2 items-end">
              <button className="btn btn-outline min-h-10 h-10 w-10 text-2xl">
                ♫
              </button>
              <button className="btn btn-outline min-h-10 h-10 w-10 text-2xl">
                ⌅
              </button>
              <button className="btn btn-success min-h-10 h-10">Success</button>
            </div>
          </div>
        </div>

        <div className="card h-32 w-full max-w-md image-full  shadow-xl relative">
          {someState?.coverArt && (
            <figure className="w-full h-full">
              <img
                className="w-full h-full object-cover"
                src={someState.coverArt}
                alt={someState.name}
              />
            </figure>
          )}
          <div className="card-body">
            <h2 className="card-title">
              {someState?.name || "No track selected"}
            </h2>
            <p>{someState?.artist}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Go To Spotify</button>
            </div>
          </div>
        </div>
      </div>
      <div className="divider mt-24"></div>
    </div>
  );
}
