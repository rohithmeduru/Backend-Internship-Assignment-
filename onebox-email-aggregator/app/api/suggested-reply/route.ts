import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email_id } = await request.json()

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/suggested-reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email_id }),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error generating reply:", error)
    return NextResponse.json({ error: "Failed to generate reply" }, { status: 500 })
  }
}
