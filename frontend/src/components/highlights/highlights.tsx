import { useState } from "react";
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "@tanstack/react-router";

const Highlights = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const highlightId = date?.getMilliseconds();
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1>Journal</h1>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <button
        onClick={() =>
          navigate({ to: `/dashboard/trips/highlights/${highlightId}` })
        }
        className="btn"
      >
        Add notes
      </button>
      <div>You dont have any notes for this trip</div>
    </div>
  );
};
export default Highlights