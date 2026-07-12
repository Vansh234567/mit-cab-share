"use client";

import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onPostCabClick: () => void;
}

export function Navbar({ onPostCabClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563EB]">
            <Car className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-[#111827]">
            MIT Cab Share
          </span>
        </div>

        <Button onClick={onPostCabClick} size="default">
          Post a Cab
        </Button>
      </div>
    </header>
  );
}
