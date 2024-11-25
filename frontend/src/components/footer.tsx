const Footer: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white py-4 text-center">
        <h1>Sticky Footer Example</h1>
      </header>

      <main className="flex-grow p-4 bg-slate-500">
        <p>
          Here will be something, maybe. 
        </p>
      </main>

      <footer className="bg-gray-800 text-white py-3">
        <div className="flex justify-around items-center">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Home
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            About
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Services
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Contact
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
