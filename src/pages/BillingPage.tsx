import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  CreditCard, CheckCircle2, Zap,
  Receipt, Download,
} from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: 49,
    description: "For small teams getting started",
    features: ["Up to 5 users", "50 documents", "Basic AI analysis", "Email support"],
    current: false,
    cta: "Downgrade",
  },
  {
    name: "Professional",
    price: 149,
    description: "For growing compliance teams",
    features: ["Up to 20 users", "500 documents", "Advanced AI analysis", "Priority support", "API access", "Custom reports"],
    current: true,
    cta: "Current Plan",
  },
  {
    name: "Enterprise",
    price: null,
    description: "For large organizations",
    features: ["Unlimited users", "Unlimited documents", "Custom AI training", "Dedicated support", "SSO & SCIM", "SLA guarantee"],
    current: false,
    cta: "Contact Sales",
  },
]

const invoices = [
  { id: "INV-2025-007", date: "Jul 1, 2025", amount: "$149.00", status: "paid" },
  { id: "INV-2025-006", date: "Jun 1, 2025", amount: "$149.00", status: "paid" },
  { id: "INV-2025-005", date: "May 1, 2025", amount: "$149.00", status: "paid" },
  { id: "INV-2025-004", date: "Apr 1, 2025", amount: "$149.00", status: "paid" },
]

export function BillingPage() {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1000px] mx-auto">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your subscription and payment methods</p>
      </div>

      {/* Current plan summary */}
      <Card className="shadow-none border border-border">
        <CardContent className="py-5 px-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <Zap className="size-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold">Professional Plan</p>
                  <Badge className="text-xs bg-primary/10 text-primary border-0 hover:bg-primary/10">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">$149/mo · Renews August 1, 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm">Change Plan</Button>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Cancel</Button>
            </div>
          </div>

          <Separator className="my-5" />

          {/* Usage */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Users", used: 8, total: 20 },
              { label: "Documents", used: 142, total: 500 },
              { label: "AI Queries", used: 380, total: 1000 },
            ].map((u) => (
              <div key={u.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{u.label}</span>
                  <span className="font-medium">{u.used} / {u.total}</span>
                </div>
                <Progress value={(u.used / u.total) * 100} className="h-1.5" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plans */}
      <div>
        <h2 className="text-base font-semibold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`shadow-none ${plan.current ? "border-primary ring-2 ring-primary/20" : "border-border"} relative`}
            >
              {plan.current && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                  <Badge className="text-xs bg-primary text-primary-foreground">Current Plan</Badge>
                </div>
              )}
              <CardContent className="pt-6 pb-5">
                <div className="mb-4">
                  <p className="text-base font-semibold">{plan.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{plan.description}</p>
                </div>
                <div className="mb-5">
                  {plan.price ? (
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-sm text-muted-foreground mb-1">/mo</span>
                    </div>
                  ) : (
                    <p className="text-2xl font-bold">Custom</p>
                  )}
                </div>
                <div className="flex flex-col gap-2 mb-6">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="size-3.5 text-success shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <Button
                  variant={plan.current ? "secondary" : "default"}
                  size="sm"
                  className="w-full"
                  disabled={plan.current}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment method */}
      <Card className="shadow-none border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">Payment Method</CardTitle>
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5">
              <CreditCard className="size-3.5" />Add new
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex items-center gap-4 py-3">
          <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted">
            <CreditCard className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">Visa ending in 4242</p>
            <p className="text-xs text-muted-foreground">Expires 08/2027</p>
          </div>
          <Badge variant="outline" className="ml-auto text-xs bg-success/10 text-success border-success/20">Default</Badge>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card className="shadow-none border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Billing History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {invoices.map((inv, i) => (
            <div key={inv.id} className={`flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors ${i > 0 ? "border-t border-border" : ""}`}>
              <Receipt className="size-4 text-muted-foreground shrink-0" />
              <p className="text-sm font-medium flex-1">{inv.id}</p>
              <span className="text-xs text-muted-foreground">{inv.date}</span>
              <span className="text-sm font-medium">{inv.amount}</span>
              <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">{inv.status}</Badge>
              <Button variant="ghost" size="icon" className="size-7">
                <Download className="size-3.5" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
