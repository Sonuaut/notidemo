"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export enum ActiveStatus {
  ALL = "all",
  ACTIVE = "true",
  INACTIVE = "false"
}

interface ActiveStatusFilterProps {
  className?: string;
}

export default function ActiveStatusFilter({ className }: ActiveStatusFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isActive, setIsActive] = useState<string>(ActiveStatus.ALL);

  // Initialize state from URL params - read the key-value from URL
  useEffect(() => {
    const urlValue = searchParams.get("is_active");
    setIsActive(urlValue || ActiveStatus.ALL);
  }, [searchParams]);

  const handleActiveStatusChange = (value: string) => {
    setIsActive(value);
    
    const params = new URLSearchParams(searchParams);
    
    // When user chooses filter, send the key-value to URL
    if (value === ActiveStatus.ALL) {
      params.delete("is_active"); // Remove key if "all" is selected
    } else {
      params.set("is_active", value); // Set key-value in URL
    }
    
    router.push(`/super-admin/templates?${params.toString()}`);
  };

  return (
    <div className={` ${className}`}>
     
      <Select value={isActive} onValueChange={handleActiveStatusChange}>
        <SelectTrigger className="h-8">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ActiveStatus.ALL}>Select Status</SelectItem>
          <SelectItem value={ActiveStatus.ACTIVE}>Active</SelectItem>
          <SelectItem value={ActiveStatus.INACTIVE}>Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 