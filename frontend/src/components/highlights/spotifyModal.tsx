import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSpotifyTracks } from "@/lib/spotifyApi";
import { millisToMinutesAndSeconds } from "@/lib/utils";

export const SpotifyModal = () => {
  const [query, setQuery] = useState("");

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tracks"],
    queryFn: () => getSpotifyTracks(query),
    enabled: !!query,
  });

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">
              Which music plays in your head right now?
            </span>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Track"
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <div className="mt-4">
          {isPending && <span>Loading...</span>}
          {isError && <span>Error: {error.message}</span>}
          {data && (
            <div className="space-y-2">
              {data.map((track) => (
                <div
                  key={track.data.id}
                  onClick={() =>
                    window.open(
                      `https://open.spotify.com/track/${track.data.id}`,
                      "_blank"
                    )
                  }
                  className="hover:bg-slate-200 p-4 bg-gray-100 rounded-md shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={track.data.albumOfTrack.coverArt.sources[0].url}
                      alt={track.data.name}
                      className="w-16 h-16 rounded-md"
                    />
                  </div>

                  <div className="flex-grow min-w-0">
                    {" "}
                    <h3 className="font-semibold capitalize truncate overflow-hidden">
                      {track.data.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate overflow-hidden">
                      {track.data.artists.items
                        .map((artist) => artist.profile.name)
                        .join(", ")}
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-sm text-gray-500 text-right">
                    {millisToMinutesAndSeconds(
                      track.data.duration.totalMilliseconds
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-action">
          <form method="dialog" className="flex gap-4">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-primary">Save</button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
