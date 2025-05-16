"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, List, UtensilsCrossed } from "lucide-react"
import ItemList from "./item-list"
import FridgeVisualization from "./fridge-visualization"
import NotificationsDialog from "./notifications-dialog"
import RecipeSuggestion from "./recipe-suggestion"
import NTaoPet from "./ntao-pet"
import { type Item, mockItems } from "@/lib/data"
import Link from "next/link"

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showRecipeSuggestion, setShowRecipeSuggestion] = useState(false)
  const [showNTaoPet, setShowNTaoPet] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)
  const [viewMode, setViewMode] = useState<"visual" | "list">("visual")

  // Initialize with mock data
  useEffect(() => {
    setItems(mockItems)
  }, [])

  // Calculate expiring items for notification badge
  useEffect(() => {
    const today = new Date()
    const expiringCount = items.filter((item) => {
      const expiryDate = new Date(item.expiryDate)
      const diffTime = expiryDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 3 && diffDays >= 0
    }).length

    setNotificationCount(expiringCount)
  }, [items])

  const addItem = (newItem: Item) => {
    setItems((prev) => [...prev, { ...newItem, id: Date.now().toString() }])
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const consumeItem = (id: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id)
      if (!item || item.quantity <= 1) {
        return prev.filter((i) => i.id !== id)
      }

      return prev.map((i) => {
        if (i.id === id) {
          return { ...i, quantity: i.quantity - 1 }
        }
        return i
      })
    })
  }

  const fridgeItems = items.filter((item) => item.location === "fridge")
  const freezerItems = items.filter((item) => item.location === "freezer")

  // Count items by category
  const getCategoryCounts = () => {
    const counts = {
      dairy: 0,
      produce: 0,
      meat: 0,
      beverage: 0,
      other: 0,
    }

    items.forEach((item) => {
      if (counts[item.category as keyof typeof counts] !== undefined) {
        counts[item.category as keyof typeof counts] += item.quantity
      }
    })

    return counts
  }

  const categoryCounts = getCategoryCounts()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Refrigerator</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setShowNotifications(true)} className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                {notificationCount}
              </Badge>
            )}
          </Button>
          <Button variant="outline" onClick={() => setViewMode(viewMode === "visual" ? "list" : "visual")}>
            <List className="h-4 w-4 mr-2" />
            {viewMode === "visual" ? "List View" : "Visual View"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Items</CardTitle>
            <CardDescription>All items count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{items.reduce((acc, item) => acc + item.quantity, 0)}</div>
            <div className="mt-2 text-sm text-muted-foreground">
              <span className="inline-block px-2 py-1 mr-1 bg-yellow-100 rounded-md">{categoryCounts.dairy} dairy</span>
              <span className="inline-block px-2 py-1 mr-1 bg-green-100 rounded-md">
                {categoryCounts.produce} produce
              </span>
              <span className="inline-block px-2 py-1 mr-1 bg-red-100 rounded-md">{categoryCounts.meat} meat</span>
              <span className="inline-block px-2 py-1 mr-1 bg-blue-100 rounded-md">
                {categoryCounts.beverage} beverage
              </span>
              <span className="inline-block px-2 py-1 bg-purple-100 rounded-md">{categoryCounts.other} other</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Refrigerator</CardTitle>
            <CardDescription>Items in fridge</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{fridgeItems.reduce((acc, item) => acc + item.quantity, 0)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Freezer</CardTitle>
            <CardDescription>Items in freezer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{freezerItems.reduce((acc, item) => acc + item.quantity, 0)}</div>
          </CardContent>
        </Card>
      </div>

      {viewMode === "visual" ? (
        <FridgeVisualization items={items} onRemove={removeItem} onConsume={consumeItem} onAdd={addItem} />
      ) : (
        <ItemList items={items} onRemove={removeItem} onConsume={consumeItem} />
      )}

      <NotificationsDialog
        open={showNotifications}
        onOpenChange={setShowNotifications}
        items={items.filter((item) => {
          const expiryDate = new Date(item.expiryDate)
          const today = new Date()
          const diffTime = expiryDate.getTime() - today.getTime()
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          return diffDays <= 3
        })}
        onConsume={consumeItem}
      />

      <RecipeSuggestion 
        onOpenChange={setShowRecipeSuggestion} 
        open={showRecipeSuggestion}
        items={items}
        />

       {/* Buttons for menu suggestion and N'Tao */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="border-blue-300 text-blue-600 hover:bg-blue-50"
          onClick={() => setShowRecipeSuggestion(true)}
        >
          <UtensilsCrossed className="h-4 w-4 mr-2" />
          Suggest menu
        </Button>
        <Link href="/ntao">
          <Button 
          variant="outline" 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800">
            N'Tao
            <span className="ml-1">🐢</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
