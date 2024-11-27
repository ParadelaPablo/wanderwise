interface FooterProps {
  setVisibleComponent: (component: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setVisibleComponent }) => {
  return (
    <footer className="bg-gray-800 text-white py-3 sticky bottom-0">
      <div className="flex justify-around items-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-24">
          Map
        </button>
        <button
          onClick={() => setVisibleComponent("Todo")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-24"
        >
          To Do
        </button>
        <button
          onClick={() => setVisibleComponent("ToPack")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-24"
        >
          To Pack
        </button>
        <button
          onClick={() => setVisibleComponent("Highlights")}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 w-24"
        >
          Highlights
        </button>
      </div>
    </footer>
  );
};

export default Footer;
