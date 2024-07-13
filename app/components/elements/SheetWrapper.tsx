'use client';

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SideBar from "../layouts/SideBar";
import ResponsiveNav from "../layouts/ResponsiveNav";

const SheetWrapper = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu className="w-6 h-6" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ResponsiveNav closeSheet={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default SheetWrapper;
