import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin.from("subscribers").insert([{ email }]).select()

    if (error) {
      // If email already exists, return success anyway for privacy
      if (error.code === "23505") {
        return NextResponse.json({
          message: "Successfully subscribed!",
          email: email,
        })
      }
      throw error
    }

    try {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Starr Journals <noreply@starr-journals.com>",
          to: ["starrvansittert@gmail.com"],
          subject: "✨ New Subscriber Alert",
          html: `
            <div style="font-family: serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #64748b; text-align: center;">New Subscriber</h2>
              <p style="color: #475569; text-align: center;">Someone new has joined the Starr Journals community!</p>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <p style="color: #334155; font-size: 18px; margin: 0;"><strong>${email}</strong></p>
              </div>
              <p style="color: #64748b; text-align: center; font-style: italic;">
                "Your thoughts are safe here, your voice matters" ✦
              </p>
            </div>
          `,
        }),
      })

      if (!emailResponse.ok) {
        console.error("Failed to send notification email")
      }
    } catch (emailError) {
      console.error("Email notification error:", emailError)
      // Don't fail the subscription if email fails
    }

    return NextResponse.json({
      message: "Successfully subscribed!",
      email: email,
    })
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}
