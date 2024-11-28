

interface FooterProps {
  setVisibleComponent: (component: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setVisibleComponent }) => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-4 sticky bottom-0 w-full shadow-lg border-t border-gray-800">
      <div className="flex justify-around items-center gap-4">
        <button
          onClick={() => setVisibleComponent("Map")}
          className="flex items-center justify-center w-24 h-12 text-sm font-medium bg-gray-800 text-gray-300 rounded-lg hover:bg-indigo-600 hover:text-white shadow-md transition-transform duration-200 transform hover:-translate-y-1 ml-2"
        >
          Map
        </button>
        <button
          onClick={() => setVisibleComponent("Todo")}
          className="flex items-center justify-center w-24 h-12 text-sm font-medium bg-gray-800 text-gray-300 rounded-lg hover:bg-purple-600 hover:text-white shadow-md transition-transform duration-200 transform hover:-translate-y-1"
        >
          To Do
        </button>
        <button
          onClick={() => setVisibleComponent("ToPack")}
          className="flex items-center justify-center w-24 h-12 text-sm font-medium bg-gray-800 text-gray-300 rounded-lg hover:bg-teal-600 hover:text-white shadow-md transition-transform duration-200 transform hover:-translate-y-1"
        >
          To Pack
        </button>
        <button
          onClick={() => setVisibleComponent("Highlights")}
          className="flex items-center justify-center w-24 h-12 text-sm font-medium bg-gray-800 text-gray-300 rounded-lg hover:bg-orange-600 hover:text-white shadow-md transition-transform duration-200 transform hover:-translate-y-1 mr-2"
        >
          Highlights
        </button>
      </div>
    </footer>
  );
};

export default Footer;
