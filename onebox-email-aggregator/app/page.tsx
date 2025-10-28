"use client"

import { useState, useEffect } from "react"
import EmailList from "@/components/email-list"
import EmailDetail from "@/components/email-detail"
import Sidebar from "@/components/sidebar"
import SearchBar from "@/components/search-bar"
import Header from "@/components/header"
import type { Email } from "@/types"
import { fetchEmails } from "@/lib/services"

export default function Home() {
  const [emails, setEmails] = useState<Email[]>([])
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    account_id: "",
    category: "",
    folder: "INBOX",
  })
  const [searchQuery, setSearchQuery] = useState("")

  const fetchEmailsData = async () => {
    setLoading(true)
    try {
      const data = await fetchEmails(filters)
      setEmails(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching emails:", error)
      setEmails([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmailsData()
  }, [filters, searchQuery])

  return (
    <div className="flex h-screen bg-background flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onFilterChange={setFilters} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <SearchBar onSearch={setSearchQuery} />
          <div className="flex flex-1 overflow-hidden">
            <EmailList
              emails={emails}
              loading={loading}
              selectedEmail={selectedEmail}
              onSelectEmail={setSelectedEmail}
            />
            {selectedEmail && <EmailDetail email={selectedEmail} onClose={() => setSelectedEmail(null)} />}
          </div>
        </div>
      </div>
    </div>
  )
}
