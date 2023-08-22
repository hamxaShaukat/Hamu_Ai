import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModel } from "@/hooks/use-pro-model";

import { MAX_FREE_COUNTS } from "@/constants";
interface freeCounter {
  apiLimit: number;
}

export default function FreeCounter({ apiLimit = 0 }: freeCounter) {
  const proModel = useProModel();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimit}/{MAX_FREE_COUNTS} free generations
            </p>
            <Progress
              className="h-3"
              value={(apiLimit / MAX_FREE_COUNTS) * 100}
            />
          </div>
        </CardContent>
        <Button onClick={proModel.onOpen} className="w-full" variant="premium">
          Upgrade
          <Zap className="w-4 h-4 ml-2 fill-white"/>
        </Button>
      </Card>
    </div>
  );
}
