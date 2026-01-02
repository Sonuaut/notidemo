"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PlanStatusFilterProps {
  className?: string;
}

export default function PlanStatusFilter({ className }: PlanStatusFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>("all");

  useEffect(() => {
    const status = searchParams.get("is_active");
    setValue(status || "all");
  }, [searchParams]);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    const params = new URLSearchParams(searchParams);
    
    if (newValue && newValue !== "all") {
      params.set("is_active", newValue);
    } else {
      params.delete("is_active");
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={`${className}`}>
     
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="h-8 text-xs">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="true">Active</SelectItem>
          <SelectItem value="false">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 