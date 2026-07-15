import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent,
} from "@/components/ui/chart"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts"
import {
  BarChart3, Download, Plus, FileText, Calendar,
  Users, Shield,
} from "lucide-react"
import type { ChartConfig } from "@/components/ui/chart"

const monthlyCompliance = [
  { month: "Jan", gdpr: 72, soc2: 80, iso: 65 },
  { month: "Feb", gdpr: 75, soc2: 82, iso: 68 },
  { month: "Mar", gdpr: 78, soc2: 84, iso: 70 },
  { month: "Apr", gdpr: 80, soc2: 85, iso: 73 },
  { month: "May", gdpr: 85, soc2: 86, iso: 75 },
  { month: "Jun", gdpr: 88, soc2: 87, iso: 77 },
  { month: "Jul", gdpr: 91, soc2: 87, iso: 78 },
]

const policyDistribution = [
  { name: "Compliant", value: 118, color: "var(--chart-2)" },
  { name: "Under Review", value: 17, color: "var(--chart-3)" },
  { name: "Expired", value: 7, color: "var(--chart-5)" },
]

const teamActivity = [
  { week: "W1", reviews: 12, uploads: 5, analyses: 8 },
  { week: "W2", reviews: 15, uploads: 7, analyses: 11 },
  { week: "W3", reviews: 10, uploads: 4, analyses: 9 },
  { week: "W4", reviews: 18, uploads: 8, analyses: 14 },
]

const complianceLineConfig = {
  gdpr: { label: "GDPR", color: "var(--chart-1)" },
  soc2: { label: "SOC 2", color: "var(--chart-2)" },
  iso: { label: "ISO 27001", color: "var(--chart-4)" },
} satisfies ChartConfig

const teamActivityConfig = {
  reviews: { label: "Reviews", color: "var(--chart-1)" },
  uploads: { label: "Uploads", color: "var(--chart-2)" },
  analyses: { label: "AI Analyses", color: "var(--chart-4)" },
} satisfies ChartConfig

const savedReports = [
  { id: 1, title: "Q2 2025 Compliance Summary", type: "Quarterly", generated: "Jun 30", status: "final" },
  { id: 2, title: "GDPR Gap Analysis", type: "Framework", generated: "Jun 15", status: "final" },
  { id: 3, title: "SOC 2 Readiness Report", type: "Audit Prep", generated: "Jun 1", status: "draft" },
  { id: 4, title: "Monthly Activity – June", type: "Activity", generated: "Jul 1", status: "final" },
]

export function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Analytics and compliance reporting</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Calendar className="size-3.5" />
            Jul 2025
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="size-3.5" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Reports Generated", value: "24", change: "+6 this month", icon: BarChart3, color: "text-primary", bg: "bg-primary/10" },
          { label: "Policies Reviewed", value: "89", change: "+23 this month", icon: FileText, color: "text-chart-2", bg: "bg-chart-2/10" },
          { label: "Team Members", value: "12", change: "Active reviewers", icon: Users, color: "text-chart-4", bg: "bg-chart-4/10" },
          { label: "Overall Score", value: "89%", change: "+4.2% this month", icon: Shield, color: "text-success", bg: "bg-success/10" },
        ].map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.label} className="shadow-none border border-border">
              <CardContent className="pt-5 pb-4">
                <div className={`flex size-8 items-center justify-center rounded-lg ${kpi.bg} ${kpi.color} mb-3`}>
                  <Icon className="size-4" />
                </div>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className="text-xs text-muted-foreground/70 mt-0.5">{kpi.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="activity">Team Activity</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="flex flex-col gap-6 mt-0">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Compliance trend */}
            <Card className="xl:col-span-2 shadow-none border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">Compliance Trend by Framework</CardTitle>
                <CardDescription className="text-xs">Monthly scores across major frameworks</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={complianceLineConfig} className="h-56 w-full">
                  <LineChart data={monthlyCompliance} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} domain={[60, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line type="monotone" dataKey="gdpr" stroke="var(--color-gdpr)" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    <Line type="monotone" dataKey="soc2" stroke="var(--color-soc2)" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    <Line type="monotone" dataKey="iso" stroke="var(--color-iso)" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Policy distribution */}
            <Card className="shadow-none border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">Policy Status</CardTitle>
                <CardDescription className="text-xs">Distribution by compliance status</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <ChartContainer config={{}} className="h-36 w-full">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie data={policyDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={65} dataKey="value" strokeWidth={0}>
                      {policyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="flex flex-col gap-2">
                  {policyDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full" style={{ background: item.color }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-0">
          <Card className="shadow-none border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Team Activity</CardTitle>
              <CardDescription className="text-xs">Weekly reviews, uploads, and AI analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={teamActivityConfig} className="h-64 w-full">
                <BarChart data={teamActivity} margin={{ top: 4, right: 4, bottom: 0, left: -20 }} barSize={14}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="reviews" fill="var(--color-reviews)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="uploads" fill="var(--color-uploads)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="analyses" fill="var(--color-analyses)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frameworks" className="mt-0">
          <Card className="shadow-none border border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center py-12">Framework-level analytics coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="mt-0">
          <Card className="shadow-none border border-border">
            <CardContent className="p-0">
              <div className="flex flex-col">
                {savedReports.map((report, i) => (
                  <div key={report.id} className={`flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors cursor-pointer group ${i > 0 ? "border-t border-border" : ""}`}>
                    <div className="flex size-8 items-center justify-center rounded-lg bg-muted shrink-0">
                      <BarChart3 className="size-4 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <p className="text-sm font-medium">{report.title}</p>
                      <p className="text-xs text-muted-foreground">{report.type} · Generated {report.generated}</p>
                    </div>
                    <Badge variant="outline" className={`text-xs ${report.status === "final" ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground"}`}>
                      {report.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="size-7 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="size-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
