const TodoItem = () => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input type="checkbox" defaultChecked className="checkbox" />
        <span className="label-text ml-2">Todo item</span>
      </label>
    </div>
  );
};

export default TodoItem;
