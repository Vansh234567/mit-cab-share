export type Route = "MIT_TO_AIRPORT" | "AIRPORT_TO_MIT";

export type TimeSlot = "ALL" | "00-06" | "06-12" | "12-18" | "18-24";

export type SortOrder = "EARLIEST" | "LATEST";

export interface CabListing {
  id: string;
  route: Route;
  travelDate: string;
  time: string;
  peopleAlreadyTraveling: number;
  needMorePeople: number;
  contactNumber: string;
  totalFare: number;
  managePin: string; // NEW
  createdAt: string;
}

export interface CabFormValues {
  route: Route;
  travelDate: string;
  time: string;
  peopleAlreadyTraveling: number;
  needMorePeople: number;
  contactNumber: string;
  totalFare: number;
  managePin: string; // NEW
}

export interface CabFilters {
  route: Route | "ALL";
  date: string | "ALL";
  timeSlot: TimeSlot;
  minSeatsNeeded: number | "ALL";
  sort: SortOrder;
}
