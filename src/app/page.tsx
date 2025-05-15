import { Suspense } from "react"
import Dashboard from "@/components/dashboard"
import LoadingSkeleton from "@/components/loading-skeleton"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">TAOYEN</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <Dashboard />
      </Suspense>
    </main>
  )
}
