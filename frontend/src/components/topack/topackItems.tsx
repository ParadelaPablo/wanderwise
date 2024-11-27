const ToPackItems = ({
  itemNumber,
  removeItem,
}: {
  itemNumber: number;
  removeItem: (itemNumber: number) => void;
}) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start">
        <input type="checkbox" className="checkbox" />
        <input
          type="text"
          placeholder="Item..."
          className="input input-bordered w-full max-w-xs h-8 ml-2"
        />
        <button
          className="btn btn-xs w-6 ml-3"
          onClick={() => removeItem(itemNumber)}
        >
          x
        </button>
      </label>
    </div>
  );
};

export default ToPackItems;



