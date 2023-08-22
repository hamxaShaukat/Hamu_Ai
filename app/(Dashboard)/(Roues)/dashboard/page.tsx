"use client";
import { Card } from "@/components/ui/card";
import {cn} from "@/lib/utils"
import {useRouter} from"next/navigation"

import {
  ImageIcon,
  ArrowRight,
  MessageSquare,
  VideoIcon,
  Music,
  Code,
  Settings
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
      href:"/conversation",
      color: "text-red-700",
      bgColor:"bg-red-700/10"

  },
  {
      label:"Image Generation",
      icon:ImageIcon,
      href:"/image",
      color: "text-violet-700",
      bgColor:"bg-violet-700/10"

  },
  {
      label:"Video Generation",
      icon:VideoIcon,
      href:"/video",
      color: "text-pink-700",
      bgColor:"bg-pink-700/10"

  },
  {
      label:"Music Generation",
      icon:Music,
      href:"/music",
      color: "text-orange-700",
      bgColor:"bg-orange-700/10"
  },
  {
      label:"Code Generation",
      icon:Code,
      href:"/code",
      color: "text-emerald-700",
      bgColor:"bg-emerald-700/10"
  },
  {
      label:"Settings",
      icon:Settings,
      href:"/settings",
  },
]


export default function Home() {
  const router=useRouter()
  return (
    <>
    <div className="mb-8 space-y-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Explore the Power of AI
      </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI -Experience the power of AI.
        </p>
    </div>
    <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
          onClick={()=>router.push(tool.href)}
          key={tool.href}
          className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8 ",tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5"/>
          </Card>
        ))}
    </div>
    </>
  )
}

