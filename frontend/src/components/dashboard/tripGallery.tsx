import TripCard from "./tripCard";
import ButtonCircle from "../buttons/buttonAddNewTripCircle";
import { useNavigate } from "@tanstack/react-router";

const TripGallery = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen relative">
      <div className="text-center mt-5">
        <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
        <button
          onClick={() => navigate({ to: "/dashboard/create" })}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
        >
          Add New Trip
        </button>
      </div>

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

      <ButtonCircle />
    </div>
  );
};

export default TripGallery;
