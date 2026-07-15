import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts"
import {
  ArrowUpRight, ArrowDownRight, ShieldCheck, FileText, Bot, Upload,
  TrendingUp, AlertTriangle, ChevronRight, Sparkles,
  Calendar, ArrowRight, Activity,
} from "lucide-react"
import type { Page } from "@/App"
import type { ChartConfig } from "@/components/ui/chart"

const complianceTrendData = [
  { month: "Jan", score: 72, target: 85 },
  { month: "Feb", score: 76, target: 85 },
  { month: "Mar", score: 78, target: 85 },
  { month: "Apr", score: 81, target: 85 },
  { month: "May", score: 83, target: 85 },
  { month: "Jun", score: 87, target: 85 },
  { month: "Jul", score: 89, target: 85 },
]

const policyActivityData = [
  { day: "Mon", reviewed: 4, uploaded: 2 },
  { day: "Tue", reviewed: 7, uploaded: 3 },
  { day: "Wed", reviewed: 5, uploaded: 1 },
  { day: "Thu", reviewed: 9, uploaded: 4 },
  { day: "Fri", reviewed: 6, uploaded: 2 },
  { day: "Sat", reviewed: 3, uploaded: 0 },
  { day: "Sun", reviewed: 2, uploaded: 1 },
]

const complianceChartConfig = {
  score: { label: "Score", color: "var(--chart-1)" },
  target: { label: "Target", color: "var(--chart-2)" },
} satisfies ChartConfig

const activityChartConfig = {
  reviewed: { label: "Reviewed", color: "var(--chart-1)" },
  uploaded: { label: "Uploaded", color: "var(--chart-3)" },
} satisfies ChartConfig

const recentPolicies = [
  { id: 1, title: "GDPR Data Processing Agreement", category: "Privacy", status: "compliant", updated: "2h ago", risk: "low" },
  { id: 2, title: "Employee Code of Conduct", category: "HR", status: "review", updated: "1d ago", risk: "medium" },
  { id: 3, title: "SOC 2 Security Policy", category: "Security", status: "compliant", updated: "3d ago", risk: "low" },
  { id: 4, title: "Data Retention Policy", category: "Data", status: "expired", updated: "5d ago", risk: "high" },
  { id: 5, title: "Vendor Risk Management", category: "Risk", status: "compliant", updated: "1w ago", risk: "low" },
]

const recentActivity = [
  { user: "Sarah K.", action: "uploaded", target: "ISO 27001 Policy", time: "10 min ago", initials: "SK" },
  { user: "Mark T.", action: "reviewed", target: "CCPA Compliance doc", time: "1h ago", initials: "MT" },
  { user: "AI Copilot", action: "analyzed", target: "Q3 Audit Report", time: "2h ago", initials: "AI" },
  { user: "Lisa P.", action: "approved", target: "Data Breach Protocol", time: "3h ago", initials: "LP" },
]

const deadlines = [
  { title: "Annual GDPR Review", date: "Jul 31", daysLeft: 16, priority: "high" },
  { title: "SOC 2 Type II Audit", date: "Aug 15", daysLeft: 31, priority: "medium" },
  { title: "Q3 Compliance Report", date: "Sep 1", daysLeft: 48, priority: "low" },
]

const aiRecommendations = [
  { title: "Update GDPR consent forms", description: "3 forms detected with outdated language", severity: "high" },
  { title: "Review data retention schedules", description: "2 policies may conflict with CCPA requirements", severity: "medium" },
  { title: "Renew vendor agreements", description: "4 vendor DPAs expire in 30 days", severity: "medium" },
]

const statusConfig = {
  compliant: { label: "Compliant", className: "bg-success/10 text-success border-success/20" },
  review: { label: "Under Review", className: "bg-warning/10 text-warning-foreground border-warning/20" },
  expired: { label: "Expired", className: "bg-destructive/10 text-destructive border-destructive/20" },
}


