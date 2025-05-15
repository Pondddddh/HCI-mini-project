"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Check, Search, Snowflake, ImageIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Item } from "@/lib/data"
import CategoryFilter from "./category-filter"

interface ItemListProps {
  items: Item[]
  onRemove: (id: string) => void
  onConsume: (id: string) => void
}

export default function ItemList({ items, onRemove, onConsume }: ItemListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"all" | "dairy" | "produce" | "meat" | "beverage" | "other">(
    "all",
  )

  // Apply both search and category filters
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return {
        status: "expired",
        badge: <Badge variant="destructive">Expired</Badge>,
        color: "bg-red-500",
        percentage: 0,
      }
    } else if (diffDays <= 2) {
      return {
        status: "expiring soon",
        badge: (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            Expiring Soon
          </Badge>
        ),
        color: "bg-orange-500",
        percentage: 25,
      }
    } else if (diffDays <= 5) {
      return {
        status: "expiring",
        badge: (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Expiring
          </Badge>
        ),
        color: "bg-yellow-500",
        percentage: 50,
      }
    } else if (diffDays <= 10) {
      return {
        status: "good",
        badge: (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Good
          </Badge>
        ),
        color: "bg-green-400",
        percentage: 75,
      }
    } else {
      return {
        status: "fresh",
        badge: (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Fresh
          </Badge>
        ),
        color: "bg-green-500",
        percentage: 100,
      }
    }
  }

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

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium mb-2">Filter by Category</h3>
            <CategoryFilter selectedCategory={selectedCategory} onChange={setSelectedCategory} />
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No items found. Try adjusting your filters or add some items to your refrigerator!
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Shelf</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => {
                const { badge, color, percentage } = getExpiryStatus(item.expiryDate)
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="h-8 w-8 rounded-md overflow-hidden">
                        {item.icon ? (
                          <img
                            src={item.icon || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div
                            className={`${getItemColor(item.category)} h-full w-full flex items-center justify-center`}
                          >
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="capitalize">{item.category}</TableCell>
                    <TableCell>
                      {item.location === "freezer" ? (
                        <div className="flex items-center">
                          <Snowflake className="h-4 w-4 mr-1 text-blue-500" />
                          <span>Freezer</span>
                        </div>
                      ) : (
                        "Refrigerator"
                      )}
                    </TableCell>
                    <TableCell>{getShelfName(item.location, item.shelf)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{new Date(item.expiryDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
                        </div>
                        {badge}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onConsume(item.id)}
                          title="Mark as consumed"
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => onRemove(item.id)} title="Remove item">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
