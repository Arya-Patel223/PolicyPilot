import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Key,
  Copy, Eye, EyeOff,
} from "lucide-react"

export function SettingsPage() {
  const [showKey, setShowKey] = useState(false)
  const [notifications, setNotifications] = useState({
    policyExpiry: true,
    complianceAlerts: true,
    weeklyReport: false,
    teamUpdates: true,
    aiInsights: true,
  })

  return (
    <div className="flex flex-col gap-6 p-6 max-w-[800px] mx-auto">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your account and workspace preferences</p>
      </div>

      <Tabs defaultValue="profile" orientation="horizontal">
        <TabsList className="mb-6 h-9">
          <TabsTrigger value="profile" className="text-sm">Profile</TabsTrigger>
          <TabsTrigger value="workspace" className="text-sm">Workspace</TabsTrigger>
          <TabsTrigger value="notifications" className="text-sm">Notifications</TabsTrigger>
          <TabsTrigger value="security" className="text-sm">Security</TabsTrigger>
          <TabsTrigger value="api" className="text-sm">API</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="mt-0 flex flex-col gap-5">
          <Card className="shadow-none border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <Avatar className="size-16">
                  <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                  <p className="text-xs text-muted-foreground mt-1.5">JPG, PNG up to 2MB</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">First Name</label>
                  <Input defaultValue="Jane" className="h-9" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Last Name</label>
                  <Input defaultValue="Doe" className="h-9" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Email Address</label>
                <Input defaultValue="jane@acme.com" type="email" className="h-9" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Job Title</label>
                <Input defaultValue="Chief Compliance Officer" className="h-9" />
              </div>
              <div className="flex justify-end">
                <Button size="sm">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workspace */}
        <TabsContent value="workspace" className="mt-0 flex flex-col gap-5">
          <Card className="shadow-none border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold">Workspace Settings</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Organization Name</label>
                <Input defaultValue="Acme Corporation" className="h-9" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Industry</label>
                <Select defaultValue="tech">
                  <SelectTrigger className="h-9 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Default Compliance Frameworks</label>
                <div className="flex flex-wrap gap-2 p-3 rounded-md border border-border bg-muted/30">
                  {["GDPR", "SOC 2", "ISO 27001", "CCPA"].map((f) => (
                    <Badge key={f} variant="outline" className="text-xs gap-1 cursor-pointer hover:bg-destructive/10">
                      {f} ×
                    </Badge>
                  ))}
                  <Button variant="ghost" size="sm" className="h-5 text-xs text-muted-foreground px-1.5">+ Add</Button>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Timezone</p>
                  <p className="text-xs text-muted-foreground">Used for scheduling reports and reminders</p>
                </div>
                <Select defaultValue="utc">
                  <SelectTrigger className="h-8 w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">EST (UTC-5)</SelectItem>
                    <SelectItem value="pst">PST (UTC-8)</SelectItem>
                    <SelectItem value="cet">CET (UTC+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button size="sm">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-0 flex flex-col gap-5">
          <Card className="shadow-none border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold">Notification Preferences</CardTitle>
              <CardDescription className="text-xs">Choose what you want to be notified about</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-0 divide-y divide-border">
              {[
                { key: "policyExpiry", title: "Policy Expiry Alerts", desc: "Get notified when policies are about to expire" },
                { key: "complianceAlerts", title: "Compliance Alerts", desc: "Critical compliance issues and control failures" },
                { key: "weeklyReport", title: "Weekly Summary Report", desc: "Receive a weekly email digest" },
                { key: "teamUpdates", title: "Team Activity", desc: "When team members upload or modify policies" },
                { key: "aiInsights", title: "AI Insights", desc: "New AI-generated recommendations and analyses" },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[n.key as keyof typeof notifications]}
                    onCheckedChange={(v) => setNotifications((prev) => ({ ...prev, [n.key]: v }))}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-0 flex flex-col gap-5">
          <Card className="shadow-none border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold">Password</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Current Password</label>
                <Input type="password" placeholder="••••••••" className="h-9" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">New Password</label>
                  <Input type="password" placeholder="••••••••" className="h-9" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Confirm Password</label>
                  <Input type="password" placeholder="••••••••" className="h-9" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button size="sm">Update Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold">Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm">Authenticator App</p>
                <p className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs text-muted-foreground">Not Configured</Badge>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API */}
        <TabsContent value="api" className="mt-0 flex flex-col gap-5">
          <Card className="shadow-none border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-semibold">API Keys</CardTitle>
              <CardDescription className="text-xs">Use these keys to authenticate with the PolicyPilot API</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Production API Key</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-muted/30 font-mono text-xs text-muted-foreground">
                    {showKey ? "pp_live_sk_1234567890abcdef..." : "••••••••••••••••••••••••"}
                  </div>
                  <Button variant="outline" size="icon" className="size-9 shrink-0" onClick={() => setShowKey(!showKey)}>
                    {showKey ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  </Button>
                  <Button variant="outline" size="icon" className="size-9 shrink-0">
                    <Copy className="size-3.5" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-xs text-muted-foreground">Created Jul 1, 2025 · Last used 2h ago</p>
                </div>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Revoke</Button>
              </div>
              <Separator />
              <Button variant="outline" size="sm" className="w-fit gap-1.5">
                <Key className="size-3.5" />
                Generate New Key
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
