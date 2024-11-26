const TripCard = () => {
  return (
    <div>
      <div>
        <button className="btn glass p-0 w-72 h-40">
          
          <img
            className="w-full h-full rounded object-cover"
            src="https://www.yesmilano.it/sites/default/files/styles/testata_full/public/articolo/copertina/4527/15968/Andrea%20Cherchi%20Biblioteca%20degli%20Alberi%20Bosco%20Verticale%20img%20src%201180x560px.jpg?itok=I3s7pFvZ"
            alt=""
          />
          <p className="absolute top-5 left-16 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded shadow-md">
  Milano 2025
</p>

        </button>


        {/* <button  className="border rounded w-64 h-32 relative overflow-hidden hover: ">
          
          
        </button> */}
      </div>
    </div>
  );
};

export default TripCard;
