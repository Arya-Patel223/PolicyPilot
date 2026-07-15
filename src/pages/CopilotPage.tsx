import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import {
  Bot, Send, Copy, RefreshCw, ThumbsUp, ThumbsDown,
  FileText, Plus, Search, Paperclip,
  BookOpen, ExternalLink, MessageSquare, Zap,
} from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: string
  sources?: Source[]
}

interface Source {
  title: string
  excerpt: string
  type: string
  relevance: number
}

interface Conversation {
  id: number
  title: string
  preview: string
  time: string
  unread?: boolean
}

const suggestedPrompts = [
  { icon: <ShieldCheckIcon />, text: "Summarize our GDPR compliance status" },
  { icon: <AlertIcon />, text: "What policies expire in the next 30 days?" },
  { icon: <SearchIcon />, text: "Find conflicts between our data policies" },
  { icon: <BookIcon />, text: "Explain our employee privacy obligations" },
]

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-none stroke-current" strokeWidth={2}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}
function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-none stroke-current" strokeWidth={2}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-none stroke-current" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-none stroke-current" strokeWidth={2}>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  )
}

const mockConversations: Conversation[] = [
  { id: 1, title: "GDPR Compliance Review", preview: "Analyzed 12 policies for GDPR compliance...", time: "Just now", unread: true },
  { id: 2, title: "Data Retention Analysis", preview: "Based on your current policies...", time: "2h ago" },
  { id: 3, title: "SOC 2 Gap Assessment", preview: "I found 3 gaps in your security policies...", time: "Yesterday" },
  { id: 4, title: "Vendor DPA Review", preview: "The vendor agreements need updating...", time: "2d ago" },
  { id: 5, title: "Employee Handbook Q&A", preview: "Section 4.2 covers remote work...", time: "3d ago" },
]

const mockSources: Source[] = [
  {
    title: "GDPR Data Processing Agreement v2.1",
    excerpt: "Data subjects have the right to request deletion of their personal data within 30 days...",
    type: "Policy",
    relevance: 97,
  },
  {
    title: "EU GDPR Regulation Article 17",
    excerpt: "The data subject shall have the right to obtain from the controller the erasure of personal data...",
    type: "Regulation",
    relevance: 94,
  },
  {
    title: "Privacy Policy – Internal v3.4",
    excerpt: "Our data retention schedule maintains personal data for no longer than necessary for the purpose...",
    type: "Internal",
    relevance: 88,
  },
]

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: `Welcome to **PolicyPilot AI**. I'm your intelligent compliance assistant, trained on your organization's policies and regulatory frameworks.

I can help you:
- **Analyze** policy documents for compliance gaps
- **Compare** regulations against your current policies  
- **Answer** questions about specific policy provisions
- **Generate** summaries and reports

What would you like to explore today?`,
    timestamp: "Just now",
  },
]

