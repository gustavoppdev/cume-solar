"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function HeaderShell({
  overlay: initialOverlay = false,
  className,
  children,
}: {
  overlay?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [overlay, setOverlay] = useState(initialOverlay);

  useEffect(() => {
    const target = document.querySelector("[data-header-overlay]");
    const header = ref.current;
    if (!target || !header) {
      setOverlay(false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setOverlay(entry.isIntersecting), {
      rootMargin: `-${header.offsetHeight}px 0px 0px 0px`,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref} data-overlay={overlay || undefined} className={cn("group/header", className)}>
      {children}
    </header>
  );
}
