interface Props {
  text: string;
  info: string;
  title: string;
}
export const Stat = ({ text, info, title }: Props) => {
  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-value text-lg">{title}</div>
       
            <div className="stat-title">{text}</div>
            <div className="stat-desc">{info}</div>
        
      </div>
    </div>
  );
};
