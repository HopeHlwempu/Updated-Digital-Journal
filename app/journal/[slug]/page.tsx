"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Send, ArrowLeft } from "lucide-react"

interface Comment {
  id: string
  author: string
  content: string
  date: string
}

interface JournalEntry {
  id: string
  title: string
  content: string
  date: string
  comments: Comment[]
}

export default function JournalEntryPage({ params }: { params: { slug: string } }) {
  const [newComment, setNewComment] = useState("")
  const [commentAuthor, setCommentAuthor] = useState("")
  const [comments, setComments] = useState<Comment[]>([])

  const journalEntries: Record<string, JournalEntry> = {
    "mission-take-my-life-back": {
      id: "mission-take-my-life-back",
      title: "Mission: Take My Life Back",
      content: `Today I woke up with a bold declaration in mind: take my life back. Bold, right? Almost noble. The kind of declaration that sounds like it belongs on a motivational poster or in the opening lines of a self-help book.

But here's the thing about taking your life back—it assumes someone or something took it in the first place. And maybe that's true. Maybe I've been living on autopilot, letting circumstances, expectations, and the weight of other people's dreams dictate my days.

There's something both terrifying and liberating about the idea of reclaiming what's yours. It means acknowledging that somewhere along the way, you gave pieces of yourself away. To jobs that drained you, relationships that diminished you, habits that numbed you.

Taking my life back isn't about dramatic gestures or burning bridges. It's about the quiet revolution of choosing myself again. It's about saying no to things that don't serve my soul and yes to the dreams I've been too afraid to chase.

God, help me be brave enough to live the life You've called me to, not the one everyone else expects.`,
      date: "AUGUST 6, 2025",
      comments: [],
    },
    "flavoured-air-other-demons": {
      id: "flavoured-air-other-demons",
      title: "Flavoured Air & Other Demons",
      content: `Nobody really talks about how gritty it is to be a young Christian. I'm not talking about the persecution complex that some people wear like a badge of honor. I'm talking about the real, messy, complicated stuff.

Like how you can love Jesus and still struggle with doubt. How you can believe in grace and still feel crushed by guilt. How you can know God's love intellectually but feel emotionally abandoned on a Tuesday afternoon.

There's this pressure to have it all figured out, to be a walking testimony of transformation. But what about the days when your faith feels like flavoured air—sweet on the tongue but offering no real substance?

I'm learning that maybe the grit is part of the grace. Maybe God isn't looking for perfect disciples but honest ones. Maybe the struggle isn't a sign of weak faith but of real faith wrestling with real life.

The demons aren't always dramatic. Sometimes they're just the quiet voices that whisper you're not enough, you're too much, you're doing it wrong. But even demons flee at the name of Jesus, even the subtle ones that dress up as self-improvement.

Today I'm choosing to believe that my messy faith is still faith. That my questions don't disqualify me from God's love. That even flavoured air can sustain you until the real feast arrives.`,
      date: "JULY 28, 2025",
      comments: [],
    },
    "refactoring-grace": {
      id: "refactoring-grace",
      title: "Refactoring Grace",
      content: `I've been thinking about how messy it is to forgive yourself when there's no dramatic apology scene. No violin swell. Just you, sitting with the memory of who you were and the reality of who you're becoming.

In coding, we call it refactoring—taking messy, functional code and making it cleaner, more efficient, more beautiful. The program still works, but now it works better. The logic is clearer. The purpose is more evident.

Maybe that's what grace does to us. It doesn't delete our past or pretend our mistakes never happened. Instead, it refactors our story. Takes the messy, broken parts and weaves them into something that still works—but now works for good.

I used to think forgiveness meant forgetting, that grace meant a clean slate. But maybe it's more like version control in Git. The old commits are still there in the history, but they're not the current version. They inform the present without defining it.

God doesn't delete our history; He refactors it. Takes our bugs and turns them into features. Takes our failures and makes them foundations for something stronger.

Today I'm grateful for divine version control. For a God who sees my messy code and doesn't scrap the whole project, but patiently helps me write something beautiful.`,
      date: "JULY 10, 2025",
      comments: [],
    },
  }

  const entry = journalEntries[params.slug]

  if (!entry) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-slate-800 mb-4">Entry Not Found</h1>
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
          Back to Journal
        </Link>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-800 mb-2">Starr Journals</h1>
        <p className="text-sm text-slate-500 italic">★ where heart meets keyboard ★</p>
      </header>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* Journal Entry */}
        <article className="mb-12">
          <Card className="bg-white border-stone-200 shadow-sm">
            <CardContent className="p-8">
              <div className="mb-6">
                <p className="text-sm text-slate-500 mb-2">{entry.date}</p>
                <h2 className="text-3xl font-serif text-slate-800 mb-6">{entry.title}</h2>
              </div>

              <div className="prose prose-lg text-slate-700 max-w-none">
                {entry.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Comments Section */}
        <section>
          <Card className="bg-white border-stone-200 shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-5 h-5 text-slate-500" />
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
                    placeholder="What resonates with you? Share your thoughts..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    className="min-h-[100px] border-stone-200"
                  />
                  <Button type="submit" className="bg-rose-50 hover:bg-rose-100 text-slate-700 border border-rose-200">
                    <Send className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <p className="text-slate-500 italic text-center py-8">
                    Be the first to share your thoughts on this entry.
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
