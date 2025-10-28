"use client"

import type { Email } from "@/types"
import { Mail } from "lucide-react"

interface EmailListProps {
  emails: Email[]
  loading: boolean
  selectedEmail: Email | null
  onSelectEmail: (email: Email) => void
}

export default function EmailList({ emails, loading, selectedEmail, onSelectEmail }: EmailListProps) {
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "Interested":
        return "bg-green-500/20 text-green-400 border border-green-500/30"
      case "Meeting Booked":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30"
      case "Not Interested":
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30"
      case "Spam":
        return "bg-red-500/20 text-red-400 border border-red-500/30"
      case "Out of Office":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
      default:
        return "bg-border text-muted"
    }
  }

  const formatDate = (date: Date) => {
    const d = new Date(date)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (d.toDateString() === today.toDateString()) {
      return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    } else if (d.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    }
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div className="w-96 border-r border-border flex flex-col bg-muted/30">
      <div className="p-4 border-b border-border sticky top-0 bg-muted/50 backdrop-blur">
        <h2 className="font-semibold text-foreground">Inbox</h2>
        <p className="text-xs text-muted mt-1">{emails.length} emails</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <div className="text-muted text-sm">Loading emails...</div>
            </div>
          </div>
        ) : emails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Mail className="w-10 h-10 text-muted/50" />
            <div className="text-center">
              <div className="text-muted text-sm font-medium">No emails found</div>
              <p className="text-xs text-muted/70 mt-1">Try adjusting your filters</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {emails.map((email) => (
              <button
                key={email.id}
                onClick={() => onSelectEmail(email)}
                className={`w-full text-left p-4 hover:bg-background/50 transition-colors group ${
                  selectedEmail?.id === email.id ? "bg-background border-l-2 border-primary" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium truncate text-sm text-foreground">{email.from}</p>
                      {email.category && (
                        <span
                          className={`${getCategoryColor(email.category)} text-xs px-2 py-0.5 rounded-full whitespace-nowrap`}
                        >
                          {email.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted truncate mb-1">{email.subject}</p>
                    <p className="text-xs text-muted/70 line-clamp-1">{email.body.substring(0, 60)}...</p>
                  </div>
                  <div className="text-xs text-muted whitespace-nowrap ml-2">{formatDate(email.received_at)}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
