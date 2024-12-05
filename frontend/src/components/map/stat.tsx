interface Props {
  text: string;
  info: string;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}
export const Stat = ({ text, info, title, setTitle }: Props) => {
  return (
    <div className="stats shadow mt-16">
      <div className="stat flex flex-col gap-2">
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter trip title..."
          className="input w-full max-w-xs text-center border-none shadow-md"
        />

        <div className="stat-title">{text}</div>
        <div className="stat-desc">{info}</div>
      </div>
    </div>
  );
};
