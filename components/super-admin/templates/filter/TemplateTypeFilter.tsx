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

export enum TemplateType {
  ALL = "all",
  STAFF = "staff",
  PARENT = "parent"
}

interface TemplateTypeFilterProps {
  className?: string;
}

export default function TemplateTypeFilter({ className }: TemplateTypeFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [templateType, setTemplateType] = useState<string>(TemplateType.ALL);

  // Initialize state from URL params - read the key-value from URL
  useEffect(() => {
    const urlValue = searchParams.get("template_type");
    setTemplateType(urlValue || TemplateType.ALL);
  }, [searchParams]);

  const handleTemplateTypeChange = (value: string) => {
    setTemplateType(value);
    
    const params = new URLSearchParams(searchParams);
    
    // When user chooses filter, send the key-value to URL
    if (value === TemplateType.ALL) {
      params.delete("template_type"); // Remove key if "all" is selected
    } else {
      params.set("template_type", value); // Set key-value in URL
    }
    
   
    
    router.push(`/super-admin/templates?${params.toString()}`);
  };

  return (
    <div className={` ${className}`}>
      <Select value={templateType} onValueChange={handleTemplateTypeChange} >
        <SelectTrigger className="h-8 ">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={TemplateType.ALL}>Select Type</SelectItem>
          <SelectItem value={TemplateType.STAFF}>Staff</SelectItem>
          <SelectItem value={TemplateType.PARENT}>Parent</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 