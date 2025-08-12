import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { title, type, url, excerpt } = await request.json()

    if (!title || !type || !url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = createClient()
    const { data: subscribers, error } = await supabase.from("subscribers").select("email")

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 })
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: "No subscribers to notify" })
    }

    const emailPromises = subscribers.map(async (subscriber) => {
      return resend.emails.send({
        from: "Starr Journals <noreply@starr-journals.vercel.app>",
        to: subscriber.email,
        subject: `✨ New ${type === "journal" ? "Journal Entry" : "Poetry"}: ${title}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #faf9f7;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #8b7355; font-size: 32px; margin: 0; font-weight: normal;">Starr Journals</h1>
              <p style="color: #a0a0a0; font-style: italic; margin: 10px 0 0 0;">where heart meets keyboard</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #6b5b73; font-size: 24px; margin: 0 0 20px 0;">New ${type === "journal" ? "Journal Entry" : "Poetry"} Published</h2>
              
              <h3 style="color: #8b7355; font-size: 20px; margin: 0 0 15px 0;">${title}</h3>
              
              ${excerpt ? `<p style="color: #666; line-height: 1.6; margin: 0 0 25px 0;">${excerpt}</p>` : ""}
              
              <div style="text-align: center;">
                <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, #d8b4fe, #fce7f3); color: #6b5b73; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 500;">Read Full ${type === "journal" ? "Entry" : "Poem"}</a>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #a0a0a0; font-size: 14px; margin: 0;">Your thoughts are safe here, your voice matters</p>
              <p style="color: #a0a0a0; font-size: 12px; margin: 10px 0 0 0;">
                <a href="#" style="color: #a0a0a0;">Unsubscribe</a>
              </p>
            </div>
          </div>
        `,
      })
    })

    await Promise.all(emailPromises)

    await resend.emails.send({
      from: "Starr Journals <noreply@starr-journals.vercel.app>",
      to: "starrvansittert@gmail.com",
      subject: `📧 Notification Sent: ${title}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #6b5b73;">Notification Summary</h2>
          <p><strong>Entry:</strong> ${title}</p>
          <p><strong>Type:</strong> ${type}</p>
          <p><strong>Subscribers Notified:</strong> ${subscribers.length}</p>
          <p><strong>URL:</strong> <a href="${url}">${url}</a></p>
        </div>
      `,
    })

    return NextResponse.json({
      message: "Subscribers notified successfully",
      notified: subscribers.length,
    })
  } catch (error) {
    console.error("Notification error:", error)
    return NextResponse.json({ error: "Failed to notify subscribers" }, { status: 500 })
  }
}
