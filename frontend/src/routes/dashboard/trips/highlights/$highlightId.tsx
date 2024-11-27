import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { Button } from "react-day-picker";

export const Route = createFileRoute(
  "/dashboard/trips/highlights/$highlightId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const highlightId = useParams({
    from: "/dashboard/trips/highlights/$highlightId",
    select: (params) => params.highlightId,
  });
  return (
    <div className="">
      <div className="btn" onClick={() => window.history.back()}>
        Back
      </div>
      <p>My note {highlightId}</p>
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <p className="text-2xl">Title</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />

        <div className="w-screen p-3 flex flex-col justify-center items-center relative">
          <div className="relative w-full">
            <textarea
              className="textarea textarea-bordered w-full resize-none h-72"
              placeholder="Enter text..."
            ></textarea>
            <div className="absolute bottom-2 right-2 flex gap-2 items-end">
              <button className="btn btn-outline min-h-10 h-10 w-10 text-2xl">
                ♫
              </button>
              <button className="btn btn-outline min-h-10 h-10 w-10 text-2xl">
                ⊛
              </button>
              <button className="btn btn-success min-h-10 h-10">Success</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
