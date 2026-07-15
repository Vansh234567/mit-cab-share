import { supabase } from "@/lib/supabase";
import { CabFilters, CabFormValues, CabListing } from "@/types";
import { getTimeSlotBounds, timeToMinutes } from "@/utils/format";

export async function getInitialCabs(): Promise<CabListing[]> {
  const { data, error } = await supabase
    .from("cab_listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((cab) => ({
    id: cab.id,
    route: cab.route,
    travelDate: cab.travel_date,
    time: cab.time,
    peopleAlreadyTraveling: cab.people_already_traveling,
    needMorePeople: cab.need_more_people,
    totalFare: cab.total_fare,
    contactNumber: cab.contact_number,
    managePin: cab.manage_pin,
    createdAt: cab.created_at,
  }));
}

export async function createCabListing(values: CabFormValues) {
  console.log("INSERTING:", values);

  const { data, error } = await supabase
    .from("cab_listings")
    .insert({
      route: values.route,
      travel_date: values.travelDate,
      time: values.time,
      people_already_traveling: values.peopleAlreadyTraveling,
      need_more_people: values.needMorePeople,
      total_fare: values.totalFare,
      contact_number: values.contactNumber,
      manage_pin: values.managePin,
    })
    .select()
    .single();

  console.log("DATA:", data);
  console.log("ERROR:", JSON.stringify(error, null, 2));
console.log("STATUS:", error?.code, error?.message, error?.details, error?.hint);

  if (error) throw error;

  return {
    id: data.id,
    route: data.route,
    travelDate: data.travel_date,
    time: data.time,
    peopleAlreadyTraveling: data.people_already_traveling,
    needMorePeople: data.need_more_people,
    totalFare: data.total_fare,
    contactNumber: data.contact_number,
    managePin: data.manage_pin,
    createdAt: data.created_at,
  };
}
export async function updateCabListing(
  id: string,
  values: CabFormValues
): Promise<CabListing> {
  const { data, error } = await supabase
    .from("cab_listings")
    .update({
      route: values.route,
      travel_date: values.travelDate,
      time: values.time,
      people_already_traveling: values.peopleAlreadyTraveling,
      need_more_people: values.needMorePeople,
      total_fare: values.totalFare,
      contact_number: values.contactNumber,
      manage_pin: values.managePin,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    route: data.route,
    travelDate: data.travel_date,
    time: data.time,
    peopleAlreadyTraveling: data.people_already_traveling,
    needMorePeople: data.need_more_people,
    totalFare: data.total_fare,
    contactNumber: data.contact_number,
    managePin: data.manage_pin,
    createdAt: data.created_at,
  };
}
export function filterAndSortCabs(
  cabs: CabListing[],
  filters: CabFilters
): CabListing[] {
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
    result = result.filter(
      (cab) => cab.needMorePeople >= filters.minSeatsNeeded
    );
  }

  result.sort((a, b) => {
    const aValue =
      timeToMinutes(a.time) + new Date(a.travelDate).getTime() / 60000;

    const bValue =
      timeToMinutes(b.time) + new Date(b.travelDate).getTime() / 60000;

    return filters.sort === "EARLIEST"
      ? aValue - bValue
      : bValue - aValue;
  });

  return result;
}
export async function deleteCabListing(id: string) {
  const { error } = await supabase
    .from("cab_listings")
    .delete()
    .eq("id", id);

  console.log("DELETE ERROR:", error);

  if (error) throw error;
}