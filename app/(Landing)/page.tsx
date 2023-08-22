import { Button } from "../../components/ui/button";
import Link from "next/link";
import LandNav from"@/components/LandingNavbar"
import LandHero from"@/components/LandingHero"
import LandContent from"@/components/LandingCont"

export default function Home() {
  return (
    <div className="h-full">
      <LandNav />
      <LandHero />
      <LandContent />
    </div>
  )
}
