import { z } from "zod";

export const cabFormSchema = z.object({
  route: z.enum(["MIT_TO_AIRPORT", "AIRPORT_TO_MIT"], {
    message: "Please select a route",
  }),
  travelDate: z.string().min(1, "Please select a travel date"),
  time: z.string().min(1, "Please select a time"),
  peopleAlreadyTraveling: z.coerce
    .number({ message: "Enter a valid number" })
    .int("Must be a whole number")
    .min(1, "At least 1 person must be traveling"),
  needMorePeople: z.coerce
    .number({ message: "Enter a valid number" })
    .int("Must be a whole number")
    .min(1, "Must need at least 1 more person"),
  contactNumber: z
    .string()
    .min(10, "Enter a valid 10-digit phone number")
    .max(10, "Enter a valid 10-digit phone number")
    .regex(/^[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
  totalFare: z.coerce
    .number({ message: "Enter a valid fare" })
    .positive("Fare must be greater than 0"),
});

export type CabFormOutput = z.output<typeof cabFormSchema>;
export type CabFormInput = z.input<typeof cabFormSchema>;
