"use client"

import { useState } from "react"
import { Plus, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Item } from "@/lib/data"
import AddItemDialog from "./add-item-dialog"
import CategoryFilter from "./category-filter"

interface FridgeVisualizationProps {
  items: Item[]
  onRemove: (id: string) => void
  onConsume: (id: string) => void
  onAdd: (item: Item) => void
}

export default function FridgeVisualization({ items, onRemove, onConsume, onAdd }: FridgeVisualizationProps) {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [addLocation, setAddLocation] = useState<"fridge" | "freezer">("fridge")
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<"all" | "dairy" | "produce" | "meat" | "beverage" | "other">(
    "all",
  )

  // Filter items by category if a category is selected
  const filteredItems = selectedCategory === "all" ? items : items.filter((item) => item.category === selectedCategory)

  const fridgeItems = filteredItems.filter((item) => item.location === "fridge")
  const freezerItems = filteredItems.filter((item) => item.location === "freezer")

  // Group items by shelf
  const getFreezerShelfItems = () => {
    return [freezerItems]
  }

  const getFridgeShelfItems = () => {
    // Divide fridge items into 3 shelves
    const totalShelves = 3
    const result: Item[][] = Array(totalShelves)
      .fill(null)
      .map(() => [])

    fridgeItems.forEach((item, index) => {
      const shelfIndex = item.shelf !== undefined ? item.shelf : index % totalShelves
      if (result[shelfIndex]) {
        result[shelfIndex].push(item)
      } else {
        result[0].push(item)
      }
    })

    return result
  }

  const handleAddItem = (location: "fridge" | "freezer") => {
    setAddLocation(location)
    setShowAddDialog(true)
  }

  const addItem = (newItem: Item) => {
    onAdd({
      ...newItem,
      location: addLocation,
    })
    setShowAddDialog(false)
  }

  const getItemColor = (category: string) => {
    switch (category) {
      case "dairy":
        return "bg-yellow-200"
      case "produce":
        return "bg-green-200"
      case "meat":
        return "bg-red-200"
      case "beverage":
        return "bg-blue-200"
      default:
        return "bg-purple-200"
    }
  }

  // Function to calculate the expiry status
  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return { status: "expired", color: "bg-red-500", percentage: 0 }
    } else if (diffDays <= 2) {
      return { status: "expiring-soon", color: "bg-orange-500", percentage: 25 }
    } else if (diffDays <= 5) {
      return { status: "expiring", color: "bg-yellow-500", percentage: 50 }
    } else if (diffDays <= 10) {
      return { status: "good", color: "bg-green-400", percentage: 75 }
    } else {
      return { status: "fresh", color: "bg-green-500", percentage: 100 }
    }
  }

  const renderShelf = (items: Item[], shelfIndex: number) => {
    return (
      <div className="relative w-full h-12 flex items-center justify-between">
        <button className="absolute left-0 text-gray-400 hover:text-gray-600">←</button>
        <div className="flex-1 mx-8 border-b-2 border-gray-300 flex items-end justify-start space-x-4 pb-1 px-2">
          {items.map((item) => {
            const expiryStatus = getExpiryStatus(item.expiryDate)
            return (
              <TooltipProvider key={item.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`${getItemColor(item.category)} h-8 w-8 rounded-md cursor-pointer overflow-hidden mb-1`}
                        onClick={() => setSelectedItem(item)}
                      >
                        {item.icon ? (
                          <img
                            src={item.icon || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full"></div>
                        )}
                        {item.quantity > 1 && (
                          <span className="absolute -bottom-3 right-0 text-xs bg-white rounded-full px-1 border border-gray-300 shadow-sm">
                            x{item.quantity}
                          </span>
                        )}
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${expiryStatus.color}`}
                          style={{ width: `${expiryStatus.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p>Expires: {new Date(item.expiryDate).toLocaleDateString()}</p>
                      <p className="text-sm capitalize">{expiryStatus.status.replace("-", " ")}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </div>
        <button className="absolute right-0 text-gray-400 hover:text-gray-600">→</button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <h3 className="font-medium mb-2">Filter by Category</h3>
        <CategoryFilter selectedCategory={selectedCategory} onChange={setSelectedCategory} />
      </div>

      {/* Freezer */}
      <div className="relative border-4 border-blue-200 rounded-lg p-4 bg-gray-100">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">Freezer</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleAddItem("freezer")}
            className="h-6 w-6 absolute top-2 right-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {getFreezerShelfItems().map((shelfItems, index) => (
            <div key={`freezer-shelf-${index}`}>{renderShelf(shelfItems, index)}</div>
          ))}
        </div>
      </div>

      {/* Fridge */}
      <div className="relative border-4 border-gray-300 rounded-lg p-4 bg-gray-100">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">Fridge</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleAddItem("fridge")}
            className="h-6 w-6 absolute top-2 right-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {getFridgeShelfItems().map((shelfItems, index) => (
            <div key={`fridge-shelf-${index}`}>{renderShelf(shelfItems, index)}</div>
          ))}
        </div>
      </div>

      {/* Add Item Dialog */}
      <AddItemDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={addItem}
        defaultLocation={addLocation}
      />

      {/* Item Detail Dialog */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedItem.name}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center mb-4">
              <div className="h-32 w-32 rounded-md overflow-hidden mb-4">
                {selectedItem.icon ? (
                  <img
                    src={selectedItem.icon || "/placeholder.svg"}
                    alt={selectedItem.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div
                    className={`${getItemColor(selectedItem.category)} h-full w-full flex items-center justify-center`}
                  >
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Category:</span>
                <span className="capitalize">{selectedItem.category}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Location:</span>
                <span className="capitalize">{selectedItem.location}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <span>{selectedItem.quantity}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Added Date:</span>
                <span>{new Date(selectedItem.addedDate).toLocaleDateString()}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Expiry Date:</span>
                <span>{new Date(selectedItem.expiryDate).toLocaleDateString()}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-medium">Expiry Status:</span>
                <div className="flex items-center">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                    <div
                      className={`h-full ${getExpiryStatus(selectedItem.expiryDate).color}`}
                      style={{ width: `${getExpiryStatus(selectedItem.expiryDate).percentage}%` }}
                    ></div>
                  </div>
                  <span className="capitalize">
                    {getExpiryStatus(selectedItem.expiryDate).status.replace("-", " ")}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onConsume(selectedItem.id)}>
                Consume
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onRemove(selectedItem.id)
                  setSelectedItem(null)
                }}
              >
                Remove
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
