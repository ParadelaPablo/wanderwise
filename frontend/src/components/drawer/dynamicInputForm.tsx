import { useEffect, useRef, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Day, Stop, StopType } from "@/lib/types";
import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { createFullTrip } from "@/lib/api";
import { Autocomplete } from "@react-google-maps/api";
import { getStopTypeIcon } from "@/lib/icons";
import { useNavigate } from "@tanstack/react-router";
import { FullTripSchema } from "@/lib/schema";


const stopTypes: { id: string; label: string }[] = [
  { id: "FIKA", label: "Fika" },
  { id: "ACTIVITY", label: "Activity" },
  { id: "FUEL", label: "Fuel" },
  { id: "FOOD_AND_DRINK", label: "Food and drink" },
  { id: "SIGHTSEEING", label: "Sightseeing" },
  { id: "REST", label: "Rest" },
  { id: "OVERNIGHT", label: "Overnight" },
];

type Props = {
  days: Day[];
  setDays: React.Dispatch<React.SetStateAction<Day[]>>;
  title: string;
};

const DynamicInputForm = ({ days, setDays, title }: Props) => {
  const navigate = useNavigate();
  const { userId } = useAuth();

  const [resolvedUserId, setResolvedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      setResolvedUserId(userId);
    }
  }, [userId]);

  const [selectedType, setSelectedType] = useState<string>(stopTypes[0].id);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const mapRef = useRef<google.maps.Map | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (validationErrors) {
      const timeout = setTimeout(() => {
        setValidationErrors([]);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [validationErrors, setValidationErrors]);

  const onLoadAutocomplete = (
    autocomplete: google.maps.places.Autocomplete
  ) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = (dayId: number) => {
    // if it's empty, return
    if (!autocompleteRef.current) return;

    if (!autocompleteRef.current) {
      console.error("Autocomplete instance is not initialized.");
      return;
    }

    const place = autocompleteRef.current.getPlace();
    if (!place || !place.geometry) {
      console.error("Place geometry is not available.");
      return;
    }

    const { geometry, formatted_address } = place;
    const bounds = new window.google.maps.LatLngBounds();
    if (geometry.viewport) {
      bounds.union(geometry.viewport);
    } else if (geometry.location) {
      bounds.extend(geometry.location);
    }

    if (mapRef.current) {
      mapRef.current.fitBounds(bounds);
    } else {
      console.error("Map reference is not initialized.");
    }
    if (formatted_address) {
      updateStop(dayId, selectedType, formatted_address);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const addNewDay = () => {
    const newDayId = days.length + 1;

    const newDay = {
      dayOrder: newDayId,
      date: new Date(),
      stops: [],
    };
    setDays([...days, newDay]);
  };

  const removeDay = (id: number) => {
    setDays(days.filter((day) => day.dayOrder !== id));
  };

  const updateStop = (dayId: number, typeId: string, stopName: string) => {
    const stopType = stopTypes.find((type) => type.id === typeId);
    if (!stopType) return;

    const newStop: Stop = {
      stopType: stopType.id as StopType,
      name: stopName,
    };

    setDays((prevDays) =>
      prevDays.map((day) =>
        day.dayOrder === dayId
          ? { ...day, stops: [...day.stops, newStop] }
          : day
      )
    );
  };

  const removeStop = (dayId: number, stopIndex: number) => {
    setDays(
      days.map((day) =>
        day.dayOrder === dayId
          ? {
            ...day,
            stops: day.stops.filter((_, index) => index !== stopIndex),
          }
          : day
      )
    );
  };

  const updateDate = (dayId: number, newDate: Date | undefined) => {
    if (!newDate) return;
    setDays(
      days.map((day) =>
        day.dayOrder === dayId ? { ...day, date: newDate } : day
      )
    );
  };

  const validateData = () => {
    if (!resolvedUserId) {
      setValidationErrors(["User ID is required"]);
      return false;
    }
    const data = {
      userId: resolvedUserId,
      title,
      days,
    };

    const validationResult = FullTripSchema.safeParse(data);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((err) => err.message);
      setValidationErrors(errors);
      return false;
    }

    setValidationErrors([]);
    return true;
  };

  const handleSubmit = () => {
    if (!validateData()) return;

    const data = {
      userId: resolvedUserId!,
      title,
      days,
    };

    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: createFullTrip,
    onSuccess: (response) => {
      const tripId = response?.id;
      navigate({
        to: "/dashboard/trips/$tripId",
        params: { tripId: tripId },
      });
    },
    onError: (error) => {
      console.error("Error creating trip:", error);
    },
  });

  return (
    <div className="flex flex-col gap-4 items-center ">
      {mutation.isPending && (
        <span className="loading loading-dots loading-lg"></span>
      )}
      {validationErrors.length > 0 && (
        <div className="text-red-500 mt-2">
          {validationErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      {!mutation.isPending && (
        <>
          <div className="overflow-y-scroll">
            {days.map((day) => (
              <div
                key={day.dayOrder}
                className="card w-full bg-base-100 shadow-md p-4 mt-2 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">
                    Day {day.dayOrder}{" "}
                    <Popover>
                      <PopoverTrigger>
                        <button className="btn btn-sm btn-primary ml-2">
                          {day.date.toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="z-50">
                        <Calendar
                          mode="single"
                          onSelect={(date) => {
                            if (date) updateDate(day.dayOrder, date);
                          }}
                          selected={day.date}
                        />
                      </PopoverContent>
                    </Popover>
                  </h3>
                  <button
                    className="btn btn-sm btn-circle btn-ghost text-gray-400"
                    onClick={() => removeDay(day.dayOrder)}
                  >
                    ✖
                  </button>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="form-control">
                    <div className="input-group flex flex-row gap-1 items-center">
                      <select
                        className="select select-bordered w-1/3"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                      >
                        {stopTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <Autocomplete
                        onLoad={onLoadAutocomplete}
                        onPlaceChanged={() => handlePlaceChanged(day.dayOrder)}
                        options={{
                          fields: ["geometry", "formatted_address"],
                        }}
                      >
                        <input
                          ref={inputRef}
                          type="text"
                          placeholder="Add stop"
                          className="input input-bordered w-full rounded-r-lg"
                        />
                      </Autocomplete>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {day.stops.map((stop, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border p-2 rounded-md"
                      >
                        <div className="flex items-center gap-2 capitalize">
                          {getStopTypeIcon(stop.stopType)}
                          <p>{stop.name}</p>
                        </div>
                        <button
                          className="btn btn-circle btn-xs btn-ghost"
                          onClick={() => removeStop(day.dayOrder, index)}
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button className="btn btn-primary mt-4" onClick={addNewDay}>
              Add New Day
            </button>
          </div>
          <div>
            <button
              disabled={mutation.isPending}
              onClick={handleSubmit}
              className={`btn btn-primary mt-4 ${validationErrors.length > 0 ? "btn-disabled" : ""}`}
            >
              {mutation.isPending ? "Building your trip..." : "DONE"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DynamicInputForm;
