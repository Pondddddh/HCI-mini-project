"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Award, Calendar, Heart, Utensils } from "lucide-react"
import Link from "next/link"

export default function NTaoPage() {
  const [happiness, setHappiness] = useState(50)
  

  const handlePet = () => {
    setHappiness((prev) => Math.min(prev + 5, 100))
  }

  const handleFeed = () => {
  
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">N'Tao</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Your Pet</CardTitle>
              <CardDescription>Take care of N'Tao</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="relative w-96 h-96 bg-mint-100 rounded-full flex items-center justify-center mb-4">
                  <img
                    src={ happiness <= 30 ? "/angry.png" : happiness >= 70 ? "/happy.png" : "/default.png" }
                    alt="N'Tao character"
                    className="h-full object-contain"
                  />
                </div>

                <div className="w-full space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Happiness</span>
                    <span>{happiness}%</span>
                  </div>
                  <Progress value={happiness} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <Button variant="outline" onClick={handlePet}>
                    Pet
                  </Button>
                  <Button variant="outline" onClick={handlePet}>
                    Eat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="health" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="health" className="flex-1">
                <Heart className="h-4 w-4 mr-2" /> Health Tracking
              </TabsTrigger>
              <TabsTrigger value="goals" className="flex-1">
                <Award className="h-4 w-4 mr-2" /> Goals
              </TabsTrigger>
              <TabsTrigger value="meals" className="flex-1">
                <Utensils className="h-4 w-4 mr-2" /> Meal History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="health" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Health Overview</CardTitle>
                  <CardDescription>Track your health metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Daily Activity</h3>
                      <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                        Activity chart placeholder
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Nutrition Balance</h3>
                      <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                        Nutrition chart placeholder
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Goals</CardTitle>
                  <CardDescription>Track your progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">Eat more vegetables</h3>
                        <span className="text-sm text-muted-foreground">3/5 days</span>
                      </div>
                      <Progress value={60} className="h-2 mb-2" />
                      <p className="text-sm text-muted-foreground">Goal: 5 days of vegetable consumption</p>
                    </div>

                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">Reduce food waste</h3>
                        <span className="text-sm text-muted-foreground">90%</span>
                      </div>
                      <Progress value={90} className="h-2 mb-2" />
                      <p className="text-sm text-muted-foreground">Goal: Use 95% of food before expiry</p>
                    </div>

                    <Button className="w-full">Add New Goal</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="meals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Meal History</CardTitle>
                  <CardDescription>Track what you've been eating</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 border rounded-md">
                      <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Vegetable Stir Fry</h3>
                        <p className="text-sm text-muted-foreground">Today, 6:30 PM</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 border rounded-md">
                      <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Cheese Omelette</h3>
                        <p className="text-sm text-muted-foreground">Today, 8:00 AM</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 border rounded-md">
                      <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Chicken Salad</h3>
                        <p className="text-sm text-muted-foreground">Yesterday, 12:30 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
