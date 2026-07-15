"use client";

import { AnimatePresence } from "framer-motion";
import { CabListing } from "@/types";
import { CabCard } from "@/components/cards/CabCard";
import { CabCardSkeleton } from "@/components/cards/CabCardSkeleton";
import { EmptyState } from "@/components/common/EmptyState";

interface CabGridProps {
  cabs: CabListing[];
  isLoading: boolean;
  deleteCab: (id: string) => Promise<void>;
  onEditCab: (cab: CabListing) => void;
}

export function CabGrid({
  cabs,
  isLoading,
  deleteCab,
  onEditCab,
}: CabGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <CabCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (cabs.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {cabs.map((cab) => (
         <CabCard
  key={cab.id}
  cab={cab}
  deleteCab={deleteCab}
  onEditCab={onEditCab}
/>
        ))}
      </AnimatePresence>
    </div>
  );
}
