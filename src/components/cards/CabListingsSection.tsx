"use client";

import { forwardRef } from "react";
import { FilterBar } from "@/components/filters/FilterBar";
import { CabGrid } from "@/components/cards/CabGrid";
import { CabFilters, CabListing } from "@/types";

interface CabListingsSectionProps {
  cabs: CabListing[];
  isLoading: boolean;
  filters: CabFilters;
  onFiltersChange: (filters: CabFilters) => void;
}

export const CabListingsSection = forwardRef<HTMLDivElement, CabListingsSectionProps>(
  ({ cabs, isLoading, filters, onFiltersChange }, ref) => {
    return (
      <section ref={ref} className="pb-24">
        <FilterBar filters={filters} onChange={onFiltersChange} />
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold text-[#111827]">Available Rides</h2>
            {!isLoading && (
              <span className="text-sm text-[#6B7280]">
                {cabs.length} {cabs.length === 1 ? "ride" : "rides"} found
              </span>
            )}
          </div>
          <CabGrid cabs={cabs} isLoading={isLoading} />
        </div>
      </section>
    );
  }
);
CabListingsSection.displayName = "CabListingsSection";
