import { mockCabs } from "@/data/mockCabs";
import { CabFilters, CabFormValues, CabListing } from "@/types";
import { getTimeSlotBounds, timeToMinutes } from "@/utils/format";

/**
 * This service abstracts cab data access. Right now it reads from local
 * mock data. When Supabase is wired up, only this file needs to change
 * (swap the in-memory array reads/writes for Supabase client calls).
 */

export function getInitialCabs(): CabListing[] {
  return mockCabs;
}

export function createCabListing(values: CabFormValues): CabListing {
  return {
    id: `cab-${crypto.randomUUID()}`,
    ...values,
    createdAt: new Date().toISOString(),
  };
}

export function filterAndSortCabs(cabs: CabListing[], filters: CabFilters): CabListing[] {
  let result = [...cabs];

  if (filters.route !== "ALL") {
    result = result.filter((cab) => cab.route === filters.route);
  }

  if (filters.date !== "ALL") {
    result = result.filter((cab) => cab.travelDate === filters.date);
  }

  if (filters.timeSlot !== "ALL") {
    result = result.filter((cab) => {
      const hour = parseInt(cab.time.split(":")[0], 10);
      return getTimeSlotBounds(hour) === filters.timeSlot;
    });
  }

  if (filters.minSeatsNeeded !== "ALL") {
    const minSeats = filters.minSeatsNeeded;
    result = result.filter((cab) => cab.needMorePeople >= minSeats);
  }

  result.sort((a, b) => {
    const aValue = timeToMinutes(a.time) + new Date(a.travelDate).getTime() / 60000;
    const bValue = timeToMinutes(b.time) + new Date(b.travelDate).getTime() / 60000;
    return filters.sort === "EARLIEST" ? aValue - bValue : bValue - aValue;
  });

  return result;
}
