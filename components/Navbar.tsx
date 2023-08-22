// import {Button} from "./ui/button"
// import {Menu} from "lucide-react"
import {UserButton} from"@clerk/nextjs"
import MobileSidebar from"./mobile-sidebar"
import {GetApiCount} from "@/lib/api_limit"


export default async function Navbar(){
    const apiLimit = await GetApiCount();
    return(
        <div className="flex items-center p-4">
            <MobileSidebar apiLimit={apiLimit}/>
            <div className="flex w-full justify-end">
            <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    );
}