import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  FileText, Search, Upload, MoreHorizontal, Bot, Eye,
  Download, Trash2, Star, StarOff, Share2, CheckCircle2, AlertTriangle,
  Clock, ChevronLeft, ChevronRight, Grid, List,
  Calendar,
} from "lucide-react"

interface Policy {
  id: number
  title: string
  category: string
  status: "compliant" | "review" | "expired" | "draft"
  version: string
  updatedAt: string
  owner: string
  risk: "low" | "medium" | "high"
  starred: boolean
  size: string
  tags: string[]
}

const policies: Policy[] = [
  { id: 1, title: "GDPR Data Processing Agreement", category: "Privacy", status: "compliant", version: "v2.1", updatedAt: "Jul 10, 2025", owner: "Sarah K.", risk: "low", starred: true, size: "142 KB", tags: ["GDPR", "Data"] },
  { id: 2, title: "Employee Code of Conduct", category: "HR", status: "review", version: "v1.4", updatedAt: "Jul 9, 2025", owner: "Mark T.", risk: "medium", starred: false, size: "89 KB", tags: ["HR", "Conduct"] },
  { id: 3, title: "SOC 2 Security Policy", category: "Security", status: "compliant", version: "v3.0", updatedAt: "Jul 7, 2025", owner: "Lisa P.", risk: "low", starred: true, size: "215 KB", tags: ["SOC2", "Security"] },
  { id: 4, title: "Data Retention Policy", category: "Data", status: "expired", version: "v1.1", updatedAt: "Jun 30, 2025", owner: "Jane D.", risk: "high", starred: false, size: "67 KB", tags: ["Data", "Retention"] },
  { id: 5, title: "Vendor Risk Management Framework", category: "Risk", status: "compliant", version: "v2.3", updatedAt: "Jul 5, 2025", owner: "Tom R.", risk: "low", starred: false, size: "302 KB", tags: ["Risk", "Vendor"] },
  { id: 6, title: "Information Security Policy", category: "Security", status: "compliant", version: "v4.1", updatedAt: "Jul 3, 2025", owner: "Lisa P.", risk: "low", starred: false, size: "198 KB", tags: ["Security", "InfoSec"] },
  { id: 7, title: "Business Continuity Plan", category: "Operations", status: "review", version: "v1.8", updatedAt: "Jul 1, 2025", owner: "Mark T.", risk: "medium", starred: true, size: "445 KB", tags: ["BCP", "Operations"] },
  { id: 8, title: "CCPA Consumer Rights Policy", category: "Privacy", status: "draft", version: "v0.3", updatedAt: "Jun 28, 2025", owner: "Sarah K.", risk: "high", starred: false, size: "55 KB", tags: ["CCPA", "Privacy"] },
  { id: 9, title: "Remote Work Policy", category: "HR", status: "compliant", version: "v2.0", updatedAt: "Jun 25, 2025", owner: "Jane D.", risk: "low", starred: false, size: "78 KB", tags: ["HR", "Remote"] },
  { id: 10, title: "Incident Response Plan", category: "Security", status: "compliant", version: "v1.5", updatedAt: "Jun 20, 2025", owner: "Lisa P.", risk: "low", starred: false, size: "189 KB", tags: ["Security", "Incident"] },
]

const statusConfig = {
  compliant: { label: "Compliant", icon: CheckCircle2, className: "bg-success/10 text-success border-success/20" },
  review: { label: "Under Review", icon: Clock, className: "bg-warning/10 text-warning-foreground border-warning/20" },
  expired: { label: "Expired", icon: AlertTriangle, className: "bg-destructive/10 text-destructive border-destructive/20" },
  draft: { label: "Draft", icon: FileText, className: "bg-muted text-muted-foreground border-border" },
}

const categories = ["All", "Privacy", "Security", "HR", "Data", "Risk", "Operations"]

