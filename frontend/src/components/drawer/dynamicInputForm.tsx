import { useRef, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Day, Stop } from "@/lib/types";
import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { createFullTrip } from "@/lib/api";
import { Autocomplete } from "@react-google-maps/api";

const stopTypes: { id: string; label: string }[] = [
  { id: "fika", label: "Fika" },
  { id: "activity", label: "Activity" },
  { id: "fuel", label: "Fuel" },
  { id: "food", label: "Food and drink" },
  { id: "sightseeing", label: "Sightseeing" },
  { id: "rest", label: "Rest" },
  { id: "overnight", label: "Overnight" },
];

type Props = {
  days: Day[];
  setDays: React.Dispatch<React.SetStateAction<Day[]>>;
  title: string;
};

const DynamicInputForm = ({ days, setDays, title }: Props) => {
  const { userId } = useAuth();
  const [selectedType, setSelectedType] = useState<string>(stopTypes[0].id);
  const mapRef = useRef();
  const autocompleteRef = useRef();

  const onLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    const { geometry } = autocompleteRef.current.getPlace();
    const bounds = new window.google.maps.LatLngBounds();
    if (geometry.viewport) {
      bounds.union(geometry.viewport);
    } else {
      bounds.extend(geometry.location);
    }
    mapRef.current.fitBounds(bounds);
  };

  const addNewDay = () => {
    const newDayId = days.length + 1;

    const newDay = {
      order: newDayId,
      date: new Date(),
      stops: [],
    };
    setDays([...days, newDay]);
  };

  const removeDay = (id: number) => {
    setDays(days.filter((day) => day.order !== id));
  };

  const updateStop = (dayId: number, typeId: string, stopName: string) => {
    const stopType = stopTypes.find((type) => type.id === typeId);
    if (!stopType) return;

    const newStop: Stop = {
      type: stopType.label,
      name: stopName,
    };

    setDays(
      days.map((day) =>
        day.order === dayId ? { ...day, stops: [...day.stops, newStop] } : day
      )
    );
  };

  const removeStop = (dayId: number, stopIndex: number) => {
    setDays(
      days.map((day) =>
        day.order === dayId
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
      days.map((day) => (day.order === dayId ? { ...day, date: newDate } : day))
    );
  };
  const data = {
    userId: "12345bn",
    title: title,
    days: [
      {
        dayOrder: 1,
        date: "2024-12-01",
        stops: [
          {
            dayId: 1,
            stopType: "FIKA",
            name: "Stockholm",
          },
        ],
      },
    ],
  };
  console.log(data);
  const mutation = useMutation({
    mutationFn: () => {
      return createFullTrip(data);
    },
  });

  return (
    <div className="flex flex-col gap-4 items-center ">
      <div>
        {days.map((day) => (
          <div
            key={day.order}
            className="card w-full bg-base-100 shadow-md p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">
                Day {day.order}{" "}
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
                        if (date) updateDate(day.order, date);
                      }}
                      selected={day.date}
                    />
                  </PopoverContent>
                </Popover>
              </h3>
              <button
                className="btn btn-sm btn-circle btn-ghost text-gray-400"
                onClick={() => removeDay(day.order)}
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
                    onPlaceChanged={handlePlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder="Add stop"
                      className="input input-bordered w-full rounded-r-lg"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value) {
                          updateStop(
                            day.order,
                            selectedType,
                            e.currentTarget.value
                          );
                          e.currentTarget.value = "";
                        }
                      }}
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
                      <p>
                        {stop.type}: {stop.name}
                      </p>
                    </div>
                    <button
                      className="btn btn-circle btn-xs btn-ghost"
                      onClick={() => removeStop(day.order, index)}
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
          onClick={() => mutation.mutate()}
          className="btn btn-primary mt-4"
        >
          DONE 🎉
        </button>
      </div>
    </div>
  );
};

export default DynamicInputForm;
