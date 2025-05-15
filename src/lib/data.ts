export interface Item {
  id: string
  name: string
  category: "dairy" | "produce" | "meat" | "beverage" | "other"
  location: "fridge" | "freezer"
  shelf?: number // 0, 1, or 2 for fridge; 0 for freezer
  quantity: number
  addedDate: string
  expiryDate: string
  icon?: string // URL or identifier for the icon
}

// Generate dates relative to today
const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)
const twoDaysAgo = new Date(today)
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
const inTwoDays = new Date(today)
inTwoDays.setDate(inTwoDays.getDate() + 2)
const inFiveDays = new Date(today)
inFiveDays.setDate(inFiveDays.getDate() + 5)
const inTenDays = new Date(today)
inTenDays.setDate(inTenDays.getDate() + 10)

// Predefined food icons
export const foodIcons = {
  milk: "/milk.png",
  cheese: "/cheese.png",
  yogurt: "/placeholder.svg?height=100&width=80&text=🥄",
  eggs: "/egg.png",
  butter: "/placeholder.svg?height=100&width=80&text=🧈",
  chicken: "/chicken.png",
  beef: "/meat2.png",
  fish: "/placeholder.svg?height=100&width=80&text=🐟",
  apple: "/apple.png",
  banana: "/placeholder.svg?height=100&width=80&text=🍌",
  orange: "/placeholder.svg?height=100&width=80&text=🍊",
  carrot: "/carrot.png",
  lettuce: "/lettuce.png",
  tomato: "/placeholder.svg?height=100&width=80&text=🍅",
  bread: "/bread.png",
  pizza: "/placeholder.svg?height=100&width=80&text=🍕",
  water: "/placeholder.svg?height=100&width=80&text=💧",
  juice: "/placeholder.svg?height=100&width=80&text=🧃",
  soda: "/placeholder.svg?height=100&width=80&text=🥤",
  default: "/placeholder.svg?height=100&width=80&text=🍽️",
}

export const mockItems: Item[] = [
  {
    id: "1",
    name: "Milk",
    category: "beverage",
    location: "fridge",
    shelf: 0,
    quantity: 1,
    addedDate: twoDaysAgo.toISOString(),
    expiryDate: inTwoDays.toISOString(),
    icon: foodIcons.milk,
  },
  {
    id: "2",
    name: "Cheese",
    category: "dairy",
    location: "fridge",
    shelf: 1,
    quantity: 2,
    addedDate: yesterday.toISOString(),
    expiryDate: inTenDays.toISOString(),
    icon: foodIcons.cheese,
  },
  {
    id: "3",
    name: "Lettuce",
    category: "produce",
    location: "fridge",
    shelf: 1,
    quantity: 1,
    addedDate: yesterday.toISOString(),
    expiryDate: tomorrow.toISOString(),
    icon: foodIcons.lettuce,
  },
  {
    id: "4",
    name: "Chicken Breast",
    category: "meat",
    location: "freezer",
    shelf: 0,
    quantity: 1,
    addedDate: twoDaysAgo.toISOString(),
    expiryDate: inTenDays.toISOString(),
    icon: foodIcons.chicken,
  },
  {
    id: "5",
    name: "Carrot",
    category: "produce",
    location: "fridge",
    shelf: 2,
    quantity: 1,
    addedDate: twoDaysAgo.toISOString(),
    expiryDate: inFiveDays.toISOString(),
    icon: foodIcons.carrot,
  },
  {
    id: "6",
    name: "Ground Beef",
    category: "meat",
    location: "freezer",
    shelf: 0,
    quantity: 2,
    addedDate: yesterday.toISOString(),
    expiryDate: inTenDays.toISOString(),
    icon: foodIcons.beef,
  },
  {
    id: "7",
    name: "Yogurt",
    category: "dairy",
    location: "fridge",
    shelf: 0,
    quantity: 3,
    addedDate: yesterday.toISOString(),
    expiryDate: inFiveDays.toISOString(),
    icon: foodIcons.yogurt,
  },
  {
    id: "8",
    name: "Orange Juice",
    category: "beverage",
    location: "fridge",
    shelf: 0,
    quantity: 1,
    addedDate: twoDaysAgo.toISOString(),
    expiryDate: inFiveDays.toISOString(),
    icon: foodIcons.juice,
  },
  {
    id: "9",
    name: "Frozen Pizza",
    category: "other",
    location: "freezer",
    shelf: 0,
    quantity: 1,
    addedDate: yesterday.toISOString(),
    expiryDate: inTenDays.toISOString(),
    icon: foodIcons.pizza,
  },
  {
    id: "10",
    name: "Apples",
    category: "produce",
    location: "fridge",
    shelf: 2,
    quantity: 4,
    addedDate: yesterday.toISOString(),
    expiryDate: inFiveDays.toISOString(),
    icon: foodIcons.apple,
  },
]
