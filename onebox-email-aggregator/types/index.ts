export interface Email {
  id: string
  account_id: string
  message_id: string
  from: string
  to: string
  subject: string
  body: string
  html_body?: string
  received_at: Date
  folder: string
  is_read: boolean
  category?: string
  category_confidence?: number
  created_at: Date
  updated_at: Date
}

export interface EmailAccount {
  id: string
  email: string
  imap_host: string
  imap_port: number
  created_at: Date
}
