"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Phone, Users, Wallet, ArrowRight } from "lucide-react";
import { CabListing } from "@/types";
import { formatDate, formatFare, formatRoute, formatTime, routeTimeLabel } from "@/utils/format";
import { Badge } from "@/components/ui/badge";

interface CabCardProps {
  cab: CabListing;
}

export function CabCard({ cab }: CabCardProps) {
  const farePerPerson = Math.round(
    cab.totalFare / (cab.peopleAlreadyTraveling + cab.needMorePeople)
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-base font-semibold text-[#111827]">
          <span>{formatRoute(cab.route).split(" → ")[0]}</span>
          <ArrowRight className="h-4 w-4 text-[#6B7280]" />
          <span>{formatRoute(cab.route).split(" → ")[1]}</span>
        </div>
        <Badge>{cab.needMorePeople} seat{cab.needMorePeople === 1 ? "" : "s"} needed</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-[#6B7280]">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#2563EB]" />
          <span>{formatDate(cab.travelDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#2563EB]" />
          <span>{formatTime(cab.time)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-[#2563EB]" />
          <span>{cab.peopleAlreadyTraveling} already traveling</span>
        </div>
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-[#2563EB]" />
          <span>{formatFare(cab.totalFare)} total</span>
        </div>
      </div>

      <p className="text-xs text-[#9CA3AF]">{routeTimeLabel(cab.route)}</p>

      <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-4">
        <div>
          <p className="text-xs text-[#6B7280]">Approx. per person</p>
          <p className="text-lg font-semibold text-[#111827]">{formatFare(farePerPerson)}</p>
        </div>
        <a
          href={`tel:${cab.contactNumber}`}
          className="flex items-center gap-2 rounded-xl bg-[#F3F4F6] px-4 py-2 text-sm font-medium text-[#111827] transition-colors hover:bg-[#E5E7EB]"
        >
          <Phone className="h-4 w-4" />
          {cab.contactNumber}
        </a>
      </div>
    </motion.div>
  );
}
