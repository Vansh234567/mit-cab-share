import { Skeleton } from "@/components/ui/skeleton";

export function CabCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-9 w-32 rounded-xl" />
      </div>
    </div>
  );
}
