"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AutoRedirect({ to, seconds = 3 }: { to: string; seconds?: number }) {
  const router = useRouter();
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) {
      router.push(to);
      return;
    }
    const id = setTimeout(() => setRemaining(prev => prev - 1), 1000);
    return () => clearTimeout(id);
  }, [remaining, router, to]);

  return (
    <p className="text-sm text-gray-500">You will be redirected to the dashboard automatically in {remaining}s. If not, use the button below.</p>
  );
}


