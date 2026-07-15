import { useState } from "react"
import { AppShell } from "@/components/layout/AppShell"
import { DashboardPage } from "@/pages/DashboardPage"
import { CopilotPage } from "@/pages/CopilotPage"
import { PoliciesPage } from "@/pages/PoliciesPage"
import { UploadPage } from "@/pages/UploadPage"
import { CompliancePage } from "@/pages/CompliancePage"
import { ReportsPage } from "@/pages/ReportsPage"
import { TeamPage } from "@/pages/TeamPage"
import { BillingPage } from "@/pages/BillingPage"
import { SettingsPage } from "@/pages/SettingsPage"
import { SearchPage } from "@/pages/SearchPage"

export type Page =
  | "dashboard"
  | "copilot"
  | "policies"
  | "search"
  | "compliance"
  | "reports"
  | "team"
  | "billing"
  | "settings"
  | "upload"

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <DashboardPage onNavigate={setCurrentPage} />
      case "copilot": return <CopilotPage />
      case "policies": return <PoliciesPage />
      case "search": return <SearchPage />
      case "compliance": return <CompliancePage />
      case "reports": return <ReportsPage />
      case "team": return <TeamPage />
      case "billing": return <BillingPage />
      case "settings": return <SettingsPage />
      case "upload": return <UploadPage />
      default: return <DashboardPage onNavigate={setCurrentPage} />
    }
  }

  return (
    <AppShell currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </AppShell>
  )
}
