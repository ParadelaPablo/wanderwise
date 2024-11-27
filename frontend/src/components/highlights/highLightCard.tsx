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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eius
        </p>
        <label className="input input-bordered flex items-center gap-2 bg-opacity-20 bg-slate-400 rounded-2xl">
          <input type="text" className="grow" placeholder="Thu, Sep 20" />
          <button className="btn btn-outline min-w-8 w-8 min-h-8 h-8">⌘</button>
          <button className="btn btn-outline min-w-8 w-8 min-h-8 h-8">✎</button>
        </label>
      </div>
    </div>
  );
};

export default HighlightCard;
