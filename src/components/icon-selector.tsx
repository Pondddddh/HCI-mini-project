"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { foodIcons } from "@/lib/data"

interface IconSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (icon: string) => void
  selectedIcon?: string
}

export default function IconSelector({ open, onOpenChange, onSelect, selectedIcon }: IconSelectorProps) {
  const [selected, setSelected] = useState(selectedIcon || foodIcons.default)

  const handleSelect = (icon: string) => {
    setSelected(icon)
  }

  const handleConfirm = () => {
    onSelect(selected)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select an Icon</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] p-4">
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(foodIcons).map(([key, icon]) => (
              <Button
                key={key}
                variant="outline"
                className={`h-20 w-20 p-2 ${selected === icon ? "ring-2 ring-primary" : ""}`}
                onClick={() => handleSelect(icon)}
              >
                <img src={icon || "/placeholder.svg"} alt={key} className="h-full w-full object-contain" />
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
