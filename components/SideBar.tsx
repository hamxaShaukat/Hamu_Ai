
"use client";
import Link from "next/link";
import Image from "next/image";
import {Montserrat} from 'next/font/google'
import {usePathname} from 'next/navigation'
import FreeCounter from "./Freecounter"
import {cn} from "@/lib/utils"
import {
    ImageIcon,
    LayoutDashboard,
    MessageSquare,
    VideoIcon,
    Music,
    Code,
    Settings
} from "lucide-react"

const montserrat = Montserrat({
    weight:"600",
    subsets: ["latin"]
});

const routes=[
    {
        label:"Dashboard",
        icon:LayoutDashboard,
        href:"/dashboard",
        color: "text-sky-500",
    },
    {
        label:"Conversation",
        icon:MessageSquare,
        href:"/conversation",
        color: "text-red-600",
    },
    {
        label:"Image Generation",
        icon:ImageIcon,
        href:"/image",
        color: "text-violet-600",
    },
    {
        label:"Video Generation",
        icon:VideoIcon,
        href:"/video",
        color: "text-pink-600",
    },
    {
        label:"Music Generation",
        icon:Music,
        href:"/music",
        color: "text-orange-600",
    },
    {
        label:"Code Generation",
        icon:Code,
        href:"/code",
        color: "text-emerald-500",
    },
    {
        label:"Settings",
        icon:Settings,
        href:"/settings",
        // color: "text-emerald-500",
    },
]

interface SidebarProps{
    apiLimit:number
}

export default function Sidebar({apiLimit=0}:SidebarProps){
    const pathName=usePathname();
    return(
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#162711] text-white">
           <div className="px-3 py-2 flex-1">
            <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                <div className="relative w-8 h-8 mr-4">
                    <Image
                    fill
                    alt="my logo"
                    src="/logo.png"
                    />
                </div>
                <h1 className={cn("text-2xl font-bold",montserrat.className)}>Hamu AI</h1>
            </Link>
            <div className="space-y-1">
                {routes.map((route,index)=>{
                    return(
                        <Link
                        href={route.href}
                        key={route.href}
                        className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                        pathName===route.href ? "text-white bg-white/10":"text-zinc-400"
                        )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-6 w-4 mr-3",route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    )
                })}
            </div>
           </div>
           <FreeCounter
           apiLimit={apiLimit}
           />
        </div>
    );
}