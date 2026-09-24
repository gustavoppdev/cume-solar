"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { MobileMenuSheet as MobileMenuSheetComponent } from "./mobile-menu-sheet";

const loadSheet = () => import("./mobile-menu-sheet").then((m) => m.MobileMenuSheet);

export function MobileMenu({ cta }: { cta: React.ReactNode }) {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const [Sheet, setSheet] = useState<typeof MobileMenuSheetComponent | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // The sheet mounts closed and opens on the next frame, so its enter transition
  // runs on the first open too, not only once the chunk is already mounted.
  const openMenu = async () => {
    if (!Sheet) {
      const loaded = await loadSheet();
      setSheet(() => loaded);
      requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon-lg"
        className="size-11 lg:hidden"
        aria-expanded={open}
        aria-haspopup="dialog"
        onPointerEnter={() => void loadSheet()}
        onPointerDown={() => void loadSheet()}
        onClick={() => void openMenu()}
      >
        <Menu aria-hidden className="size-5" />
        <span className="sr-only">{t("openMenu")}</span>
      </Button>
      {Sheet && <Sheet open={open} onOpenChange={setOpen} returnFocus={triggerRef} cta={cta} />}
    </>
  );
}
