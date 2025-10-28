"use client"

import type React from "react"
import { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="bg-muted/20 border-b border-border p-4">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <Search className="w-5 h-5 text-muted flex-shrink-0" />
        <Input
          type="text"
          placeholder="Search emails by subject, sender, or content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted focus:outline-none focus:border-primary"
        />
        {query && (
          <Button
            type="button"
            onClick={handleClear}
            variant="ghost"
            size="icon"
            className="text-muted hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </form>
    </div>
  )
}
