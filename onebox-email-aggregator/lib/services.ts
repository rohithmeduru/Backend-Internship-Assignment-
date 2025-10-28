// Email Service
export async function fetchEmails(filters: {
  account_id?: string
  category?: string
  folder?: string
  search?: string
}) {
  try {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    const response = await fetch(`/api/emails?${params}`)
    if (!response.ok) throw new Error("Failed to fetch emails")
    return await response.json()
  } catch (error) {
    console.error("Error fetching emails:", error)
    return []
  }
}

// AI Service - Generate suggested reply
export async function generateSuggestedReply(emailId: string) {
  try {
    const response = await fetch("/api/suggested-reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email_id: emailId }),
    })
    if (!response.ok) throw new Error("Failed to generate reply")
    return await response.json()
  } catch (error) {
    console.error("Error generating reply:", error)
    return { reply: "", similar_emails: [] }
  }
}

// Fetch accounts
export async function fetchAccounts() {
  try {
    const response = await fetch("/api/accounts")
    if (!response.ok) throw new Error("Failed to fetch accounts")
    return await response.json()
  } catch (error) {
    console.error("Error fetching accounts:", error)
    return []
  }
}
