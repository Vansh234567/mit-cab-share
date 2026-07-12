"use client";

import { ListFilter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CabFilters, Route, SortOrder, TimeSlot } from "@/types";

interface FilterBarProps {
  filters: CabFilters;
  onChange: (filters: CabFilters) => void;
}

const routeOptions: { value: Route | "ALL"; label: string }[] = [
  { value: "ALL", label: "All Routes" },
  { value: "MIT_TO_AIRPORT", label: "MIT → Airport" },
  { value: "AIRPORT_TO_MIT", label: "Airport → MIT" },
];

const timeSlotOptions: { value: TimeSlot; label: string }[] = [
  { value: "ALL", label: "All Times" },
  { value: "00-06", label: "00:00 - 06:00" },
  { value: "06-12", label: "06:00 - 12:00" },
  { value: "12-18", label: "12:00 - 18:00" },
  { value: "18-24", label: "18:00 - 24:00" },
];

const seatOptions: { value: number | "ALL"; label: string }[] = [
  { value: "ALL", label: "Any Seats" },
  { value: 1, label: "1+ needed" },
  { value: 2, label: "2+ needed" },
  { value: 3, label: "3+ needed" },
];

const sortOptions: { value: SortOrder; label: string }[] = [
  { value: "EARLIEST", label: "Earliest First" },
  { value: "LATEST", label: "Latest First" },
];

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const resetFilters = () =>
    onChange({
      route: "ALL",
      date: "ALL",
      timeSlot: "ALL",
      minSeatsNeeded: "ALL",
      sort: "EARLIEST",
    });

  return (
    <div className="sticky top-16 z-30 border-b border-[#E5E7EB] bg-[#FAFAFA]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden items-center gap-1.5 text-sm font-medium text-[#6B7280] sm:flex">
            <ListFilter className="h-4 w-4" />
            Filters
          </div>

          <Select
            value={filters.route}
            onValueChange={(value) => onChange({ ...filters, route: value as Route | "ALL" })}
          >
            <SelectTrigger className="w-full sm:w-[170px]">
              <SelectValue placeholder="Route" />
            </SelectTrigger>
            <SelectContent>
              {routeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={filters.date === "ALL" ? "" : filters.date}
            onChange={(e) =>
              onChange({ ...filters, date: e.target.value === "" ? "ALL" : e.target.value })
            }
            className="w-full sm:w-[160px]"
          />

          <Select
            value={filters.timeSlot}
            onValueChange={(value) => onChange({ ...filters, timeSlot: value as TimeSlot })}
          >
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Time Slot" />
            </SelectTrigger>
            <SelectContent>
              {timeSlotOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={String(filters.minSeatsNeeded)}
            onValueChange={(value) =>
              onChange({
                ...filters,
                minSeatsNeeded: value === "ALL" ? "ALL" : Number(value),
              })
            }
          >
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Need Seats" />
            </SelectTrigger>
            <SelectContent>
              {seatOptions.map((option) => (
                <SelectItem key={String(option.value)} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.sort}
            onValueChange={(value) => onChange({ ...filters, sort: value as SortOrder })}
          >
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="ghost" size="sm" onClick={resetFilters} className="ml-auto">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
