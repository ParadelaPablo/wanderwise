interface Props {
  text: string;
  info: string;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}
export const Stat = ({ text, info, title, setTitle }: Props) => {
  return (
    <div className="stats shadow mt-4">
      <div className="stat flex flex-col gap-2">
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="My trip"
          className="input w-full max-w-xs text-center border-none"
        />

        <div className="stat-title">{text}</div>
        <div className="stat-desc">{info}</div>
      </div>
    </div>
  );
};
