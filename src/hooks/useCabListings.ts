"use client";

import { useMemo, useState, useEffect } from "react";
import { CabFilters, CabFormValues, CabListing } from "@/types";
import { createCabListing, filterAndSortCabs, getInitialCabs } from "@/services/cabService";

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
    const timer = setTimeout(() => {
      setCabs(getInitialCabs());
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredCabs = useMemo(() => filterAndSortCabs(cabs, filters), [cabs, filters]);

  const addCab = (values: CabFormValues) => {
    const newCab = createCabListing(values);
    setCabs((prev) => [newCab, ...prev]);
  };

  return {
    cabs: filteredCabs,
    isLoading,
    filters,
    setFilters,
    addCab,
  };
}
