import { getStopTypeIcon } from "@/lib/icons";
import { TripData } from "@/lib/types";
import { LoadingState } from "../ui-states/loading";

const TripTimeline = ({ tripData }: { tripData: TripData }) => {
  if (!tripData) {
    return <LoadingState />;
  }
  const leftDays = tripData.days.slice(1, tripData.days.length - 1);

  return (
    <ul className="timeline timeline-vertical">
      <li>
        <div className="timeline-start timeline-box">
          <time className="font-mono italic">
            {new Date(tripData.days[0].date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </time>
          {tripData.days[0].stops.map((stop) => (
            <div
              key={stop.id}
              className="text-lg font-black flex flex-row gap-2 items-center"
            >
              <p className="text-gray-500 text-sm">
                {getStopTypeIcon(stop.stopType) || "Unknown"}
              </p>
              <p className="font-medium">{stop.name}</p>
            </div>
          ))}
        </div>
        <div className="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="text-primary h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <hr className="bg-primary" />
      </li>
      {/* Middle days */}
      {leftDays.length > 0 &&
        leftDays.map((day) => (
          <li key={day.id}>
            <hr className="bg-primary" />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="text-primary h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box">
              <time className="font-mono italic">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {day.stops.length > 0 ? (
                day.stops.map((stop) => (
                  <div
                    key={stop.id}
                    className="text-lg font-black flex flex-row gap-2 items-center"
                  >
                    <p className="text-gray-500 text-sm">
                      {getStopTypeIcon(stop.stopType) || "Unknown"}
                    </p>
                    <p className="font-medium">{stop.name}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No stops for this day</p>
              )}
            </div>
            <hr className="bg-primary" />
          </li>
        ))}

      <li>
        <hr />
        <div className="timeline-start timeline-box">
          <time className="font-mono italic">
            {new Date(
              tripData.days[tripData.days.length - 1].date
            ).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </time>
          {tripData.days[tripData.days.length - 1].stops.map((stop) => (
            <div
              key={stop.id}
              className="text-lg font-black flex flex-row gap-2 items-center"
            >
              <p className="text-gray-500 text-sm">
                {getStopTypeIcon(stop.stopType) || "Unknown"}
              </p>
              <p className="font-medium">{stop.name}</p>
            </div>
          ))}
        </div>
        <div className="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </li>
    </ul>
  );
};

export default TripTimeline;
