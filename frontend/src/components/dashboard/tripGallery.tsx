import TripCard from "./tripCard";

const TripGallery = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-5">
        <TripCard/>
        <TripCard/>
        <TripCard/>
        <TripCard/>
    </div>
  );
};

export default TripGallery;
