import DynamicInputForm from "./dynamicInputForm";
import { Stat } from "../map/stat";
import { Day } from "@/lib/types";
import { useState } from "react";

type DrawerProps = {
  days: Day[];
  setDays: React.Dispatch<React.SetStateAction<Day[]>>;
  totalTravelTime: string;
};

export const Drawer = ({ days, setDays, totalTravelTime }: DrawerProps) => {
  const [title, setTitle] = useState("");

  return (
    <div className="drawer text-center mb-4">
      <input id="my-drawer" type="checkbox" className="drawer-toggle mt-10" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Add a trip
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-4">
          <Stat
            setTitle={setTitle}
            text={"Total time"}
            info={totalTravelTime}
            title={title}
          />
          <DynamicInputForm days={days} setDays={setDays} title={title} />
        </div>
      </div>
    </div>
  );
};
