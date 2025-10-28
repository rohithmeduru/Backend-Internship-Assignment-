"use client"

import { Mail, Settings, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <div className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Onebox</h1>
          <p className="text-xs text-muted">AI-powered email aggregator</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-muted hover:text-foreground">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted hover:text-foreground">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
