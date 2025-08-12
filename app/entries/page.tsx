"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function AllEntriesPage() {
  const journalEntries = [
    {
      id: "mission-take-my-life-back",
      title: "Mission: Take My Life Back",
      preview:
        "Today I woke up with a bold declaration in mind: take my life back. Bold, right? Almost noble. The kind of declaration that sounds like it belongs on a motivational poster or in the opening lines of a self-help book...",
      date: "AUGUST 6, 2025",
      type: "journal",
    },
    {
      id: "flavoured-air-other-demons",
      title: "Flavoured Air & Other Demons",
      preview:
        "Nobody really talks about how gritty it is to be a young Christian. I'm not talking about the persecution complex that some people wear like a badge of honor. I'm talking about the real, messy, complicated stuff...",
      date: "JULY 28, 2025",
      type: "journal",
    },
    {
      id: "refactoring-grace",
      title: "Refactoring Grace",
      preview:
        "I've been thinking about how messy it is to forgive yourself when there's no dramatic apology scene. No violin swell. Just you, sitting with the memory of who you were and the reality of who you're becoming...",
      date: "JULY 10, 2025",
      type: "journal",
    },
    {
      id: "whispers-of-dawn",
      title: "Whispers of Dawn",
      preview:
        "In the quiet hours before sunrise, When the world holds its breath, I find pieces of myself Scattered like morning dew...",
      date: "DECEMBER 12, 2024",
      type: "poetry",
    },
    {
      id: "sacred-spaces",
      title: "Sacred Spaces",
      preview:
        "Between the lines of scripture And the margins of my journal, I discover God in lowercase letters, In the pauses between heartbeats...",
      date: "DECEMBER 5, 2024",
      type: "poetry",
    },
  ]

  // Sort entries by date (newest first)
  const sortedEntries = journalEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 py-8">
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
            <h1 className="text-3xl md:text-5xl font-serif text-slate-800 mb-2">All Entries</h1>
            <p className="text-slate-600">Every thought, every poem, every moment shared</p>
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
          {sortedEntries.map((entry) => (
            <Card key={entry.id} className="bg-white border-stone-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        entry.type === "poetry" ? "bg-purple-100 text-purple-700" : "bg-pink-100 text-pink-700"
                      }`}
                    >
                      {entry.type === "poetry" ? "Poetry" : "Journal"}
                    </span>
                    <p className="text-xs text-slate-500">{entry.date}</p>
                  </div>
                  <h3 className="text-lg md:text-xl font-serif text-slate-800 mb-4">{entry.title}</h3>
                </div>

                <div className="prose prose-sm text-slate-700 mb-6">
                  {entry.type === "poetry" ? (
                    <pre className="font-serif whitespace-pre-wrap leading-relaxed text-sm">{entry.preview}</pre>
                  ) : (
                    <p className="mb-3 leading-relaxed text-sm md:text-base">{entry.preview}</p>
                  )}
                </div>

                <div className="pt-4">
                  <Link href={`/${entry.type}/${entry.id}`}>
                    <Button className="w-full bg-rose-100 hover:bg-rose-150 text-slate-700 border-0 transition-colors">
                      Read More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state if no entries */}
        {sortedEntries.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No entries yet. Check back soon for new thoughts and reflections.</p>
          </div>
        )}
      </div>
    </div>
  )
}
