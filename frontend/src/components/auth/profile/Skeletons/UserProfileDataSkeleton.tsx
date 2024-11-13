import { Skeleton } from "@/components/ui";

export function UserProfileDataSkeleton() {
  return (
    <div className="border border-slate-700 p-4 mt-5 relative space-y-4 rounded-md">
      <div className="flex gap-x-2 items-center">
        <Skeleton className="w-52 h-6 rounded-sm bg-gray-600" />
        <span className="font-black">-</span>
        <Skeleton className="w-60 h-6 rounded-sm bg-gray-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-x-3 gap-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-3 rounded-md">
            <div className="space-y-2">
              <Skeleton className="w-14 h-4 rounded-md bg-gray-600" />
              <Skeleton className="w-full h-10 rounded-md bg-gray-600" />
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <Skeleton className="w-80 h-12 bg-gray-600" />
        </div>
      </div>
    </div>
  );
}