export function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeConversation, setActiveConversation] = useState(1)
  const [showSources, setShowSources] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: "Just now",
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    await new Promise((r) => setTimeout(r, 1800))
    setIsTyping(false)

    const aiMsg: Message = {
      id: messages.length + 2,
      role: "assistant",
      content: `Based on your organization's policy documents, I've analyzed the question about **"${input}"**.

**Key Findings:**
1. Your current GDPR Data Processing Agreement (v2.1) addresses this in Section 4.3, requiring explicit consent mechanisms for all data collection activities.

2. There is a **potential gap** identified: Your website privacy policy hasn't been updated to reflect the 2023 amendments to your internal processing standards.

3. The SOC 2 Type II audit report from Q1 confirms your technical controls are adequate, but documentation needs updating.

**Recommended Actions:**
- Update your privacy policy to reflect current practices
- Schedule a review of vendor data processing agreements
- Document the legal basis for each processing activity

Would you like me to generate a detailed compliance checklist or draft updated policy language?`,
      timestamp: "Just now",
      sources: mockSources,
    }

    setMessages((prev) => [...prev, aiMsg])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const renderMessageContent = (content: string) => {
    const parts = content.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Left: Conversation History */}
      <div className="w-64 shrink-0 border-r border-border flex flex-col bg-muted/20 hidden lg:flex">
        <div className="p-3 border-b border-border">
          <Button size="sm" className="w-full gap-2 justify-start" variant="default">
            <Plus className="size-3.5" />
            New Conversation
          </Button>
        </div>
        <div className="p-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input
              placeholder="Search..."
              className="w-full h-7 pl-8 pr-3 text-xs rounded-md border border-border bg-background placeholder:text-muted-foreground focus:outline-none focus:border-ring"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 flex flex-col gap-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 mb-1">Today</p>
            {mockConversations.slice(0, 2).map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConversation(conv.id)}
                className={`w-full text-left p-2.5 rounded-lg transition-colors group ${
                  activeConversation === conv.id ? "bg-accent text-accent-foreground" : "hover:bg-muted/60"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="size-3 text-muted-foreground shrink-0" />
                  <p className="text-xs font-medium truncate flex-1">{conv.title}</p>
                  {conv.unread && <div className="size-1.5 rounded-full bg-primary shrink-0" />}
                </div>
                <p className="text-[11px] text-muted-foreground truncate">{conv.preview}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">{conv.time}</p>
              </button>
            ))}

            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 mb-1 mt-3">Earlier</p>
            {mockConversations.slice(2).map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConversation(conv.id)}
                className={`w-full text-left p-2.5 rounded-lg transition-colors ${
                  activeConversation === conv.id ? "bg-accent text-accent-foreground" : "hover:bg-muted/60"
                }`}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <MessageSquare className="size-3 text-muted-foreground shrink-0" />
                  <p className="text-xs font-medium truncate">{conv.title}</p>
                </div>
                <p className="text-[10px] text-muted-foreground/60">{conv.time}</p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Center: Chat Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-5 h-12 border-b border-border shrink-0 bg-background">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Bot className="size-3.5" />
            </div>
            <span className="text-sm font-semibold">PolicyPilot AI</span>
            <Badge variant="outline" className="text-[10px] border-success/30 text-success bg-success/5 px-1.5 h-4">Active</Badge>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSources(!showSources)}
              className="text-xs text-muted-foreground h-7 gap-1.5 hidden xl:flex"
            >
              <BookOpen className="size-3.5" />
              {showSources ? "Hide" : "Show"} Sources
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-5 py-5">
          <div className="flex flex-col gap-6 max-w-3xl mx-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className="size-7 shrink-0 mt-0.5">
                  <AvatarFallback className={`text-xs ${msg.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {msg.role === "assistant" ? <Bot className="size-3.5" /> : "JD"}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === "user" ? "items-end" : ""}`}>
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-card border border-border text-foreground rounded-tl-sm"
                  }`}>
                    {msg.content.split("\n").map((line, i) => (
                      <p key={i} className={line === "" ? "h-2" : ""}>
                        {renderMessageContent(line)}
                      </p>
                    ))}
                  </div>

                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="size-6 text-muted-foreground hover:text-foreground">
                        <Copy className="size-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-6 text-muted-foreground hover:text-foreground">
                        <RefreshCw className="size-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-6 text-muted-foreground hover:text-success">
                        <ThumbsUp className="size-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-6 text-muted-foreground hover:text-destructive">
                        <ThumbsDown className="size-3" />
                      </Button>
                      <span className="text-[10px] text-muted-foreground ml-1">{msg.timestamp}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="size-7 shrink-0 mt-0.5">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    <Bot className="size-3.5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex items-center gap-1">
                    <div className="size-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="size-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="size-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Suggested prompts (only show if few messages) */}
        {messages.length <= 1 && (
          <div className="px-5 pb-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs text-muted-foreground mb-2 text-center">Try asking about</p>
              <div className="grid grid-cols-2 gap-2">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(prompt.text)}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-border bg-card hover:bg-muted/40 text-sm text-left transition-colors group"
                  >
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{prompt.icon}</span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors text-xs leading-snug">{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="px-5 pb-5 pt-2 border-t border-border bg-background shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 transition-all">
              <Button variant="ghost" size="icon" className="size-7 shrink-0 text-muted-foreground hover:text-foreground mb-0.5">
                <Paperclip className="size-3.5" />
              </Button>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your policies, compliance, regulations..."
                className="flex-1 border-0 bg-transparent shadow-none resize-none min-h-[36px] max-h-32 py-0.5 px-0 text-sm focus-visible:ring-0 placeholder:text-muted-foreground"
                rows={1}
              />
              <Button
                size="icon"
                className="size-7 shrink-0 mb-0.5"
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
              >
                <Send className="size-3.5" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              PolicyPilot AI analyzes your uploaded documents. Responses are not legal advice.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Sources Panel */}
      {showSources && (
        <div className="w-72 shrink-0 border-l border-border hidden xl:flex flex-col bg-muted/10">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="size-3.5 text-muted-foreground" />
                <h3 className="text-sm font-semibold">Sources</h3>
              </div>
              <Badge variant="outline" className="text-xs h-4 px-1.5">{mockSources.length}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Documents referenced in this conversation</p>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-3">
              {mockSources.map((source, i) => (
                <Card key={i} className="p-3 shadow-none border border-border hover:shadow-sm transition-shadow cursor-pointer group">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="flex size-5 items-center justify-center rounded bg-primary/10 shrink-0">
                        <FileText className="size-3 text-primary" />
                      </div>
                      <Badge variant="outline" className="text-[9px] h-4 px-1.5">{source.type}</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Zap className="size-2.5 text-warning" />
                      {source.relevance}%
                    </div>
                  </div>
                  <p className="text-xs font-medium leading-snug mb-1.5">{source.title}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">{source.excerpt}</p>
                  <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-5 px-1.5 text-[10px] text-muted-foreground gap-1">
                      <ExternalLink className="size-2.5" />Open
                    </Button>
                  </div>
                </Card>
              ))}

              <Separator />

              <div className="text-center">
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1.5">
                  <Search className="size-3" />
                  Search all documents
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
