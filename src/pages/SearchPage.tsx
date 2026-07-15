import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Search, FileText, Clock, ArrowUpRight,
  Bot, Tag, X,
} from "lucide-react"

interface SearchResult {
  id: number
  title: string
  excerpt: string
  category: string
  matchedTerms: string[]
  updatedAt: string
  relevance: number
  type: "policy" | "regulation" | "report"
}

const allResults: SearchResult[] = [
  {
    id: 1,
    title: "GDPR Data Processing Agreement v2.1",
    excerpt: "This agreement sets out the terms under which personal data is processed on behalf of the data controller. It covers lawful basis, data subject rights, security measures, and breach notification procedures...",
    category: "Privacy",
    matchedTerms: ["GDPR", "data processing", "personal data"],
    updatedAt: "Jul 10, 2025",
    relevance: 98,
    type: "policy",
  },
  {
    id: 2,
    title: "EU GDPR Regulation – Article 17 Right to Erasure",
    excerpt: "The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay and the controller shall have the obligation to erase personal data...",
    category: "Regulation",
    matchedTerms: ["GDPR", "erasure", "right to be forgotten"],
    updatedAt: "Jun 15, 2025",
    relevance: 95,
    type: "regulation",
  },
  {
    id: 3,
    title: "Privacy Policy – Internal v3.4",
    excerpt: "Our data retention schedule maintains personal data for no longer than necessary. Customers may request deletion of their data at any time through our secure privacy portal...",
    category: "Privacy",
    matchedTerms: ["data retention", "privacy", "deletion"],
    updatedAt: "Jul 5, 2025",
    relevance: 89,
    type: "policy",
  },
  {
    id: 4,
    title: "Q2 2025 Compliance Report",
    excerpt: "This report summarizes compliance activities, identifies gaps in current policies, and provides recommendations for Q3. Areas reviewed include data privacy, security controls, and vendor management...",
    category: "Reports",
    matchedTerms: ["compliance", "gaps", "recommendations"],
    updatedAt: "Jun 30, 2025",
    relevance: 82,
    type: "report",
  },
  {
    id: 5,
    title: "CCPA Consumer Rights Policy",
    excerpt: "California consumers have the right to know, delete, opt-out, and non-discrimination. This policy describes how we respond to consumer requests within the required 45-day timeframe...",
    category: "Privacy",
    matchedTerms: ["CCPA", "consumer rights", "California"],
    updatedAt: "Jun 28, 2025",
    relevance: 78,
    type: "policy",
  },
]

const recentSearches = ["GDPR Article 17", "data retention schedule", "SOC 2 controls", "vendor DPA"]
const popularTopics = ["GDPR", "SOC 2", "CCPA", "Data Privacy", "Security", "Incident Response"]

const typeConfig = {
  policy: { label: "Policy", className: "bg-primary/10 text-primary border-primary/20" },
  regulation: { label: "Regulation", className: "bg-chart-4/10 text-chart-4 border-chart-4/20" },
  report: { label: "Report", className: "bg-chart-3/10 text-chart-3 border-chart-3/20" },
}

export function SearchPage() {
  const [query, setQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("all")

  const handleSearch = () => {
    if (query.trim()) setHasSearched(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

  const filtered = allResults.filter((r) => {
    if (selectedType !== "all" && r.type !== selectedType) return false
    return true
  })

  const highlight = (text: string) => {
    if (!query) return text
    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i} className="bg-primary/20 text-foreground rounded px-0.5">{part}</mark> : part
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1000px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Search</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Search across all policies, regulations, and reports</p>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search policies, regulations, clauses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-11 pr-32 h-12 text-base rounded-xl border-border focus-visible:ring-2"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button variant="ghost" size="icon" className="size-8" onClick={() => { setQuery(""); setHasSearched(false) }}>
              <X className="size-3.5" />
            </Button>
          )}
          <Button size="sm" onClick={handleSearch} disabled={!query.trim()} className="h-8 px-4">
            Search
          </Button>
        </div>
      </div>

      {/* Results or empty state */}
      {hasSearched ? (
        <div className="flex flex-col gap-5">
          {/* Filter bar */}
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground">{filtered.length} results for <strong className="text-foreground">"{query}"</strong></p>
            <div className="flex items-center gap-1.5 ml-auto">
              {(["all", "policy", "regulation", "report"] as const).map((t) => (
                <Button
                  key={t}
                  variant={selectedType === t ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 px-3 text-xs capitalize"
                  onClick={() => setSelectedType(t)}
                >
                  {t === "all" ? "All Types" : t}
                </Button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-3">
            {filtered.map((result) => {
              const t = typeConfig[result.type]
              return (
                <Card key={result.id} className="shadow-none border border-border hover:shadow-sm transition-shadow cursor-pointer group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-muted shrink-0">
                          <FileText className="size-4 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-semibold leading-snug truncate group-hover:text-primary transition-colors">
                          {highlight(result.title)}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="outline" className={`text-xs ${t.className}`}>{t.label}</Badge>
                        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">{result.relevance}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 ml-10.5 mb-3">
                      {highlight(result.excerpt)}
                    </p>
                    <div className="flex items-center gap-3 ml-10.5">
                      <div className="flex items-center gap-1.5">
                        {result.matchedTerms.map((term) => (
                          <span key={term} className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{term}</span>
                        ))}
                      </div>
                      <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="size-3" />{result.updatedAt}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Ask AI about results */}
          <Card className="shadow-none border border-border bg-primary/[0.02] border-primary/20">
            <CardContent className="py-4 px-5">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                  <Bot className="size-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Want a deeper analysis?</p>
                  <p className="text-xs text-muted-foreground">Ask the AI Copilot to synthesize these results</p>
                </div>
                <Button size="sm" className="gap-1.5 shrink-0">
                  Ask AI <ArrowUpRight className="size-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Empty state / Discovery */
        <div className="flex flex-col gap-6">
          {/* Recent searches */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); setHasSearched(true) }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted/40 transition-colors text-sm text-muted-foreground hover:text-foreground"
                >
                  <Clock className="size-3" />
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Popular topics */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Popular Topics</h3>
            <div className="flex flex-wrap gap-2">
              {popularTopics.map((t) => (
                <button
                  key={t}
                  onClick={() => { setQuery(t); setHasSearched(true) }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted/40 transition-colors text-sm text-foreground"
                >
                  <Tag className="size-3 text-muted-foreground" />
                  {t}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Browse by category */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Browse by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: "Privacy & GDPR", count: 28, icon: "🔒" },
                { name: "Security", count: 35, icon: "🛡️" },
                { name: "Human Resources", count: 19, icon: "👥" },
                { name: "Operations", count: 22, icon: "⚙️" },
                { name: "Risk Management", count: 15, icon: "⚠️" },
                { name: "Regulatory", count: 23, icon: "📋" },
              ].map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => { setQuery(cat.name); setHasSearched(true) }}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card hover:bg-muted/40 hover:shadow-sm transition-all text-left group"
                >
                  <span className="text-xl">{cat.icon}</span>
                  <div>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">{cat.name}</p>
                    <p className="text-xs text-muted-foreground">{cat.count} documents</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