export function PoliciesPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [view, setView] = useState<"table" | "grid">("table")
  const [starredMap, setStarredMap] = useState<Record<number, boolean>>(
    Object.fromEntries(policies.map((p) => [p.id, p.starred]))
  )
  const [page, setPage] = useState(1)
  const perPage = 8

  const filtered = policies.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === "All" || p.category === category
    const matchStatus = statusFilter === "All" || p.status === statusFilter
    return matchSearch && matchCategory && matchStatus
  })

  const paginated = filtered.slice((page - 1) * perPage, page * perPage)
  const totalPages = Math.ceil(filtered.length / perPage)

  const toggleStar = (id: number) => {
    setStarredMap((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Policy Library</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{policies.length} documents · Last updated today</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Bot className="size-3.5" />
            Analyze All
          </Button>
          <Button size="sm" className="gap-1.5">
            <Upload className="size-3.5" />
            Upload Policy
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Policies", value: "142", color: "text-foreground" },
          { label: "Compliant", value: "118", color: "text-success" },
          { label: "Under Review", value: "17", color: "text-warning-foreground" },
          { label: "Expired / Overdue", value: "7", color: "text-destructive" },
        ].map((stat) => (
          <Card key={stat.label} className="shadow-none border border-border">
            <CardContent className="py-3 px-4">
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="shadow-none border border-border">
        <CardContent className="py-3 px-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Search policies..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="pl-9 h-8 text-sm"
              />
            </div>

            <Select value={category} onValueChange={(v) => { setCategory(v); setPage(1) }}>
              <SelectTrigger className="h-8 w-36 text-sm">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1) }}>
              <SelectTrigger className="h-8 w-40 text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-auto flex items-center gap-1">
              <Button
                variant={view === "table" ? "secondary" : "ghost"}
                size="icon"
                className="size-8"
                onClick={() => setView("table")}
              >
                <List className="size-3.5" />
              </Button>
              <Button
                variant={view === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="size-8"
                onClick={() => setView("grid")}
              >
                <Grid className="size-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table View */}
      {view === "table" && (
        <Card className="shadow-none border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border">
                <TableHead className="w-8 pl-4"></TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Policy Name</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Category</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Status</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Risk</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Version</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Owner</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Updated</TableHead>
                <TableHead className="w-10 pr-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((policy) => {
                const s = statusConfig[policy.status]
                return (
                  <TableRow key={policy.id} className="group hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-4 w-8">
                      <button onClick={() => toggleStar(policy.id)} className="text-muted-foreground hover:text-warning transition-colors">
                        {starredMap[policy.id]
                          ? <Star className="size-3.5 fill-warning text-warning" />
                          : <StarOff className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        }
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-7 items-center justify-center rounded-md bg-muted shrink-0">
                          <FileText className="size-3.5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-none">{policy.title}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {policy.tags.map((t) => (
                              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs font-normal">{policy.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${s.className}`}>
                        <s.icon className="size-3 mr-1" />{s.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs font-medium capitalize ${
                        policy.risk === "high" ? "text-destructive" :
                        policy.risk === "medium" ? "text-warning-foreground" : "text-success"
                      }`}>{policy.risk}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground font-mono">{policy.version}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground">{policy.owner}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground">{policy.updatedAt}</span>
                    </TableCell>
                    <TableCell className="pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-7 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="size-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem><Eye className="size-3.5" />View</DropdownMenuItem>
                          <DropdownMenuItem><Bot className="size-3.5" />Analyze with AI</DropdownMenuItem>
                          <DropdownMenuItem><Share2 className="size-3.5" />Share</DropdownMenuItem>
                          <DropdownMenuItem><Download className="size-3.5" />Download</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive"><Trash2 className="size-3.5" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length} policies
            </p>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="size-7" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                <ChevronLeft className="size-3.5" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={p === page ? "secondary" : "ghost"}
                  size="icon"
                  className="size-7 text-xs"
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
              <Button variant="ghost" size="icon" className="size-7" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
                <ChevronRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {paginated.map((policy) => {
            const s = statusConfig[policy.status]
            return (
              <Card key={policy.id} className="shadow-none border border-border hover:shadow-sm transition-shadow group cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                      <FileText className="size-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => toggleStar(policy.id)} className="text-muted-foreground hover:text-warning transition-colors">
                        {starredMap[policy.id]
                          ? <Star className="size-3.5 fill-warning text-warning" />
                          : <StarOff className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        }
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="size-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem><Eye className="size-3.5" />View</DropdownMenuItem>
                          <DropdownMenuItem><Bot className="size-3.5" />Analyze with AI</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive"><Trash2 className="size-3.5" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold leading-snug mb-2">{policy.title}</h3>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {policy.tags.map((t) => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={`text-xs ${s.className}`}>
                      {s.label}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="size-3" />{policy.updatedAt}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
