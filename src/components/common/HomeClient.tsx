"use client";

import { useRef, useState } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { CabListingsSection } from "@/components/cards/CabListingsSection";
import { Footer } from "@/components/footer/Footer";
import { PostCabDialog } from "@/components/dialogs/PostCabDialog";
import { useCabListings } from "@/hooks/useCabListings";

export function HomeClient() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { cabs, isLoading, filters, setFilters, addCab } = useCabListings();
  const listingsRef = useRef<HTMLDivElement>(null);

  const scrollToListings = () => {
    listingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
      <Navbar onPostCabClick={() => setIsDialogOpen(true)} />
      <main className="flex-1">
        <Hero onPostCabClick={() => setIsDialogOpen(true)} onBrowseClick={scrollToListings} />
        <CabListingsSection
          ref={listingsRef}
          cabs={cabs}
          isLoading={isLoading}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </main>
      <Footer />

      <PostCabDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmitCab={addCab} />
    </div>
  );
}
