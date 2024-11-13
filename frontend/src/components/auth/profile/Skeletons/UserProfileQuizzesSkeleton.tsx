import { Skeleton } from "@/components/ui";

export function UserProfileQuizzesSkeleton() {
  return (
    <div className="space-y-3 border border-slate-700 rounded-md p-3">
      <div className="space-y-2">
        <Skeleton className="w-24 h-4 rounded-md bg-gray-600" />
        <Skeleton className="w-full h-4 rounded-md bg-gray-600" />
      </div>

      <div className="flex gap-x-3">
        <Skeleton className="w-24 h-4 rounded-md bg-gray-600" />
        <Skeleton className="w-full h-4 rounded-md bg-gray-600" />
      </div>

      <div className="flex gap-x-3">
        <Skeleton className="w-24 h-4 rounded-md bg-gray-600" />
        <Skeleton className="w-full h-4 rounded-md bg-gray-600" />
      </div>

      <Skeleton className="w-full h-8 rounded-md bg-gray-600" />
    </div>
  );
}
