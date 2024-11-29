import TripCard from "./tripCard";
import ButtonCircle from "../buttons/buttonAddNewTripCircle";
import { useRouter } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";

import { useQuery } from "@tanstack/react-query";
import { getTrips } from "@/lib/api";

const useTrips = () => {
  return useQuery({
    queryKey: ["trips"],
    queryFn: getTrips,
  });
};

const TripGallery = () => {
  const router = useRouter();
  const { user } = useUser();
  const { data: trips = [], isLoading, isError, error } = useTrips();

  if (isLoading) return <div className="flex items-center justify-center h-screen"><span className="loading loading-dots loading-lg"></span></div>;
  if (isError) return <div className="flex items-center justify-center h-screen" ><span className="px-4 py-2 bg-red-200  rounded-md text-gray-600">⛽️ Your trips have temporarily run out of gas. Refueling now—hang tight! 🚗💨</span></div>;

  return (
    <div className="flex flex-col items-center justify-between min-h-screen relative">
      <div className="text-center mt-5">
        <h1 className="text-2xl font-bold">
          Welcome to Your Dashboard
          {user?.firstName && `, ${user.firstName}`}
        </h1>
        <div className="mt-10 text-center">
          <button
            onClick={() => router.navigate({ to: "/dashboard/create" })}
            className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 shadow-md"
          >
            Add New Trip
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row  flex-wrap w-screen items-center justify-center gap-5 mt-8 mb-20 border p-5 rounded-2xl">
        {trips.map((trip) => (
          <TripCard key={trip.id} id={Number(trip.id)} title={trip.title} />
        ))}
      </div>

      <ButtonCircle />
    </div>
  );
};

export default TripGallery;
