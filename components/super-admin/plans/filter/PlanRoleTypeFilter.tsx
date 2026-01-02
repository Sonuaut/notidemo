"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PlanRoleTypeFilterProps {
  className?: string;
}

export default function PlanRoleTypeFilter({ className }: PlanRoleTypeFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>("all");

  useEffect(() => {
    const roleType = searchParams.get("role_type_plan");
    setValue(roleType || "all");
  }, [searchParams]);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    const params = new URLSearchParams(searchParams);
    
    if (newValue && newValue !== "all") {
      params.set("role_type_plan", newValue);
    } else {
      params.delete("role_type_plan");
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={`${className}`}>
     
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="h-8 text-xs">
          <SelectValue placeholder="All Role Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Role Types</SelectItem>
          <SelectItem value="Organization">Organization</SelectItem>
          <SelectItem value="Individual">Individual</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 