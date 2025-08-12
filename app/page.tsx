"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Github, Linkedin, Mail, Instagram } from "lucide-react"

export default function StarrJournalsPage() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const journalEntries = [
    {
      id: "mission-take-my-life-back",
      title: "Mission: Take My Life Back",
      preview:
        "Today I woke up with a bold declaration in mind: take my life back. Bold, right? Almost noble. The kind of declaration that sounds like it belongs on a motivational poster or in the opening lines of a self-help book...",
      date: "AUGUST 6, 2025",
    },
    {
      id: "flavoured-air-other-demons",
      title: "Flavoured Air & Other Demons",
      preview:
        "Nobody really talks about how gritty it is to be a young Christian. I'm not talking about the persecution complex that some people wear like a badge of honor. I'm talking about the real, messy, complicated stuff...",
      date: "JULY 28, 2025",
    },
    {
      id: "refactoring-grace",
      title: "Refactoring Grace",
      preview:
        "I've been thinking about how messy it is to forgive yourself when there's no dramatic apology scene. No violin swell. Just you, sitting with the memory of who you were and the reality of who you're becoming...",
      date: "JULY 10, 2025",
    },
  ]

  const poems = [
    {
      id: "whispers-of-dawn",
      title: "Whispers of Dawn",
      preview:
        "In the quiet hours before sunrise, When the world holds its breath, I find pieces of myself Scattered like morning dew...",
      date: "DECEMBER 12, 2024",
    },
    {
      id: "sacred-spaces",
      title: "Sacred Spaces",
      preview:
        "Between the lines of scripture And the margins of my journal, I discover God in lowercase letters, In the pauses between heartbeats...",
      date: "DECEMBER 5, 2024",
    },
  ]

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })

        if (response.ok) {
          setIsSubscribed(true)
          setEmail("")
        }
      } catch (error) {
        console.error("Subscription failed:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="text-center py-20 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-slate-800 mb-4">Starr Journals</h1>
        <p className="text-base md:text-lg text-slate-600 mb-2">A journal of faith, feeling, and finding God in code</p>
        <p className="text-sm text-slate-500 italic">★ where heart meets keyboard ★</p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px bg-slate-300 w-12"></div>
          <span className="text-slate-400">✦</span>
          <div className="h-px bg-slate-300 w-12"></div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        {/* About the Blog */}
        <section className="mb-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif text-slate-800 mb-4">About the Blog</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              This is a space where faith meets code, where vulnerability meets strength, and where the sacred
              intersects with the everyday. Here, I share raw thoughts, gentle reflections, and the messy beauty of
              growing in grace.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-slate-300 w-8"></div>
              <span className="text-slate-400">✦</span>
              <div className="h-px bg-slate-300 w-8"></div>
            </div>
          </div>
        </section>

        {/* Recent Entries - Added light purple background */}
        <section className="mb-20 bg-purple-25 py-16 px-4 md:px-8 rounded-2xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-4">Recent Entries</h2>
            <p className="text-slate-600">Raw thoughts from the intersection of faith and life</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-px bg-slate-300 w-12"></div>
              <span className="text-slate-400">✦</span>
              <div className="h-px bg-slate-300 w-12"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {journalEntries.map((entry) => (
              <Card key={entry.id} className="bg-white border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2">{entry.date}</p>
                    <h3 className="text-lg md:text-xl font-serif text-slate-800 mb-4">{entry.title}</h3>
                  </div>

                  <div className="prose prose-sm text-slate-700 mb-6">
                    <p className="mb-3 leading-relaxed text-sm md:text-base">{entry.preview}</p>
                  </div>

                  <div className="pt-4">
                    <Link href={`/journal/${entry.id}`}>
                      <Button className="w-full bg-rose-100 hover:bg-rose-150 text-slate-700 border-0 transition-colors">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/entries">
              <Button className="bg-purple-100 hover:bg-purple-150 text-slate-700 px-8 py-2">View All Entries</Button>
            </Link>
          </div>
        </section>

        {/* Song of the Day */}
        <section className="mb-20">
          <div className="max-w-md mx-auto">
            <Card className="bg-purple-50 border-purple-200 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Heart className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-400 uppercase tracking-wide font-medium">SONG OF THE DAY</span>
                </div>

                <h3 className="text-2xl font-serif text-slate-800 mb-2">Moon River</h3>
                <p className="text-slate-600 mb-4">by Frank Ocean</p>

                <div className="inline-block bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-sm mb-4">
                  mood: Reminiscent
                </div>

                <p className="text-slate-500 italic text-sm">(Playing softly in the background of my heart)</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pictures of the Day - Added light pink background and removed Moon River content */}
        <section className="mb-20 bg-pink-25 py-16 px-4 md:px-8 rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-4">Pictures of the Day</h2>
            <p className="text-slate-600">Visual moments that capture the heart</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-px bg-slate-300 w-12"></div>
              <span className="text-slate-400">✦</span>
              <div className="h-px bg-slate-300 w-12"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-6">
            <div className="aspect-square bg-stone-200 rounded-lg overflow-hidden">
              <img src="/moonlit-landscape.png" alt="Moonlit landscape" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-stone-200 rounded-lg overflow-hidden">
              <img src="/moonlit-river.png" alt="Moon reflecting on river" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-square bg-stone-200 rounded-lg overflow-hidden">
              <img src="/moonlit-reflection.png" alt="Moonlit reflection" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="text-center">
            <p className="text-slate-600 italic">Capturing beauty in the ordinary ✦ where sacred meets simple</p>
          </div>
        </section>

        {/* Current Mood Board - Updated to match sticky note aesthetic from image */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-4">Current Mood Board</h2>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-px bg-slate-300 w-12"></div>
              <span className="text-slate-400">✦</span>
              <div className="h-px bg-slate-300 w-12"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-pink-100 border border-pink-200 rounded-lg p-4 md:p-6 text-center shadow-sm">
              <p className="text-xs text-pink-600 uppercase tracking-wide mb-2">CURRENT MOOD</p>
              <p className="text-pink-800 font-medium text-sm md:text-base">Present + Numb</p>
            </div>
            <div className="bg-stone-100 border border-stone-200 rounded-lg p-4 md:p-6 text-center shadow-sm">
              <p className="text-xs text-stone-600 uppercase tracking-wide mb-2">VERSE OF THE WEEK</p>
              <p className="text-stone-800 font-medium text-sm md:text-base">Galations 5:22-23</p>
            </div>
            <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 md:p-6 text-center border-dashed shadow-sm">
              <p className="text-xs text-blue-600 uppercase tracking-wide mb-2">CURRENTLY LISTENING</p>
              <p className="text-blue-800 font-medium text-sm md:text-base">Elohim by Sondae</p>
            </div>
            <div className="bg-stone-100 border border-stone-200 rounded-lg p-4 md:p-6 text-center shadow-sm">
              <p className="text-xs text-stone-600 uppercase tracking-wide mb-2">DREAMING OF</p>
              <p className="text-stone-800 font-medium text-sm md:text-base">Movement + Meaning</p>
            </div>
            <div className="bg-stone-100 border border-stone-200 rounded-lg p-4 md:p-6 text-center shadow-sm">
              <p className="text-xs text-stone-600 uppercase tracking-wide mb-2">TODAY'S PRAYER</p>
              <p className="text-stone-800 font-medium text-sm md:text-base">Clarity tomorrow</p>
            </div>
            <div className="bg-stone-100 border border-stone-200 rounded-lg p-4 md:p-6 text-center shadow-sm">
              <p className="text-xs text-stone-600 uppercase tracking-wide mb-2">LEARNING</p>
              <p className="text-stone-800 font-medium text-sm md:text-base">Slowness + Strength</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-slate-500 italic text-sm">Sticky notes from the heart ★ updated as I grow</p>
          </div>
        </section>

        {/* Poetry Corner - Moved under current mood board */}
        <section className="mb-20 bg-purple-25 py-16 px-4 md:px-8 rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-4">Poetry Corner</h2>
            <p className="text-slate-600">Where words dance with the sacred</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-px bg-slate-300 w-12"></div>
              <span className="text-slate-400">✦</span>
              <div className="h-px bg-slate-300 w-12"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {poems.map((poem) => (
              <Card key={poem.id} className="bg-white border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2">{poem.date}</p>
                    <h3 className="text-lg md:text-xl font-serif text-slate-800 mb-4">{poem.title}</h3>
                  </div>

                  <div className="mb-6">
                    <pre className="font-serif text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
                      {poem.preview}
                    </pre>
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

          <div className="text-center mt-12">
            <Link href="/poetry">
              <Button className="bg-purple-100 hover:bg-purple-150 text-slate-700 px-8 py-2">View All Poetry</Button>
            </Link>
          </div>
        </section>
      </div>

      {/* Newsletter Subscription - Moved to bottom */}
      <section className="bg-pink-25 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-white border-stone-200 shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-serif text-slate-800 mb-2">Join the Journey</h3>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Subscribe to receive gentle notifications when new entries and poems are shared. No spam, just
                  authentic moments delivered to your inbox.
                </p>
              </div>

              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 border-stone-200"
                    />
                    <Button type="submit" className="bg-purple-100 hover:bg-purple-150 text-slate-700 px-6">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Your email stays safe here—just like your thoughts</p>
                </form>
              ) : (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                    <Heart className="w-4 h-4" />
                    <span>Welcome to the community! Check your email for a warm hello.</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer - Made footer text pastel purple */}
      <footer className="bg-white border-t border-stone-200 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <p className="text-xl md:text-2xl font-serif text-slate-700 italic mb-2">
              "You love so much, you love when love hurts."
            </p>
            <p className="text-sm text-slate-500">— Real by Kendrick Lamar</p>
          </div>

          <div className="flex justify-center gap-6 mb-8">
            <Github className="w-5 h-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" />
            <Mail className="w-5 h-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" />
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-sm text-slate-500 mb-4">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              Starr Journals
            </span>
            <span className="hidden sm:inline">•</span>
            <span>2025</span>
            <span className="hidden sm:inline">•</span>
            <span>Written with ♡</span>
          </div>

          <p className="text-purple-400 text-sm">
            "The Lord your God is with you, the Mighty Warrior who saves." — Zephaniah 3:17
          </p>
        </div>
      </footer>
    </div>
  )
}
