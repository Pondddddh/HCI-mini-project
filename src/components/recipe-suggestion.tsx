"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Utensils, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import type { Item } from "@/lib/data"

interface RecipeSuggestionProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: Item[]
}

// Mock recipe data
const mockRecipes = [
  {
    id: "1",
    name: "Vegetable Stir Fry",
    description: "A quick and healthy stir fry using vegetables from your fridge",
    ingredients: ["carrot", "lettuce", "chicken breast"],
    cookingTime: "20 mins",
    difficulty: "Easy",
    image: "/placeholder.svg?height=200&width=300&text=Stir+Fry",
  },
  {
    id: "2",
    name: "Cheese Omelette",
    description: "Simple and delicious breakfast option",
    ingredients: ["eggs", "cheese", "milk"],
    cookingTime: "10 mins",
    difficulty: "Easy",
    image: "/placeholder.svg?height=200&width=300&text=Omelette",
  },
  {
    id: "3",
    name: "Chicken Salad",
    description: "Fresh and nutritious salad with chicken",
    ingredients: ["chicken breast", "lettuce", "tomato"],
    cookingTime: "15 mins",
    difficulty: "Easy",
    image: "/placeholder.svg?height=200&width=300&text=Chicken+Salad",
  },
]

export default function RecipeSuggestion({ open, onOpenChange, items }: RecipeSuggestionProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<(typeof mockRecipes)[0] | null>(null)

  // Function to check if we have the ingredients for a recipe
  const checkIngredients = (recipe: (typeof mockRecipes)[0]) => {
    const itemNames = items.map((item) => item.name.toLowerCase())
    const missingIngredients = recipe.ingredients.filter(
      (ingredient) => !itemNames.some((name) => name.includes(ingredient.toLowerCase())),
    )
    return {
      canMake: missingIngredients.length === 0,
      missingIngredients,
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Recipe Suggestions</DialogTitle>
          <DialogDescription>
            Here are some recipe suggestions based on the items in your refrigerator
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="all" className="mt-4">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Recipes</TabsTrigger>
            <TabsTrigger value="available">Can Make Now</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockRecipes.map((recipe) => {
                const { canMake, missingIngredients } = checkIngredients(recipe)
                return (
                  <Card key={recipe.id} className="overflow-hidden">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{recipe.name}</CardTitle>
                        {canMake ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Can Make
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">
                            <AlertCircle className="h-3 w-3 mr-1" /> Missing Items
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{recipe.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{recipe.cookingTime}</span>
                        <span className="mx-2">•</span>
                        <Utensils className="h-4 w-4 mr-1" />
                        <span>{recipe.difficulty}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => setSelectedRecipe(recipe)}>
                        View Recipe
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="available" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockRecipes
                .filter((recipe) => checkIngredients(recipe).canMake)
                .map((recipe) => (
                  <Card key={recipe.id} className="overflow-hidden">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{recipe.name}</CardTitle>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> Can Make
                        </Badge>
                      </div>
                      <CardDescription>{recipe.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{recipe.cookingTime}</span>
                        <span className="mx-2">•</span>
                        <Utensils className="h-4 w-4 mr-1" />
                        <span>{recipe.difficulty}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => setSelectedRecipe(recipe)}>
                        View Recipe
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              {mockRecipes.filter((recipe) => checkIngredients(recipe).canMake).length === 0 && (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  No recipes available with your current ingredients.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {selectedRecipe && (
          <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{selectedRecipe.name}</DialogTitle>
              </DialogHeader>
              <div className="h-48 overflow-hidden rounded-md mb-4">
                <img
                  src={selectedRecipe.image || "/placeholder.svg"}
                  alt={selectedRecipe.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p>{selectedRecipe.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Ingredients</h3>
                  <ul className="list-disc pl-5">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="capitalize">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Instructions</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{selectedRecipe.cookingTime}</span>
                  <span className="mx-2">•</span>
                  <Utensils className="h-4 w-4 mr-1" />
                  <span>{selectedRecipe.difficulty}</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  )
}
