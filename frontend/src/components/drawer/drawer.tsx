import DynamicInputForm from "./dynamicInputForm";
import { Stat } from "../map/stat";
import { Day } from "@/lib/types";

type DrawerProps = {
  days: Day[];
  setDays: React.Dispatch<React.SetStateAction<Day[]>>;
  totalTravelTime: string;
};

//{ days, setDays }: DrawerProps

export const Drawer = ({ days, setDays, totalTravelTime }: DrawerProps) => {
  return (
    <div className="drawer text-center mb-4">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Navigate
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-2">
          <Stat
            text={"Total time"}
            info={totalTravelTime}
            title={"My trip to Kiruna"}
          />
          <DynamicInputForm days={days} setDays={setDays} />
        </ul>
      </div>
    </div>
  );
};
