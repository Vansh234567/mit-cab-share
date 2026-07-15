"use client";

import { useRef, useState } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { CabListingsSection } from "@/components/cards/CabListingsSection";
import { Footer } from "@/components/footer/Footer";
import { PostCabDialog } from "@/components/dialogs/PostCabDialog";
import { useCabListings } from "@/hooks/useCabListings";
import { CabListing } from "@/types";
export function HomeClient() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
const [editingCab, setEditingCab] = useState<CabListing | null>(null);
const {
  cabs,
  isLoading,
  filters,
  setFilters,
  addCab,
  deleteCab,
  updateCab,
} = useCabListings(); const listingsRef = useRef<HTMLDivElement>(null);
  const scrollToListings = () => {
    listingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
const handleEditCab = (cab: CabListing) => {
  setEditingCab(cab);
  setIsDialogOpen(true);
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
  deleteCab={deleteCab}
  onEditCab={handleEditCab}
/>
      </main>
      <Footer />

   <PostCabDialog
  open={isDialogOpen}
onOpenChange={(open) => {
  setIsDialogOpen(open);

  if (!open) {
    setEditingCab(null);
  }
}}  onSubmitCab={addCab}
  onUpdateCab={updateCab}
  editingCab={editingCab}
/>
    </div>
  );
}
