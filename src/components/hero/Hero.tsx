"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onPostCabClick: () => void;
  onBrowseClick: () => void;
}

export function Hero({ onPostCabClick, onBrowseClick }: HeroProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <h1 className="text-4xl font-semibold tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
          Share Airport Cabs with Fellow Students
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#6B7280]">
          Split fares. Travel together. Save money.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" onClick={onPostCabClick} className="w-full sm:w-auto">
            Post a Cab
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={onBrowseClick}
            className="w-full sm:w-auto"
          >
            Browse Cabs
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
