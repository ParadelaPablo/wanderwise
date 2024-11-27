const VITE_SPOTIFY_API_KEY = import.meta.env.VITE_SPOTIFY_API_KEY;
export const getSpotifyTracks = async (query:string) => {
  const response = await fetch(
    `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(query)}&type=tracks`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "spotify23.p.rapidapi.com",
        "x-rapidapi-key": VITE_SPOTIFY_API_KEY,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data = await response.json();
  console.log(data.tracks.items)
  return data.tracks.items;
};
