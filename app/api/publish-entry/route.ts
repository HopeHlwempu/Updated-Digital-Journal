import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { title, type, slug, excerpt } = await request.json()

    // Trigger subscriber notifications
    const notifyResponse = await fetch(`${request.nextUrl.origin}/api/notify-subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, type, slug, excerpt }),
    })

    if (!notifyResponse.ok) {
      console.error("Failed to notify subscribers")
    }

    return NextResponse.json({
      message: "Entry published and subscribers notified",
    })
  } catch (error) {
    console.error("Publish error:", error)
    return NextResponse.json({ error: "Failed to publish entry" }, { status: 500 })
  }
}
