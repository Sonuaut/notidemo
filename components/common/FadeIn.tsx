"use client";

import { useEffect, useState } from "react";

export default function FadeIn({ children, duration = 300 }: { children: React.ReactNode; duration?: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div className={`transition-opacity ease-out duration-${duration} ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
}