interface DashboardPageProps {
  onNavigate: (page: Page) => void
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <div className="flex flex-col gap-8 p-6 max-w-[1400px] mx-auto">
      {/* Hero Welcome */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Good morning, Jane</h1>
          <p className="text-sm text-muted-foreground mt-1">Here's what's happening with your policies today.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => onNavigate("upload")} className="gap-1.5">
            <Upload className="size-3.5" />
            Upload Policy
          </Button>
          <Button size="sm" onClick={() => onNavigate("copilot")} className="gap-1.5">
            <Sparkles className="size-3.5" />
            Ask AI
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard
          title="Compliance Score"
          value="89%"
          change="+4.2%"
          trend="up"
          icon={<ShieldCheck className="size-4" />}
          iconColor="text-primary"
          iconBg="bg-primary/10"
          description="vs last month"
        />
        <KPICard
          title="Total Policies"
          value="142"
          change="+12"
          trend="up"
          icon={<FileText className="size-4" />}
          iconColor="text-chart-2"
          iconBg="bg-chart-2/10"
          description="8 added this month"
        />
        <KPICard
          title="AI Analyses"
          value="38"
          change="+19"
          trend="up"
          icon={<Bot className="size-4" />}
          iconColor="text-chart-4"
          iconBg="bg-chart-4/10"
          description="this month"
        />
        <KPICard
          title="Open Issues"
          value="7"
          change="-3"
          trend="down"
          icon={<AlertTriangle className="size-4" />}
          iconColor="text-warning"
          iconBg="bg-warning/10"
          description="2 critical"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Compliance trend chart */}
        <Card className="xl:col-span-2 shadow-none border border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Compliance Trend</CardTitle>
                <CardDescription className="text-xs mt-0.5">Monthly compliance score vs target</CardDescription>
              </div>
              <Badge variant="outline" className="text-success border-success/30 bg-success/5 text-xs">
                <TrendingUp className="size-3 mr-1" />On Track
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={complianceChartConfig} className="h-52 w-full">
              <AreaChart data={complianceTrendData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-score)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--color-score)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-target)" stopOpacity={0.08} />
                    <stop offset="95%" stopColor="var(--color-target)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} domain={[60, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="target" stroke="var(--color-target)" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#targetGrad)" dot={false} />
                <Area type="monotone" dataKey="score" stroke="var(--color-score)" strokeWidth={2} fill="url(#scoreGrad)" dot={{ fill: "var(--color-score)", r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Deadlines */}
        <Card className="shadow-none border border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Upcoming Deadlines</CardTitle>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground">View all</Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {deadlines.map((d, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/40 transition-colors cursor-pointer">
                <div className={`flex items-center justify-center size-8 rounded-md text-xs font-bold shrink-0 ${
                  d.priority === "high" ? "bg-destructive/10 text-destructive" :
                  d.priority === "medium" ? "bg-warning/10 text-warning-foreground" :
                  "bg-success/10 text-success"
                }`}>
                  {d.daysLeft}d
                </div>
                <div className="flex flex-col min-w-0 gap-0.5">
                  <p className="text-sm font-medium leading-none truncate">{d.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="size-3" />{d.date}
                  </p>
                </div>
              </div>
            ))}

            <Separator />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>3 upcoming in next 60 days</span>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary">
                Manage <ArrowRight className="size-3 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* AI Recommendations */}
        <Card className="shadow-none border border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-md bg-primary/10">
                  <Sparkles className="size-3.5 text-primary" />
                </div>
                <CardTitle className="text-base font-semibold">AI Recommendations</CardTitle>
              </div>
              <Badge className="text-xs bg-primary/10 text-primary border-0 hover:bg-primary/10">3 new</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {aiRecommendations.map((rec, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg border border-border hover:bg-muted/40 transition-colors cursor-pointer group">
                <div className={`mt-0.5 size-1.5 rounded-full shrink-0 ${
                  rec.severity === "high" ? "bg-destructive" :
                  rec.severity === "medium" ? "bg-warning" : "bg-success"
                }`} />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-sm font-medium leading-snug">{rec.title}</p>
                  <p className="text-xs text-muted-foreground">{rec.description}</p>
                </div>
                <ChevronRight className="size-4 text-muted-foreground shrink-0 ml-auto self-center opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => onNavigate("copilot")} className="w-full gap-1.5 mt-1">
              <Bot className="size-3.5" />
              Ask AI for insights
            </Button>
          </CardContent>
        </Card>

        {/* Recent Policies */}
        <Card className="xl:col-span-2 shadow-none border border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Recent Policy Updates</CardTitle>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground gap-1" onClick={() => onNavigate("policies")}>
                View all <ChevronRight className="size-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col divide-y divide-border">
              {recentPolicies.map((policy) => {
                const s = statusConfig[policy.status as keyof typeof statusConfig]
                return (
                  <div key={policy.id} className="flex items-center gap-4 py-3 hover:bg-muted/30 -mx-2 px-2 rounded-lg transition-colors cursor-pointer group">
                    <div className="flex size-8 items-center justify-center rounded-md bg-muted shrink-0">
                      <FileText className="size-4 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1 gap-0.5">
                      <p className="text-sm font-medium leading-none truncate">{policy.title}</p>
                      <p className="text-xs text-muted-foreground">{policy.category} · {policy.updated}</p>
                    </div>
                    <Badge variant="outline" className={`text-xs shrink-0 ${s.className}`}>
                      {s.label}
                    </Badge>
                    <ChevronRight className="size-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Activity chart */}
        <Card className="shadow-none border border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Weekly Activity</CardTitle>
            <CardDescription className="text-xs">Policies reviewed and uploaded this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={activityChartConfig} className="h-44 w-full">
              <BarChart data={policyActivityData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }} barSize={10}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="reviewed" fill="var(--color-reviewed)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="uploaded" fill="var(--color-uploaded)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-none border border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="size-4 text-muted-foreground" />
                <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer -mx-2">
                <Avatar className="size-7 shrink-0">
                  <AvatarFallback className={`text-xs font-medium ${item.user === "AI Copilot" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {item.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm leading-snug">
                    <span className="font-medium">{item.user}</span>
                    <span className="text-muted-foreground"> {item.action} </span>
                    <span className="font-medium truncate">{item.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface KPICardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
  iconColor: string
  iconBg: string
  description: string
}

function KPICard({ title, value, change, trend, icon, iconColor, iconBg, description }: KPICardProps) {
  return (
    <Card className="shadow-none border border-border hover:shadow-sm transition-shadow">
      <CardContent className="pt-5 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className={`flex size-8 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
            {icon}
          </div>
          <div className={`flex items-center gap-0.5 text-xs font-medium ${trend === "up" ? "text-success" : "text-destructive"}`}>
            {trend === "up" ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {change}
          </div>
        </div>
        <div className="space-y-0.5">
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          <p className="text-xs text-muted-foreground">{title}</p>
          <p className="text-xs text-muted-foreground/70">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
