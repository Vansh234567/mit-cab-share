import { Car } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB]">
            <Car className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-medium text-[#111827]">MIT Cab Share</span>
        </div>
        <p className="text-sm text-[#6B7280]">
          Built by MIT student, for MIT students.
        </p>
      </div>
    </footer>
  );
}
