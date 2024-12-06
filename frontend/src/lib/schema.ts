import { z } from "zod";
import { StopType } from "./types";

export const DaySchema = z.object({
  date: z.date(),
  dayOrder: z.number(),
  stops: z
    .array(
      z.object({
        stopType: z.nativeEnum(StopType),
        name: z.string().min(1),
      })
    )
    .min(2, "At least two stops are required"),
});

export const FullTripSchema = z.object({
  userId: z.string(),
  title: z.string().min(2, "Provide a title").max(20, "Title is to long"),
  days: z.array(DaySchema).min(1, "At least one day is required"),
});

export type ValidatedFullTripSchema = z.infer<typeof FullTripSchema>;
