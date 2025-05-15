"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, AlertTriangle, AlertCircle, Trash2, Snowflake } from "lucide-react"
import type { Item } from "@/lib/data"

interface NotificationsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: Item[]
  onConsume: (id: string) => void
}

export default function NotificationsDialog({ open, onOpenChange, items, onConsume }: NotificationsDialogProps) {
  const today = new Date()

  const expiredItems = items.filter((item) => new Date(item.expiryDate) < today)
  const expiringItems = items.filter((item) => {
    const expiryDate = new Date(item.expiryDate)
    return expiryDate >= today && expiryDate <= new Date(today.setDate(today.getDate() + 3))
  })

  const getShelfName = (location: string, shelf?: number) => {
    if (location === "freezer") return "Freezer Shelf"

    switch (shelf) {
      case 0:
        return "Top Shelf"
      case 1:
        return "Middle Shelf"
      case 2:
        return "Bottom Shelf"
      default:
        return "Unknown Shelf"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Expiration Notifications</DialogTitle>
          <DialogDescription>Items that are expiring soon or already expired</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto py-4">
          {expiredItems.length > 0 && (
            <div>
              <h3 className="font-semibold text-red-500 flex items-center mb-2">
                <AlertCircle className="h-4 w-4 mr-2" />
                Expired Items
              </h3>
              <div className="space-y-2">
                {expiredItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 border rounded-md bg-red-50">
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium">{item.name}</p>
                        {item.location === "freezer" && <Snowflake className="h-4 w-4 ml-1 text-blue-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Expired on {new Date(item.expiryDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {item.category} • {getShelfName(item.location, item.shelf)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => onConsume(item.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {expiringItems.length > 0 && (
            <div>
              <h3 className="font-semibold text-amber-500 flex items-center mb-2">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Expiring Soon
              </h3>
              <div className="space-y-2">
                {expiringItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 border rounded-md bg-amber-50">
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium">{item.name}</p>
                        {item.location === "freezer" && <Snowflake className="h-4 w-4 ml-1 text-blue-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Expires on {new Date(item.expiryDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {item.category} • {getShelfName(item.location, item.shelf)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => onConsume(item.id)} className="text-green-600">
                      <Check className="h-4 w-4 mr-2" />
                      Consumed
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {items.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No expiring items. Your refrigerator is in good shape!
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
