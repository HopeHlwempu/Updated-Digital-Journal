"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPage() {
  const [title, setTitle] = useState("")
  const [type, setType] = useState<"journal" | "poetry">("journal")
  const [url, setUrl] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/notify-subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          type,
          url,
          excerpt,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`✅ Successfully notified ${data.notified} subscribers!`)
        setTitle("")
        setUrl("")
        setExcerpt("")
      } else {
        setMessage(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setMessage("❌ Failed to send notifications")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-slate-700 mb-2">Admin Panel</h1>
          <p className="text-slate-500 italic">Notify subscribers about new entries</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-700 font-serif">Send Notification</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNotify} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Entry Title</label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter the title of your new entry"
                  required
                  className="border-slate-200 focus:border-purple-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Entry Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="journal"
                      checked={type === "journal"}
                      onChange={(e) => setType(e.target.value as "journal")}
                      className="mr-2 text-purple-500"
                    />
                    Journal Entry
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="poetry"
                      checked={type === "poetry"}
                      onChange={(e) => setType(e.target.value as "poetry")}
                      className="mr-2 text-purple-500"
                    />
                    Poetry
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Entry URL</label>
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://starr-journals.vercel.app/journal/entry-slug"
                  required
                  className="border-slate-200 focus:border-purple-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Excerpt (Optional)</label>
                <Textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief preview of the entry content..."
                  rows={3}
                  className="border-slate-200 focus:border-purple-300"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-100 to-rose-100 text-slate-700 hover:from-purple-200 hover:to-rose-200 border border-purple-200"
              >
                {isLoading ? "Sending Notifications..." : "Notify All Subscribers"}
              </Button>

              {message && <div className="text-center p-3 rounded-lg bg-slate-50 text-slate-700">{message}</div>}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
