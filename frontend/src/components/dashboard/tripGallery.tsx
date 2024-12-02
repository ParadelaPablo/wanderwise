import TripCard from "./tripCard";
import ButtonCircle from "../buttons/buttonAddNewTripCircle";
import { useRouter } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTripById, getTrips } from "@/lib/api";
import { TripForGallery } from "@/lib/types";
import { LoadingState } from "../../components/ui-states/loading"; 


const useTrips = () => {
  return useQuery({
    queryKey: ["trips"],
    queryFn: getTrips,
  });
};

type MutationContext = {
  previousTrips: TripForGallery[] | undefined;
};
const TripGallery = () => {
  const router = useRouter();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { data: trips = [], isLoading, isError, error } = useTrips();

  const deleteMutation = useMutation({
    mutationFn: deleteTripById,
    onMutate: async (id: number): Promise<MutationContext | undefined> => {
      await queryClient.cancelQueries({ queryKey: ["trips"] });

      const previousTrips = queryClient.getQueryData<TripForGallery[]>([
        "trips",
      ]);

      queryClient.setQueryData(["trips"], (oldtrips: TripForGallery[] = []) =>
        oldtrips.filter((trip) => Number(trip.id) !== id)
      );

      return { previousTrips };
    },

    onError: (
      err: Error,
      variables: number,
      context: MutationContext | undefined
    ) => {
      if (context?.previousTrips) {
        queryClient.setQueryData(["trips"], context.previousTrips);
      }
      console.error("Error deleting trip:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });

  const handleDelete = (id: number) => {
    console.log(`Deleting trip with ID: ${id}`);
    deleteMutation.mutate(id);
  };

  if (isLoading) return <LoadingState />; // Reemplaza la línea actual con el componente LoadingState

  if (isError) return <div>Error loading trips: {error.message}</div>;

  return (
    <div className="h-full flex flex-col items-center justify-between gap-2 mt-4">
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-center">
          Welcome to Your Dashboard
          {user?.firstName && `, ${user.firstName}`}
        </h1>
        <div className="text-center">
          <button
            onClick={() => router.navigate({ to: "/dashboard/create" })}
            className="bg-neutral text-primary px-6 py-3 rounded-full hover:bg-teal-600 shadow-md"
          >
            Add New Trip
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 border p-6" style={{ borderRadius: '1rem' }}>
        {trips.length === 0 && (
          <div className="text-center text-lg font-semibold">
            You have no trips
          </div>
        )}
        {trips.length > 0 &&
          trips.map((trip) => (
            <TripCard
              key={trip.id}
              id={Number(trip.id)}
              title={trip.title}
              onDelete={handleDelete}
            />
          ))}
      </div>

      <ButtonCircle />
    </div>
  );
};

export default TripGallery;
