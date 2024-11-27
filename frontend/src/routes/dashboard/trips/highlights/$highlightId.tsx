import { createFileRoute, useParams } from "@tanstack/react-router";
import { Button } from "react-day-picker";

export const Route = createFileRoute(
  "/dashboard/trips/highlights/$highlightId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const highlightId = useParams({
    from: "/dashboard/trips/highlights/$highlightId",
    select: (params) => params.highlightId,
  });
  return (
    <div className="">
      <div className="btn">Back</div>
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
              placeholder="Bio"
            ></textarea>
            <div className="absolute bottom-2 right-2 flex gap-2">
              <button className="border w-6 h-6 border-black rounded"></button>
              <button className="border w-6 h-6 border-black rounded"></button>
              <button className="border w-6 h-6 border-black rounded"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
