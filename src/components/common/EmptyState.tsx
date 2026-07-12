"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-white px-6 py-20 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F3F4F6]">
        <SearchX className="h-7 w-7 text-[#6B7280]" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-[#111827]">No matching rides found.</h3>
      <p className="mt-1 text-sm text-[#6B7280]">
        Try adjusting your filters or check back later.
      </p>
    </motion.div>
  );
}
