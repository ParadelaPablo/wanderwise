import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Day, Stop } from "@/lib/types";

const stopTypes: { id: string; label: string }[] = [
  { id: "pitstop", label: "Pitstop" },
  { id: "startpoint", label: "Start Point" },
  { id: "endpoint", label: "End Point" },
  { id: "gas", label: "Gas Station" },
  { id: "sightseeing", label: "Sightseeing" },
  { id: "overnight", label: "Overnight" },
  { id: "rest", label: "Rest" },
];

type Props = {
  days: Day[];
  setDays: React.Dispatch<React.SetStateAction<Day[]>>;
};

const DynamicInputForm = ({ days, setDays }: Props) => {
  const [selectedType, setSelectedType] = useState<string>(stopTypes[0].id);

  const addNewDay = () => {
    const newDayId = days.length + 1;

    const newDay = {
      id: newDayId,
      date: new Date(),
      stops: [],
    };
    setDays([...days, newDay]);
  };

  const removeDay = (id: number) => {
    setDays(days.filter((day) => day.id !== id));
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
        day.id === dayId ? { ...day, stops: [...day.stops, newStop] } : day
      )
    );
  };

  const removeStop = (dayId: number, stopIndex: number) => {
    setDays(
      days.map((day) =>
        day.id === dayId
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
      days.map((day) => (day.id === dayId ? { ...day, date: newDate } : day))
    );
  };

  return (
    <div className="flex flex-col gap-4 items-center ">
      <div>
        {days.map((day) => (
          <div
            key={day.id}
            className="card w-full bg-base-100 shadow-md p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">
                Day {day.id}{" "}
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
                        if (date) updateDate(day.id, date);
                      }}
                      selected={day.date}
                    />
                  </PopoverContent>
                </Popover>
              </h3>
              <button
                className="btn btn-sm btn-circle btn-ghost text-gray-400"
                onClick={() => removeDay(day.id)}
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
                  <input
                    type="text"
                    placeholder="Add stop"
                    className="input input-bordered w-full rounded-r-lg"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value) {
                        updateStop(day.id, selectedType, e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
              </div>
              <div className="space-y-1">
                {day.stops.map((stop, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border p-2 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <p>
                        {stop.type}: {stop.name}
                      </p>
                    </div>
                    <button
                      className="btn btn-circle btn-xs btn-ghost"
                      onClick={() => removeStop(day.id, index)}
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
        <button className="btn btn-primary mt-4">DONE 🎉</button>
      </div>
    </div>
  );
};

export default DynamicInputForm;
