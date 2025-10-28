import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = new URLSearchParams()

    if (searchParams.get("account_id")) query.append("account_id", searchParams.get("account_id")!)
    if (searchParams.get("category")) query.append("category", searchParams.get("category")!)
    if (searchParams.get("folder")) query.append("folder", searchParams.get("folder")!)
    if (searchParams.get("search")) query.append("search", searchParams.get("search")!)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/emails?${query}`, {
      headers: { "Content-Type": "application/json" },
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching emails:", error)
    return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 })
  }
}
