import { Skeleton } from "@/components/ui/skeleton";

export default function CardsGridSkeleton() {
  return (
    <>
      <Skeleton className="w-[340px] h-[313px] rounded-xl" />
      <Skeleton className="w-[340px] h-[313px] rounded-xl" />
      <Skeleton className="w-[340px] h-[313px] rounded-xl" />
      <Skeleton className="w-[340px] h-[313px] rounded-xl" />
      <Skeleton className="w-[340px] h-[313px] rounded-xl" />
      <Skeleton className="w-[340px] h-[313px] rounded-xl" />
    </>
  );
}
