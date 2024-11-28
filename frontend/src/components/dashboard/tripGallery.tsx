import TripCard from "./tripCard";
import ButtonCircle from "../buttons/buttonAddNewTripCircle";
import { useRouter } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";



const TripGallery = () => {
  const router = useRouter();
  const { user } = useUser();



  const trips = [
    { id: 1, title: "Trip to Milano" },
    { id: 2, title: "Trip to Roma" },
    { id: 3, title: "Trip to Firenze" },
    { id: 4, title: "Trip to Napoli" },
    { id: 5, title: "Trip to Venezia" },
    { id: 6, title: "Trip to Milano" },

  ];

  return (
    <div className="flex flex-col items-center justify-between min-h-screen relative">
      <div className="text-center mt-5">
      <h1 className="text-2xl font-bold">
          Welcome to Your Dashboard
          {user?.firstName && `, ${user.firstName}`} 
        </h1>
        <button
          onClick={() => router.navigate({ to: "/dashboard/create" })}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
        >
          Add New Trip
        </button>
      </div>

      <div className="flex flex-col w-80 items-center justify-center gap-5 mt-8 mb-20 border p-5">
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            id={trip.id}
            title={trip.title}
          />
        ))}
      </div>

      <ButtonCircle />
    </div>
  );
};

export default TripGallery;
