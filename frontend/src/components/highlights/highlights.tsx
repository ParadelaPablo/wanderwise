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
import HighlightCard from "./highLightCard";

const Highlights = ({ tripId }: { tripId: string }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  //do we nee to save the date? maybe yes
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
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
          navigate({ to: `/dashboard/trips/${tripId}/hightlights/create` })
        }
        className="btn"
      >
        Add notes
      </button>
      <div className="flex flex-col justify-center items-center gap-y-20 mt-10">
        <HighlightCard
          url={
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D"
          }
        />
        <HighlightCard
          url={
            "https://images.squarespace-cdn.com/content/v1/64ba44348b6a05559a816bc1/1690282971608-B4BD48EE7DOGJDWKOL52/A+Guide+to+Travel+Photography-152.jpg"
          }
        />
        <HighlightCard
          url={
            "https://burst.shopifycdn.com/photos/livin-on-the-ledge.jpg?width=1000&format=pjpg&exif=0&iptc=0"
          }
        />
        <HighlightCard
          url={
            "https://owltourism.az/wp-content/uploads/2024/05/Travel-Guide-to-Vietnam.jpg"
          }
        />
        <HighlightCard
          url={
            "https://assets.weforum.org/article/image/nGNRBoGEeAaB36bs9qLZpSXjzzQ92MHeicpf5naJn0U.jpg"
          }
        />
        You dont have any notes for this trip
      </div>
    </div>
  );
};
export default Highlights;
