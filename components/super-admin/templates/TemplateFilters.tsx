"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { X, Filter, Search } from "lucide-react";

export enum TemplateType {
  STAFF = "staff",
  PARENT = "parent"
}

export enum FilterStatus {
  ALL = "all",
  ACTIVE = "true",
  INACTIVE = "false"
}

export enum CustomFilter {
  ALL = "all",
  CUSTOM = "true",
  NON_CUSTOM = "false"
}

interface TemplateFiltersProps {
  className?: string;
}

export default function TemplateFilters({ className }: TemplateFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [templateType, setTemplateType] = useState<string>("all");
  const [isActive, setIsActive] = useState<string>("all");
  const [isCustom, setIsCustom] = useState<string>("all");
  const [searchName, setSearchName] = useState<string>("");

  // Initialize state from URL params
  useEffect(() => {
    setTemplateType(searchParams.get("template_type") || "all");
    setIsActive(searchParams.get("is_active") || "all");
    setIsCustom(searchParams.get("is_custom") || "all");
    setSearchName(searchParams.get("name") || "");
  }, [searchParams]);

  const updateFilters = () => {
    const params = new URLSearchParams();
    
    if (templateType !== "all") {
      params.set("template_type", templateType);
    }
    if (isActive !== "all") {
      params.set("is_active", isActive);
    }
    if (isCustom !== "all") {
      params.set("is_custom", isCustom);
    }
    if (searchName.trim()) {
      params.set("name", searchName.trim());
    }
    
    // Reset offset when filters change
    params.set("offset", "0");
    
    // Preserve existing limit
    const currentLimit = searchParams.get("limit");
    if (currentLimit) {
      params.set("limit", currentLimit);
    }
    
    router.push(`/super-admin/templates?${params.toString()}`);
  };

  const clearFilters = () => {
    setTemplateType("all");
    setIsActive("all");
    setIsCustom("all");
    setSearchName("");
    
    const params = new URLSearchParams();
    params.set("offset", "0");
    
    // Preserve existing limit
    const currentLimit = searchParams.get("limit");
    if (currentLimit) {
      params.set("limit", currentLimit);
    }
    
    router.push(`/super-admin/templates?${params.toString()}`);
  };

  const hasActiveFilters = templateType !== "all" || isActive !== "all" || isCustom !== "all" || searchName.trim() !== "";

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search by Name */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Search by Name</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search templates..."
              className="pl-10 h-10"
            />
          </div>
        </div>

        {/* Template Type Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Template Type</Label>
          <Select value={templateType} onValueChange={setTemplateType}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value={TemplateType.STAFF}>Staff</SelectItem>
              <SelectItem value={TemplateType.PARENT}>Parent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Status Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Active Status</Label>
          <Select value={isActive} onValueChange={setIsActive}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value={FilterStatus.ACTIVE}>Active</SelectItem>
              <SelectItem value={FilterStatus.INACTIVE}>Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Custom Template Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Template Category</Label>
          <Select value={isCustom} onValueChange={setIsCustom}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value={CustomFilter.CUSTOM}>Custom</SelectItem>
              <SelectItem value={CustomFilter.NON_CUSTOM}>Non-Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button
          onClick={updateFilters}
          className="bg-[#8D8EF5] text-white hover:bg-[#8D8EF5]/90"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
} 