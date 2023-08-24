"use client";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import Sidebar from "@/components/SideBar";
import { useEffect, useState } from "react";

export default function MobileSidebar() {
  const [isMounted, setIsmount] = useState(false);
  useEffect(() => {
    setIsmount(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
