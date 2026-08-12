import { z } from "zod";

export const TravelSchema = z.object({
  destination: z.string().min(1),
  country: z.string().min(1),
  durationDays: z.number().int().positive(),
  estimatedBudget: z.number().positive(),
  activities: z.array(z.string()),
});

export type TravelPlan = z.infer<typeof TravelSchema>;
