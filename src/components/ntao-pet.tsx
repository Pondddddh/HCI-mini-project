"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Settings, X } from "lucide-react"

interface NTaoPetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function NTaoPet({ open, onOpenChange }: NTaoPetProps) {
  const [health, setHealth] = useState(80)
  const [happiness, setHappiness] = useState(70)
  const [energy, setEnergy] = useState(60)
  const [activeTab, setActiveTab] = useState("pet")

  const handlePet = () => {
    setHappiness((prev) => Math.min(prev + 5, 100))
  }

  const handleFeed = () => {
    setEnergy((prev) => Math.min(prev + 10, 100))
    setHealth((prev) => Math.min(prev + 3, 100))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[350px] p-0 overflow-hidden">
        <div className="bg-purple-100 p-2 flex justify-between items-center">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-purple-200">
            <Settings className="h-4 w-4" />
          </Button>
          <DialogTitle className="text-center">N'Tao</DialogTitle>
          <DialogClose className="h-8 w-8 rounded-full">
            <X className="h-4 w-4" />
          </DialogClose>
        </div>

        <div className="p-4 flex flex-col items-center">
          <div className="relative w-48 h-48 bg-mint-100 rounded-full flex items-center justify-center mb-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LN4vKnDTse5109uGnhCXnj7YicEvWR.png"
              alt="N'Tao character"
              className="h-full object-contain"
            />
          </div>

          <div className="w-full space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Health</span>
              <span>{health}%</span>
            </div>
            <Progress value={health} className="h-2" />

            <div className="flex justify-between text-sm">
              <span>Happiness</span>
              <span>{happiness}%</span>
            </div>
            <Progress value={happiness} className="h-2" />

            <div className="flex justify-between text-sm">
              <span>Energy</span>
              <span>{energy}%</span>
            </div>
            <Progress value={energy} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <Button variant="outline" onClick={handlePet}>
              Pet
            </Button>
            <Button variant="outline" onClick={handleFeed}>
              Eat
            </Button>
            <Button variant="outline">Set goal</Button>
            <Button variant="outline">History</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
