"use client"

import type { Email } from "@/types"
import { X, Copy, Reply, Archive, Trash2, Lightbulb } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { generateSuggestedReply } from "@/lib/services"

interface EmailDetailProps {
  email: Email
  onClose?: () => void
}

export default function EmailDetail({ email, onClose }: EmailDetailProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [suggestedReply, setSuggestedReply] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [contextEmails, setContextEmails] = useState<any[]>([])
  const [showContext, setShowContext] = useState(false)

  const handleGenerateReply = async () => {
    setIsGenerating(true)
    try {
      const data = await generateSuggestedReply(email.id)
      setSuggestedReply(data.reply || "")
      setContextEmails(data.similar_emails || [])
      setShowReplyForm(true)
    } catch (error) {
      console.error("Error generating reply:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(email.body)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
     
      <div className="border-b border-border p-6 flex items-start justify-between bg-muted/20">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-3 text-foreground text-balance">{email.subject}</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-muted text-sm">From:</span>
              <span className="text-foreground font-medium">{email.from}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted text-sm">To:</span>
              <span className="text-foreground font-medium">{email.to}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted text-sm">Date:</span>
              <span className="text-foreground text-sm">{formatDate(email.received_at)}</span>
            </div>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="text-muted hover:text-foreground">
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="prose prose-invert max-w-none">
          {email.html_body ? (
            <div className="text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: email.html_body }} />
          ) : (
            <div className="text-foreground whitespace-pre-wrap leading-relaxed">{email.body}</div>
          )}
        </div>
      </div>

     
      <div className="border-t border-border p-6 bg-muted/20 flex gap-2 flex-wrap">
        <Button
          onClick={handleGenerateReply}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
        >
          <Reply className="w-4 h-4" />
          {isGenerating ? "Generating..." : "Generate Reply"}
        </Button>
        <Button onClick={handleCopy} variant="outline" className="flex items-center gap-2 bg-transparent">
          <Copy className="w-4 h-4" />
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Archive className="w-4 h-4" />
          Archive
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </div>

     
      {showReplyForm && (
        <div className="border-t border-border p-6 bg-muted/30 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent" />
              AI-Generated Reply
            </h3>
            {contextEmails.length > 0 && (
              <Button
                onClick={() => setShowContext(!showContext)}
                variant="ghost"
                size="sm"
                className="text-xs text-muted hover:text-foreground"
              >
                {showContext ? "Hide" : "Show"} Context ({contextEmails.length})
              </Button>
            )}
          </div>

          {showContext && contextEmails.length > 0 && (
            <div className="mb-4 p-3 bg-background rounded-lg border border-border text-sm">
              <p className="text-muted text-xs mb-2">Similar emails used for context:</p>
              <div className="space-y-2">
                {contextEmails.map((email: any, idx: number) => (
                  <div key={idx} className="text-xs text-muted/80">
                    <p className="font-medium text-foreground">
                      {idx + 1}. {email.subject}
                    </p>
                    <p className="text-muted">From: {email.from}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Textarea
            value={suggestedReply}
            onChange={(e) => setSuggestedReply(e.target.value)}
            className="mb-3 min-h-24"
            placeholder="Your reply..."
          />
          <div className="flex gap-2">
            <Button className="bg-secondary hover:bg-secondary/90 text-white">Send Reply</Button>
            <Button onClick={() => setShowReplyForm(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
