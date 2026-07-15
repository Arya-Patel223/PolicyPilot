import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  ShieldCheck, AlertTriangle, CheckCircle2, Clock, ChevronRight,
  TrendingUp, Bot, Download,
} from "lucide-react"
import type { ChartConfig } from "@/components/ui/chart"

const frameworkData = [
  { framework: "GDPR", score: 91, status: "compliant", controls: 42, passing: 38, failing: 4, color: "text-success" },
  { framework: "SOC 2 Type II", score: 87, status: "compliant", controls: 64, passing: 55, failing: 9, color: "text-success" },
  { framework: "ISO 27001", score: 78, status: "partial", controls: 93, passing: 72, failing: 21, color: "text-warning-foreground" },
  { framework: "CCPA", score: 83, status: "compliant", controls: 28, passing: 23, failing: 5, color: "text-success" },
  { framework: "HIPAA", score: 62, status: "partial", controls: 54, passing: 33, failing: 21, color: "text-warning-foreground" },
]

const radarData = [
  { subject: "Data Privacy", value: 91 },
  { subject: "Access Control", value: 85 },
  { subject: "Incident Response", value: 78 },
  { subject: "Vendor Mgmt", value: 72 },
  { subject: "Audit & Logging", value: 88 },
  { subject: "Training", value: 65 },
]

const controlGapsData = [
  { framework: "GDPR", gaps: 4 },
  { framework: "SOC 2", gaps: 9 },
  { framework: "ISO 27001", gaps: 21 },
  { framework: "CCPA", gaps: 5 },
  { framework: "HIPAA", gaps: 21 },
]

const radarConfig = { value: { label: "Score", color: "var(--chart-1)" } } satisfies ChartConfig
const gapsConfig = { gaps: { label: "Control Gaps", color: "var(--chart-5)" } } satisfies ChartConfig

const openIssues = [
  { id: 1, title: "Update data subject request forms for GDPR Article 15", framework: "GDPR", severity: "high", dueDate: "Jul 31" },
  { id: 2, title: "Implement multi-factor authentication for all admin accounts", framework: "SOC 2", severity: "high", dueDate: "Aug 1" },
  { id: 3, title: "Complete ISO 27001 risk assessment documentation", framework: "ISO 27001", severity: "medium", dueDate: "Aug 15" },
  { id: 4, title: "Update vendor assessment questionnaires", framework: "SOC 2", severity: "medium", dueDate: "Aug 20" },
  { id: 5, title: "Review and update HIPAA training materials", framework: "HIPAA", severity: "low", dueDate: "Sep 1" },
]

const severityConfig = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-warning/10 text-warning-foreground border-warning/20",
  low: "bg-success/10 text-success border-success/20",
}

export function CompliancePage() {
  const overallScore = Math.round(frameworkData.reduce((a, b) => a + b.score, 0) / frameworkData.length)

  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Compliance Center</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Monitor compliance across frameworks and identify gaps</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="size-3.5" />Export Report
          </Button>
          <Button size="sm" className="gap-1.5">
            <Bot className="size-3.5" />AI Analysis
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
        <Card className="shadow-none border border-border lg:col-span-2">
          <CardContent className="pt-6 pb-5">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="relative flex size-28 items-center justify-center">
                <svg className="absolute inset-0 -rotate-90 size-28" viewBox="0 0 112 112">
                  <circle cx="56" cy="56" r="50" fill="none" stroke="var(--border)" strokeWidth="8" />
                  <circle
                    cx="56" cy="56" r="50" fill="none"
                    stroke={overallScore >= 85 ? "var(--success)" : overallScore >= 70 ? "var(--warning)" : "var(--destructive)"}
                    strokeWidth="8"
                    strokeDasharray={`${(overallScore / 100) * 314} 314`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold">{overallScore}%</span>
                  <span className="text-xs text-muted-foreground">overall</span>
                </div>
              </div>
              <div>
                <p className="text-base font-semibold">Compliance Score</p>
                <p className="text-xs text-muted-foreground mt-0.5">Across {frameworkData.length} frameworks</p>
              </div>
              <Badge variant="outline" className="text-success border-success/30 bg-success/5 gap-1">
                <TrendingUp className="size-3" />+4.2% this month
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {frameworkData.map((fw) => (
            <Card key={fw.framework} className="shadow-none border border-border hover:shadow-sm transition-shadow cursor-pointer">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className={`size-4 ${fw.color}`} />
                    <span className="text-sm font-semibold">{fw.framework}</span>
                  </div>
                  <span className={`text-sm font-bold ${fw.color}`}>{fw.score}%</span>
                </div>
                <Progress value={fw.score} className="h-1.5 mb-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><CheckCircle2 className="size-3 text-success" />{fw.passing} passing</span>
                  <span className="flex items-center gap-1"><AlertTriangle className="size-3 text-destructive" />{fw.failing} gaps</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="shadow-none border border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Compliance Coverage</CardTitle>
            <CardDescription className="text-xs">Scores across compliance domains</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={radarConfig} className="h-56 w-full">
              <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Radar name="Score" dataKey="value" stroke="var(--color-value)" fill="var(--color-value)" fillOpacity={0.15} strokeWidth={2} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-none border border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Control Gaps by Framework</CardTitle>
            <CardDescription className="text-xs">Number of failing controls per framework</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={gapsConfig} className="h-56 w-full">
              <BarChart data={controlGapsData} layout="vertical" margin={{ top: 4, right: 4, bottom: 0, left: 20 }} barSize={14}>
                <CartesianGrid horizontal={false} strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis type="category" dataKey="framework" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="gaps" fill="var(--color-gaps)" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-none border border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Open Compliance Issues</CardTitle>
              <CardDescription className="text-xs mt-0.5">{openIssues.length} issues requiring attention</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1">
              View all <ChevronRight className="size-3.5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col">
            {openIssues.map((issue, i) => (
              <div key={issue.id} className={`flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors cursor-pointer group ${i > 0 ? "border-t border-border" : ""}`}>
                <div className={`size-1.5 rounded-full shrink-0 ${
                  issue.severity === "high" ? "bg-destructive" :
                  issue.severity === "medium" ? "bg-warning" : "bg-success"
                }`} />
                <p className="text-sm font-medium flex-1">{issue.title}</p>
                <Badge variant="outline" className="text-xs shrink-0">{issue.framework}</Badge>
                <Badge variant="outline" className={`text-xs shrink-0 capitalize ${severityConfig[issue.severity as keyof typeof severityConfig]}`}>
                  {issue.severity}
                </Badge>
                <span className="text-xs text-muted-foreground shrink-0 flex items-center gap-1">
                  <Clock className="size-3" />Due {issue.dueDate}
                </span>
                <ChevronRight className="size-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
