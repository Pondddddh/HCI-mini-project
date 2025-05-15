"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ImageIcon } from "lucide-react"
import type { Item } from "@/lib/data"
import { foodIcons } from "@/lib/data"
import IconSelector from "./icon-selector"

interface AddItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (item: Item) => void
  defaultLocation?: "fridge" | "freezer"
}

export default function AddItemDialog({ open, onOpenChange, onAdd, defaultLocation = "fridge" }: AddItemDialogProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("other")
  const [location, setLocation] = useState(defaultLocation)
  const [quantity, setQuantity] = useState(1)
  const [shelf, setShelf] = useState<number>(0)
  const [expiryDate, setExpiryDate] = useState("")
  const [icon, setIcon] = useState(foodIcons.default)
  const [showIconSelector, setShowIconSelector] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !expiryDate) return

    const newItem: Item = {
      id: "", // Will be set by parent component
      name,
      category: category as "dairy" | "produce" | "meat" | "beverage" | "other",
      location: location as "fridge" | "freezer",
      shelf,
      quantity,
      addedDate: new Date().toISOString(),
      expiryDate: new Date(expiryDate).toISOString(),
      icon,
    }

    onAdd(newItem)
    resetForm()
  }

  const resetForm = () => {
    setName("")
    setCategory("other")
    setLocation(defaultLocation)
    setQuantity(1)
    setShelf(0)
    setExpiryDate("")
    setIcon(foodIcons.default)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="flex justify-center mb-2">
                <Button
                  type="button"
                  variant="outline"
                  className="h-24 w-24 p-2 rounded-md"
                  onClick={() => setShowIconSelector(true)}
                >
                  {icon ? (
                    <img src={icon || "/placeholder.svg"} alt="Food icon" className="h-full w-full object-contain" />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="col-span-3" id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="produce">Produce</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="beverage">Beverage</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Location</Label>
                <RadioGroup value={location} onValueChange={setLocation} className="col-span-3 flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fridge" id="fridge" />
                    <Label htmlFor="fridge">Refrigerator</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="freezer" id="freezer" />
                    <Label htmlFor="freezer">Freezer</Label>
                  </div>
                </RadioGroup>
              </div>

              {location === "fridge" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="shelf" className="text-right">
                    Shelf
                  </Label>
                  <Select value={shelf.toString()} onValueChange={(value) => setShelf(Number.parseInt(value))}>
                    <SelectTrigger className="col-span-3" id="shelf">
                      <SelectValue placeholder="Select shelf" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Top Shelf</SelectItem>
                      <SelectItem value="1">Middle Shelf</SelectItem>
                      <SelectItem value="2">Bottom Shelf</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expiryDate" className="text-right">
                  Expiry Date
                </Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="col-span-3"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Item</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <IconSelector open={showIconSelector} onOpenChange={setShowIconSelector} onSelect={setIcon} selectedIcon={icon} />
    </>
  )
}
