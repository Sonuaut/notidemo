import { Skeleton } from "@/components/ui/skeleton";

export default function PlanTableSkeleton() {
  return (
    <div className="rounded-md border overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr className="border-b">
            <th className="text-left p-4">
              <Skeleton className="h-4 w-20" />
            </th>
            <th className="text-left p-4">
              <Skeleton className="h-4 w-32" />
            </th>
            <th className="text-left p-4">
              <Skeleton className="h-4 w-24" />
            </th>
            <th className="text-left p-4">
              <Skeleton className="h-4 w-20" />
            </th>
            <th className="text-left p-4">
              <Skeleton className="h-4 w-16" />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 3 }).map((_, index) => (
            <tr key={index} className={`border-b last:border-b-0 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F6F6FF]'}`}>
              <td className="p-4">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="p-4">
                <Skeleton className="h-4 w-40" />
              </td>
              <td className="p-4">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="p-4">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="p-4">
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 