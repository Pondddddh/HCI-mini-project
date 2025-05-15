"use client"

import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"

type Category = "all" | "dairy" | "produce" | "meat" | "beverage" | "other"

interface CategoryFilterProps {
  selectedCategory: Category
  onChange: (category: Category) => void
}

export default function CategoryFilter({ selectedCategory, onChange }: CategoryFilterProps) {
  const categories: { value: Category; label: string; color: string }[] = [
    { value: "all", label: "All Items", color: "bg-gray-100 border-gray-300 text-gray-700" },
    { value: "dairy", label: "Dairy", color: "bg-yellow-100 border-yellow-300 text-yellow-700" },
    { value: "produce", label: "Produce", color: "bg-green-100 border-green-300 text-green-700" },
    { value: "meat", label: "Meat", color: "bg-red-100 border-red-300 text-red-700" },
    { value: "beverage", label: "Beverage", color: "bg-blue-100 border-blue-300 text-blue-700" },
    { value: "other", label: "Other", color: "bg-purple-100 border-purple-300 text-purple-700" },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant="outline"
          size="sm"
          className={`${
            selectedCategory === category.value ? `${category.color} border-2` : "bg-white"
          } transition-all`}
          onClick={() => onChange(category.value)}
        >
          {selectedCategory === category.value && <CheckIcon className="h-3 w-3 mr-1" />}
          {category.label}
        </Button>
      ))}
    </div>
  )
}
