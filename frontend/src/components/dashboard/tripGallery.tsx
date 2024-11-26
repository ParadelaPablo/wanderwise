import TripCard from "./tripCard";

const TripGallery = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col w-80 items-center justify-center gap-5 mt-8 mb-20 border p-5">
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
      </div>
    </div>
  );
};

export default TripGallery;
