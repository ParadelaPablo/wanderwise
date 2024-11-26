const TripCard = () => {
  return (
    <div>
      <div className="border rounded w-64 h-32 relative overflow-hidden">
        <img
          className="w-full h-full rounded object-cover"
          src="https://www.yesmilano.it/sites/default/files/styles/testata_full/public/articolo/copertina/4527/15968/Andrea%20Cherchi%20Biblioteca%20degli%20Alberi%20Bosco%20Verticale%20img%20src%201180x560px.jpg?itok=I3s7pFvZ"
          alt=""
        />
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md" >Milano 2025</p>
      </div>
    </div>
  );
};

export default TripCard;
