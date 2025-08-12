"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function AllPoetryPage() {
  const poems = [
    {
      id: "whispers-of-dawn",
      title: "Whispers of Dawn",
      preview:
        "In the quiet hours before sunrise,\nWhen the world holds its breath,\nI find pieces of myself\nScattered like morning dew...",
      date: "DECEMBER 12, 2024",
    },
    {
      id: "sacred-spaces",
      title: "Sacred Spaces",
      preview:
        "Between the lines of scripture\nAnd the margins of my journal,\nI discover God in lowercase letters,\nIn the pauses between heartbeats...",
      date: "DECEMBER 5, 2024",
    },
    {
      id: "threads-of-grace",
      title: "Threads of Grace",
      preview:
        "Some days grace feels like\nA thread pulled too tight,\nReady to snap under the weight\nOf all I cannot carry...",
      date: "NOVEMBER 28, 2024",
    },
    {
      id: "digital-prayers",
      title: "Digital Prayers",
      preview: "I type my prayers in code,\nEach function a petition,\nEvery variable a hope\nWaiting to be defined...",
      date: "NOVEMBER 15, 2024",
    },
  ]

  // Sort poems by date (newest first)
  const sortedPoems = poems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-purple-25 border-b border-purple-200 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-serif text-slate-800 mb-2">Poetry Collection</h1>
            <p className="text-slate-600">Where words dance with the sacred</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-px bg-slate-300 w-12"></div>
              <span className="text-slate-400">✦</span>
              <div className="h-px bg-slate-300 w-12"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sortedPoems.map((poem) => (
            <Card key={poem.id} className="bg-white border-stone-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">Poetry</span>
                    <p className="text-xs text-slate-500">{poem.date}</p>
                  </div>
                  <h3 className="text-lg md:text-xl font-serif text-slate-800 mb-4">{poem.title}</h3>
                </div>

                <div className="prose prose-sm text-slate-700 mb-6">
                  <pre className="font-serif whitespace-pre-wrap leading-relaxed text-sm">{poem.preview}</pre>
                </div>

                <div className="pt-4">
                  <Link href={`/poetry/${poem.id}`}>
                    <Button className="w-full bg-rose-100 hover:bg-rose-150 text-slate-700 border-0 transition-colors">
                      Read More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state if no poems */}
        {sortedPoems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No poems yet. Check back soon for new verses and reflections.</p>
          </div>
        )}
      </div>
    </div>
  )
}
