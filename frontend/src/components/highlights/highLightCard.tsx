interface Highlight {
  id: number;
  text: string;
  title: string;
  imageUrl?: string;
  songUrl: string;
}

interface HighlightCardProps {
  highlightInfo: Highlight;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ highlightInfo }) => {
  const {
    text,
    title,
    imageUrl,
    songUrl,
    songArtist,
    songCoverUrl,
    songTitle,
    date,
  } = highlightInfo;
  console.log(highlightInfo);

  const goToSpotify = () => {
    window.open(songUrl, "_blank");
  };

  return (
    <div className="w-80 relative">
      <div className="border rounded-2xl p-4">
        <p className="absolute top-0 m-2 text-gray-400">{date}</p>
        <button className="bg-red-200 text-white rounded-full p-2 w-5 h-5 flex items-center justify-center text-sm hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 absolute top-2 right-2">
          x
        </button>
        <div className="flex flex-col gap-2">
          <div className="flex justify-center mt-8">
            <button className="overflow-hidden h-36 w-full">
              <img
                className="object-cover object-center w-full h-full rounded-2xl"
                src={
                  imageUrl ||
                  "https://img.freepik.com/free-psd/holiday-template-design_23-2150299133.jpg"
                }
                alt=""
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://img.freepik.com/free-psd/holiday-template-design_23-2150299133.jpg";
                }}
              />
            </button>
          </div>

          <details className="collapse bg-gray-100">
            <summary className="collapse-title text-md text-gray-600 font-medium">
              {title}
            </summary>
            <div className="collapse-content">
              <p className="text-center h-20 pt-1 text-gray-600">{text}</p>
            </div>
          </details>

          {songTitle && (
            <div className="hover:bg-slate-200 p-4 bg-gray-100 rounded-xl shadow-sm flex items-center justify-between gap-4">
              <div className="flex-shrink-0">
                <img src={songCoverUrl} className="w-16 h-16 rounded-md" />
              </div>

              <div className="flex-grow min-w-0">
                <button onClick={goToSpotify}>
                  <h3 className="font-semibold capitalize truncate overflow-hidden">
                    {songTitle}
                  </h3>
                  <p className="text-sm text-gray-500 truncate overflow-hidden">
                    {songArtist}
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;
