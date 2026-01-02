"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IRole } from "@/types";
import PageHeader from "../common/PageHeader";




interface HeaderProps {
  type: IRole;
}

export function Header() {
  const pathname = usePathname();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);


  // Fetch page info from API
  useEffect(() => {
    const fetchPageInfo = async () => {
      if (!pathname) return;
      
      setLoading(true);
      try {
        const response = await fetch(`/api/common?pathname=${encodeURIComponent(pathname)}`);
        const data = await response.json();
        console.log("pathname",data)
          setTitle(data);

      } catch (error) {
      
      } finally {
        setLoading(false);
      }
    };

    fetchPageInfo();
  }, [pathname]);


  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b bg-background px-4 sm:px-6">
     

    </header>
  );
}

