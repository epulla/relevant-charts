import { Skeleton } from "@/components/ui/skeleton";

export default function CommunityExampleLoading() {
  return (
    <>
      <Skeleton className="h-16 w-full rounded-xl mb-2" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <div className="flex flex-col">
        <div className="flex justify-end mt-2 mb-0.5">
          <Skeleton className="h-10 w-10 rounded-xl" />
        </div>
        <div className="flex flex-col md:flex-row gap-0.5 h-[512px] mb-0.5">
          <div className="flex flex-col gap-0.5 md:w-64">
            <Skeleton className="rounded-xl flex-1" />
            <Skeleton className="rounded-xl flex-1" />
            <Skeleton className="rounded-xl flex-1" />
          </div>
          <Skeleton className="flex-1 rounded-xl" />
        </div>
        <div className="flex flex-col md:grid md:grid-cols-3 h-80">
          <Skeleton className="rounded-xl" />
          <Skeleton className="rounded-xl" />
          <Skeleton className="rounded-xl" />
        </div>
      </div>
    </>
  );
}
