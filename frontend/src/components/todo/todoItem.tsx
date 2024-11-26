const TodoItem = () => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start">
        <input type="checkbox" className="checkbox" />
        <input type="text" placeholder="Item..." className="input input-bordered w-full max-w-xs h-8 ml-2" />
      </label>
    </div>
  );
};

export default TodoItem;
