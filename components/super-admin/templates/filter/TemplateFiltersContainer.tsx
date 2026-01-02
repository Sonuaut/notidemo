"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Filter, Search } from "lucide-react";
import TemplateTypeFilter from "./TemplateTypeFilter";
import ActiveStatusFilter from "./ActiveStatusFilter";
import CustomTemplateFilter from "./CustomTemplateFilter";
import TooltipWrapper from "@/components/common/TooltipWrapper";

interface TemplateFiltersContainerProps {
  className?: string;
}

export default function TemplateFiltersContainer({ className }: TemplateFiltersContainerProps) {
  const router = useRouter();

  const clearAllFilters = () => {
    router.push(`/super-admin/templates`);
  };

  return (
    <div className={`w-2/3 flex items-end justify-end gap-2 rounded-t-xl border-t border-x  py-2 px-2 ${className}`}>
     <TemplateTypeFilter className="w-[20%]  " />
      <ActiveStatusFilter className="w-[30%] " />
      <CustomTemplateFilter className="w-[30%] " />
      <div className="w-[20%] ">
      <TooltipWrapper label="Clear All Filters">
      <Button
          variant="outline"
          size="sm"
          onClick={clearAllFilters}
        className="w-full h-8"
        >
          <X className="h-4   w-full " />
          Clear All
        </Button>

      </TooltipWrapper>
      </div>
    </div>
  );
} 