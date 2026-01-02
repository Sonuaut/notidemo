"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useGetSearchParamValue, useURLParams } from "@/components/hooks/request";

export default function SearchFilter({
  placeholder = "Search...",
}: {
  placeholder?: string;
}) {
  // Use the new hooks
  const searchParamValue = useGetSearchParamValue("search");
  const { appendSearchParams, removeSearchParams } = useURLParams();
  const [searchTerm, setSearchTerm] = useState(searchParamValue);
  const inputRef = useRef<HTMLInputElement>(null);

  // Real-time update on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      appendSearchParams("search", value);
    } else {
      removeSearchParams("search");
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
      <Input
        ref={inputRef}
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        className="pl-10 placeholder:text-gray-400 h-9"
      />
    </div>
  );
}
