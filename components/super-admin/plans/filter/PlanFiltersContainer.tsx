"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import PlanRoleTypeFilter from "./PlanRoleTypeFilter";
import PlanStatusFilter from "./PlanStatusFilter";
import TooltipWrapper from "@/components/common/TooltipWrapper";

interface PlanFiltersContainerProps {
  className?: string;
}

export default function PlanFiltersContainer({ className }: PlanFiltersContainerProps) {
  const router = useRouter();

  const clearAllFilters = () => {
    router.push(`/super-admin/plans`);
  };

  return (
    <div className={`w-1/2 flex items-end justify-end gap-2 rounded-t-xl border-t border-x py-2 px-2 ${className}`}>
      <PlanRoleTypeFilter className="w-[50%]" />
      <PlanStatusFilter className="w-[50%]" />
      <div className="w-[20%]">
        <TooltipWrapper label="Clear All Filters">
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="w-full h-8"
          >
            <X className="h-4 w-4" />
            Clear All
          </Button>
        </TooltipWrapper>
      </div>
    </div>
  );
} 