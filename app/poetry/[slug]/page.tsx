"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ArrowLeft, Send } from "lucide-react"

interface Comment {
  id: string
  author: string
  content: string
  date: string
}

interface Poem {
  id: string
  title: string
  content: string
  date: string
  comments: Comment[]
}

export default function PoemPage({ params }: { params: { slug: string } }) {
  const [newComment, setNewComment] = useState("")
  const [commentAuthor, setCommentAuthor] = useState("")
  const [comments, setComments] = useState<Comment[]>([])

  const poems: Record<string, Poem> = {
    "whispers-of-dawn": {
      id: "whispers-of-dawn",
      title: "Whispers of Dawn",
      content: `In the quiet hours before sunrise,
When the world holds its breath,
I find pieces of myself
Scattered like morning dew—

Each drop a prayer,
Each prayer a hope
That today will be different.

The darkness doesn't frighten me anymore;
It's just the canvas
Where God paints tomorrow.`,
      date: "DECEMBER 12, 2024",
      comments: [],
    },
    "sacred-spaces": {
      id: "sacred-spaces",
      title: "Sacred Spaces",
      content: `Between the lines of scripture
And the margins of my journal,
I discover God in lowercase letters,
In the pauses between heartbeats,
In the silence that speaks
Louder than any sermon.

Holy ground isn't always
A burning bush or mountain top—
Sometimes it's just
The space between
Question and answer,
Doubt and faith,
Who I was
And who I'm becoming.`,
      date: "DECEMBER 5, 2024",
      comments: [],
    },
  }

  const poem = poems[params.slug]

  if (!poem) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-slate-800 mb-4">Poem Not Found</h1>
          <Link href="/">
            <Button className="bg-purple-100 hover:bg-purple-150 text-slate-700">Return Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment && commentAuthor) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: commentAuthor,
        content: newComment,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      }
      setComments([...comments, comment])
      setNewComment("")
      setCommentAuthor("")
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="text-center py-12 px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Poetry
        </Link>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-800 mb-2">Poetry Corner</h1>
        <p className="text-sm text-slate-500 italic">★ where words dance with the sacred ★</p>
      </header>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* Poem */}
        <article className="mb-12">
          <Card className="bg-white border-stone-200 shadow-sm">
            <CardContent className="p-8">
              <div className="mb-6">
                <p className="text-sm text-slate-500 mb-2">{poem.date}</p>
                <h2 className="text-3xl font-serif text-slate-800 mb-6">{poem.title}</h2>
              </div>

              <div className="mb-8">
                <pre className="font-serif text-slate-700 whitespace-pre-wrap leading-relaxed text-lg">
                  {poem.content}
                </pre>
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Comments Section */}
        <section>
          <Card className="bg-white border-stone-200 shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-5 h-5 text-slate-500" />
                <h3 className="text-xl font-serif text-slate-800">Share your thoughts</h3>
              </div>

              {/* Comment Form */}
              <form onSubmit={handleComment} className="mb-8">
                <div className="space-y-4">
                  <Input
                    placeholder="Your name"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    required
                    className="border-stone-200"
                  />
                  <Textarea
                    placeholder="Share what this poem stirs in your heart..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    className="min-h-[100px] border-stone-200"
                  />
                  <Button
                    type="submit"
                    className="bg-purple-50 hover:bg-purple-100 text-slate-700 border border-purple-200"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <p className="text-slate-500 italic text-center py-8">
                    Be the first to share how this poem speaks to your heart.
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="border-l-2 border-stone-200 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-slate-800">{comment.author}</span>
                        <span className="text-sm text-slate-500">•</span>
                        <span className="text-sm text-slate-500">{comment.date}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
