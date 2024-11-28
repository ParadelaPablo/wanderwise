interface FooterProps {
  setVisibleComponent: (component: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setVisibleComponent }) => {
  return (
    <footer className="bg-gray-800 text-white py-3 sticky bottom-0 w-full">
      <div className="flex justify-around items-center gap-x-1">
        <button 
        onClick={() => setVisibleComponent("Map")}
        className="flex-1 text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Map
        </button>
        <button
          onClick={() => setVisibleComponent("Todo")}
          className="flex-1 text-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          To Do
        </button>
        <button
          onClick={() => setVisibleComponent("ToPack")}
          className="flex-1 text-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          To Pack
        </button>
        <button
          onClick={() => setVisibleComponent("Highlights")}
          className="flex-1 text-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Highlights
        </button>
      </div>
    </footer>
  );
};

export default Footer;
