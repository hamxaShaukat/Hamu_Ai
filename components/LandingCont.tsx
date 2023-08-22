"use client"
import {Montserrat} from "next/font/google"
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils"
import {useAuth}from "@clerk/nextjs"
import {Card,CardHeader,CardTitle,CardContent }from "./ui/card"

const testimonials = [
    {
        name:"Hamza",
        avatar:"H",
        title:"Cyber Security Analyst",
        description:"This is the best application for generation."
    },
    {
        name:"Hamza",
        avatar:"H",
        title:"Cyber Security Analyst",
        description:"This is the best application for generation."
    },
    {
        name:"Hamza",
        avatar:"H",
        title:"Cyber Security Analyst",
        description:"This is the best application for generation."
    },
    {
        name:"Hamza",
        avatar:"H",
        title:"Cyber Security Analyst",
        description:"This is the best application for generation."
    },
]
export default function LandContent(){
    return(
        <div className="px-10 pb-20"><h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {testimonials.map((item)=>(
                <Card
                key={item.description}
                className="bg-[#26431d] border-none text-white"
                >
                    <CardHeader>
                        <CardTitle className="flex items-centergap-x-2">
                            <div>
                                <p className="text-lg">{item.name}</p>
                                <p className="text-zinc-400 text-sm">{item.title}</p>
                            </div>

                        </CardTitle>
                        <CardContent className="pt-4 px-0">
                            {item.description}
                        </CardContent>
                    </CardHeader>
                </Card>

            ))}
        </div>
        </div>
    )

}