import { ReactNode, useState } from "react";
import { IoFastFoodSharp, IoCarSportSharp, IoHomeSharp } from "react-icons/io5";

interface Stop {
  type: string;
  name: string;
  icon: ReactNode;
}

interface Day {
  id: number;
  date: string;
  stops: Stop[];
}
const stopTypes: { id: string; label: string; icon: ReactNode }[] = [
  { id: "pitstop", label: "Pitstop", icon: <IoFastFoodSharp /> },
  { id: "startpoint", label: "Start Point", icon: <IoCarSportSharp /> },
  { id: "endpoint", label: "End Point", icon: <IoCarSportSharp /> },
  { id: "gas", label: "Gas Station", icon: <IoCarSportSharp /> },
  { id: "sightseeing", label: "Sightseeing", icon: <IoHomeSharp /> },
  { id: "overnight", label: "Overnight", icon: <IoHomeSharp /> },
  { id: "rest", label: "Rest", icon: <IoHomeSharp /> },
];

const DynamicInputForm = () => {
  const [days, setDays] = useState<Day[]>([
    { id: 1, date: "Mon, 25 Nov", stops: [] },
  ]);
  const [selectedType, setSelectedType] = useState<string>(stopTypes[0].id);

  const addNewDay = () => {
    const newDayId = days.length + 1;
    const today = new Date();
    today.setDate(today.getDate() + newDayId - 1);
    const newDay = {
      id: newDayId,
      date: today.toLocaleDateString("en-US", {
        weekday: "short",
        day: "2-digit",
        month: "short",
      }),
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
      icon: stopType.icon,
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

  return (
    <div className="flex flex-col items-center space-y-4">
      {days.map((day) => (
        <div
          key={day.id}
          className="card w-full bg-base-100 shadow-md p-4 border border-gray-200"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">
              Day {day.id}{" "}
              <span className="text-sm text-gray-500">{day.date}</span>
            </h3>
            <button
              className="btn btn-sm btn-circle btn-ghost text-gray-400"
              onClick={() => removeDay(day.id)}
            >
              ✖
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <div className="badge badge-outline">0 km (SEK 0, 0 min)</div>
            </div>
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
                    {stop.icon}
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
  );
};

export default DynamicInputForm;
