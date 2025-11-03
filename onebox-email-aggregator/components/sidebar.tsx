"use client"

import { useState, useEffect } from "react"
import { Mail, Settings, Plus, ChevronDown, Inbox, Send, Archive, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { fetchAccounts } from "@/lib/services"

interface SidebarProps {
  onFilterChange: (filters: any) => void
}

export default function Sidebar({ onFilterChange }: SidebarProps) {
  const [accounts, setAccounts] = useState<any[]>([])
  const [selectedAccount, setSelectedAccount] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("INBOX")

  useEffect(() => {
    const loadAccounts = async () => {
      const data = await fetchAccounts()
      setAccounts(data)
      if (data.length > 0) {
        setSelectedAccount(data[0].id)
      }
    }
    loadAccounts()
  }, [])

  const handleAccountChange = (accountId: string) => {
    setSelectedAccount(accountId)
    onFilterChange({
      account_id: accountId,
      category: selectedCategory,
      folder: selectedFolder,
    })
  }

  const handleCategoryChange = (category: string) => {
    const newCategory = selectedCategory === category ? "" : category
    setSelectedCategory(newCategory)
    onFilterChange({
      account_id: selectedAccount,
      category: newCategory,
      folder: selectedFolder,
    })
  }

  const handleFolderChange = (folder: string) => {
    setSelectedFolder(folder)
    onFilterChange({
      account_id: selectedAccount,
      category: selectedCategory,
      folder,
    })
  }

  const categories = ["Interested", "Meeting Booked", "Not Interested", "Spam", "Out of Office"]
  const folders = [
    { name: "INBOX", icon: Inbox },
    { name: "SENT", icon: Send },
    { name: "ARCHIVE", icon: Archive },
    { name: "TRASH", icon: Trash2 },
  ]

  return (
    <div className="w-64 bg-muted/30 border-r border-border flex flex-col">
      
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-primary p-2 rounded-lg">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Onebox</h1>
            <p className="text-xs text-muted">Email Aggregator</p>
          </div>
        </div>
        <Button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-4 h-4" />
          Add Account
        </Button>
      </div>

      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {accounts.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Accounts</h3>
            <div className="space-y-2">
              {accounts.map((account) => (
                <Button
                  key={account.id}
                  onClick={() => handleAccountChange(account.id)}
                  variant={selectedAccount === account.id ? "default" : "ghost"}
                  className="w-full justify-start text-left h-auto py-2 px-3"
                >
                  <div className="truncate">
                    <div className="text-sm font-medium truncate">{account.email}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

      
        <div>
          <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Folders</h3>
          <div className="space-y-1">
            {folders.map(({ name, icon: Icon }) => (
              <Button
                key={name}
                onClick={() => handleFolderChange(name)}
                variant={selectedFolder === name ? "default" : "ghost"}
                className="w-full justify-start text-left h-auto py-2 px-3"
              >
                <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{name}</span>
              </Button>
            ))}
          </div>
        </div>

        
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center gap-2 text-xs font-semibold text-muted uppercase tracking-wider hover:text-foreground transition">
            Categories
            <ChevronDown className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryChange(category)}
                variant={selectedCategory === category ? "default" : "ghost"}
                className="w-full justify-start text-left h-auto py-2 px-3 text-sm"
              >
                {category}
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>

    
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-center gap-2 text-muted hover:text-foreground"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </div>
    </div>
  )
}
