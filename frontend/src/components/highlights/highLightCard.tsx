const HighlightCard = ({ url }) => {
  return (
    <div className="w-screen">
      <div className="border rounded-2xl p-1">
        <div className="flex justify-center">
        <button className="overflow-hidden h-36 w-full">
          <img
            className="object-cover object-center w-full h-full rounded-2xl"
            src={url}
            alt=""
          />
        </button>
        </div>
        
        <p className="text-center h-20 pt-1">
          On our trip to the place we saw this amazing thing and could not believe our eyes how beautiful!
        </p>
        <label className="input input-bordered flex items-center gap-2 bg-opacity-20 bg-slate-400 rounded-2xl">
          <input type="text" className="grow" placeholder="Thu, Sep 20" />
          <button className="btn btn-outline min-w-8 w-8 min-h-8 h-8">⌅</button>
          <button className="btn btn-outline min-w-8 w-8 min-h-8 h-8">✎</button>
        </label>


        <div
          key={1}
          className="hover:bg-slate-200 p-4 bg-gray-100 rounded-md shadow-sm flex items-center justify-between gap-4"
        >
          <div className="flex-shrink-0">
            <img
              src="https://cdns-images.dzcdn.net/images/cover/b8b70d474b7a8f27799e0d665e9b737e/1900x1900-000000-80-0-0.jpg"
              className="w-16 h-16 rounded-md"
            />
          </div>

          <div className="flex-grow min-w-0">
            <h3 className="font-semibold capitalize truncate overflow-hidden">
              Lay your love on me
            </h3>
            <p className="text-sm text-gray-500 truncate overflow-hidden">
              ABBA
            </p>
          </div>

          <div className="flex-shrink-0 text-sm text-gray-500 text-right">
            {(() => {
              const millisToMinutesAndSeconds = (milliseconds: number) => {
                const minutes = Math.floor(milliseconds / 60000);
                const seconds = Math.floor((milliseconds % 60000) / 1000);
                return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
              };
              return millisToMinutesAndSeconds(235000); // Mock 3 minutes 55 seconds
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;
