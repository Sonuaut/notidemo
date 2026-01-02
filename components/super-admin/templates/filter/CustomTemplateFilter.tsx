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

export enum CustomTemplate {
  ALL = "all",
  CUSTOM = "true",
  NON_CUSTOM = "false"
}

interface CustomTemplateFilterProps {
  className?: string;
}

export default function CustomTemplateFilter({ className }: CustomTemplateFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isCustom, setIsCustom] = useState<string>(CustomTemplate.ALL);

  // Initialize state from URL params - read the key-value from URL
  useEffect(() => {
    const urlValue = searchParams.get("is_custom");
    setIsCustom(urlValue || CustomTemplate.ALL);
  }, [searchParams]);

  const handleCustomTemplateChange = (value: string) => {
    setIsCustom(value);
    
    const params = new URLSearchParams(searchParams);
    
    // When user chooses filter, send the key-value to URL
    if (value === CustomTemplate.ALL) {
      params.delete("is_custom"); // Remove key if "all" is selected
    } else {
      params.set("is_custom", value); // Set key-value in URL
    }
    
    router.push(`/super-admin/templates?${params.toString()}`);
  };

  return (
    <div className={` ${className}`}>
      
      <Select value={isCustom} onValueChange={handleCustomTemplateChange}>
        <SelectTrigger className="h-8">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={CustomTemplate.ALL}>Select Category</SelectItem>
          <SelectItem value={CustomTemplate.CUSTOM}>Custom</SelectItem>
          <SelectItem value={CustomTemplate.NON_CUSTOM}>Non-Custom</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 