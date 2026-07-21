"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function PageFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-page-fade">
      {children}
    </div>
  );
}
