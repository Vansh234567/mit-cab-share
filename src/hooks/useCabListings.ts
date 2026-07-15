"use client";

import { useMemo, useState, useEffect } from "react";
import { CabFilters, CabFormValues, CabListing } from "@/types";
import {
  createCabListing,
  deleteCabListing,
  updateCabListing,
  filterAndSortCabs,
  getInitialCabs,
} from "@/services/cabService";
const defaultFilters: CabFilters = {
  route: "ALL",
  date: "ALL",
  timeSlot: "ALL",
  minSeatsNeeded: "ALL",
  sort: "EARLIEST",
};

export function useCabListings() {
  const [cabs, setCabs] = useState<CabListing[]>([]);
  const [filters, setFilters] = useState<CabFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  async function load() {
    const data = await getInitialCabs();
    setCabs(data);
    setIsLoading(false);
  }

  load();
}, []);

  const filteredCabs = useMemo(() => filterAndSortCabs(cabs, filters), [cabs, filters]);

  const addCab = async (values: CabFormValues) => {
  const newCab = await createCabListing(values);
  setCabs((prev) => [newCab, ...prev]);
};
const deleteCab = async (id: string) => {
  console.log("Deleting:", id);

  await deleteCabListing(id);

  console.log("Deleted from Supabase");

  setCabs((prev) => prev.filter((cab) => cab.id !== id));

  console.log("Removed from React state");
};
const updateCab = async (
  id: string,
  values: CabFormValues
) => {
  const updatedCab = await updateCabListing(id, values);

  setCabs((prev) =>
    prev.map((cab) =>
      cab.id === id ? updatedCab : cab
    )
  );
};
  return {
  cabs: filteredCabs,
  isLoading,
  filters,
  setFilters,
  addCab,
  deleteCab,
  updateCab,
};
}