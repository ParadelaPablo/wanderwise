import TripCard from "./tripCard";
import ButtonCircle from "../buttons/buttonAddNewTripCircle";
import { useRouter } from "@tanstack/react-router";
import { useAuth, useUser } from "@clerk/clerk-react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTripById, getTripsForUser } from "@/lib/api";
import { TripForGallery } from "@/lib/types";

import { LoadingState } from "../../components/ui-states/loading";

const useTrips = (userId: string) => {
  return useQuery({
    queryKey: ["trips", userId],
    queryFn: () => getTripsForUser(userId),
  });
};


type MutationContext = {
  previousTrips: TripForGallery[] | undefined;
};
const TripGallery: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const { userId } = useAuth();
  console.log(userId)
  const queryClient = useQueryClient();
  const { data: trips = [], isLoading, isError, error } = useTrips(userId!);

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

  if (isLoading) return <LoadingState />;

  return (
    <div className="flex flex-col items-center justify-between min-h-screen relative">
      <div className="sticky top-0 justify-center">
        <div className="text-center mt-5 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">
            Hey{user?.firstName ? `, ${user.firstName}` : ""}! Welcome
          </h1>
          <div className="text-1xl text-center px-4">
            Are you ready to plan your next adventure?
          </div>
          <div className="text-center">
            <button
              onClick={() => router.navigate({ to: "/dashboard/create" })}
              className="btn btn-primary text-gray-50 mx-5 mb-10 px-6 py-3 rounded-full shadow-md"
            >
              Add New Trip
            </button>
          </div>
        </div>
  
        <div
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 border p-6"
          style={{ borderRadius: "1rem" }}
        >
          {isError && (
            <div className="text-center text-lg font-semibold text-red-600">
              Error loading trips: {error.message}. Please try again.
            </div>
          )}
          {trips.length === 0 && !isError && (
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
                imagePath={trip.imagePath}
              />
            ))}
        </div>
      </div>
  
      <ButtonCircle />
    </div>
  );
}

export default TripGallery;