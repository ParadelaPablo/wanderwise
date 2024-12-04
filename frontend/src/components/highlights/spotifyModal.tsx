import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSpotifyTracks } from "@/lib/spotifyApi";
import { millisToMinutesAndSeconds } from "@/lib/utils";
import { SpotifyTrack } from "@/lib/types";
import { LoadingState } from "../ui-states/loading";
import { ErrorState } from "../ui-states/error";

export const SpotifyModal = ({
  trackFetch,
}: {
  trackFetch: (trackDetails: {
    id: string;
    name: string;
    artist: string;
    coverArt: string;
  }) => void;
}) => {
  const [query, setQuery] = useState("");

  const { isLoading, isError, data } = useQuery<SpotifyTrack[]>({
    queryKey: ["tracks", query],
    queryFn: () => getSpotifyTracks(query),
    enabled: !!query,
  });

  const handleTrackSelect = (trackDetails: {
    id: string;
    name: string;
    artist: string;
    coverArt: string;
  }) => {
    trackFetch(trackDetails);
    const modalCheckbox = document.getElementById(
      "my_modal_7"
    ) as HTMLInputElement;
    if (modalCheckbox) {
      modalCheckbox.checked = false;
    }
  };

  return (
    <div className="modal" role="dialog">
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
          {isLoading && <LoadingState />}
          {isError && <ErrorState />}
          {data && (
            <div className="space-y-2">
              {data.map((track) => {
                const trackDetails = {
                  id: track.data.id,
                  name: track.data.name,
                  artist: track.data.artists.items
                    .map((artist) => artist.profile.name)
                    .join(", "),
                  coverArt: track.data.albumOfTrack.coverArt.sources[0].url,
                };

                return (
                  <div
                    key={track.data.id}
                    onClick={() => handleTrackSelect(trackDetails)}
                    className="hover:bg-slate-200 p-4 bg-gray-100 rounded-md shadow-sm flex items-center justify-between gap-4"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={trackDetails.coverArt}
                        alt={trackDetails.name}
                        className="w-16 h-16 rounded-md"
                      />
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3 className="font-semibold capitalize truncate overflow-hidden">
                        {trackDetails.name}
                      </h3>
                      <p className="text-sm text-gray-500 truncate overflow-hidden">
                        {trackDetails.artist}
                      </p>
                    </div>

                    <div className="flex-shrink-0 text-sm text-gray-500 text-right">
                      {millisToMinutesAndSeconds(
                        track.data.duration.totalMilliseconds
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <label className="modal-backdrop" htmlFor="my_modal_7">
        Close
      </label>
    </div>
  );
};
