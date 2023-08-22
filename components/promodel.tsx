"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle , DialogDescription,DialogFooter } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useProModel } from "@/hooks/use-pro-model";

import {cn} from "@/lib/utils"

import {
  ImageIcon,
  MessageSquare,
  VideoIcon,
  Music,
  Code,
  Check,
  Zap
} from "lucide-react"

const tools=[
  // {
  //     label:"Dashboard",
  //     icon:LayoutDashboard,
  //     href:"/dashboard",
  //     color: "text-sky-500",
  //     bgColor:"bg"
  // },
  {
      label:"Conversation",
      icon:MessageSquare,
      color: "text-red-600",
      bgColor:"bg-red-600/10"

  },
  {
      label:"Image Generation",
      icon:ImageIcon,
      color: "text-violet-600",
      bgColor:"bg-violet-600/10"
  },
  {
      label:"Video Generation",
      icon:VideoIcon,
      color: "text-pink-600",
      bgColor:"bg-pink-600/10"
  },
  {
      label:"Music Generation",
      icon:Music,
      color: "text-orange-600",
      bgColor:"bg-orange-600/10"
  },
  {
      label:"Code Generation",
      icon:Code,
      color: "text-emerald-500",
      bgColor:"bg-emerald-600/10"
  },
]




export default function ProModel() {
  const proModel = useProModel();
  return (
    <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-4">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Hamu AI
              <Badge variant="premium" className="uppercase text-sm py-1">Pro</Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool)=>(
              <Card
              key={tool.label}
              className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md",tool.bgColor )}>
                  <tool.icon className={cn("w-6 h-6", tool.color)} />
                  <div className="font-semibold text-sm">
                    {tool.label}
                  </div>
                </div>
                </div>
                <Check className="text-primary w-5 h-5"/>
              </Card>
            ))}

          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="">
              <Button
              size="lg"
              variant="premium"
              className="w-full"
              >
                Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white"/>
              </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
