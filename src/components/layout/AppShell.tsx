import { type ReactNode } from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import {
  LayoutDashboard,
  Bot,
  FileText,
  Search,
  ShieldCheck,
  BarChart3,
  Users,
  CreditCard,
  Settings,
  Upload,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Sparkles,
} from "lucide-react"
import type { Page } from "@/App"

const navItems = [
  {
    group: "Main",
    items: [
      { id: "dashboard" as Page, label: "Dashboard", icon: LayoutDashboard },
      { id: "copilot" as Page, label: "AI Copilot", icon: Bot, badge: "AI" },
    ],
  },
  {
    group: "Documents",
    items: [
      { id: "policies" as Page, label: "Policies", icon: FileText },
      { id: "search" as Page, label: "Search", icon: Search },
      { id: "upload" as Page, label: "Upload", icon: Upload },
    ],
  },
  {
    group: "Governance",
    items: [
      { id: "compliance" as Page, label: "Compliance", icon: ShieldCheck },
      { id: "reports" as Page, label: "Reports", icon: BarChart3 },
    ],
  },
  {
    group: "Account",
    items: [
      { id: "team" as Page, label: "Team", icon: Users },
      { id: "billing" as Page, label: "Billing", icon: CreditCard },
      { id: "settings" as Page, label: "Settings", icon: Settings },
    ],
  },
]

interface AppShellProps {
  children: ReactNode
  currentPage: Page
  onNavigate: (page: Page) => void
}

function PolicyPilotLogo() {
  const { open } = useSidebar()
  return (
    <div className="flex items-center gap-2.5 px-2 py-1">
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shrink-0">
        <ShieldCheck className="size-4" />
      </div>
      {open && (
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold tracking-tight text-foreground leading-none">PolicyPilot</span>
          <span className="text-[10px] text-muted-foreground leading-none mt-0.5">Enterprise</span>
        </div>
      )}
    </div>
  )
}

export function AppShell({ children, currentPage, onNavigate }: AppShellProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="border-b border-sidebar-border pb-3">
          <PolicyPilotLogo />
        </SidebarHeader>

        <SidebarContent className="gap-0">
          {navItems.map((group) => (
            <SidebarGroup key={group.group} className="py-2">
              <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 px-3 mb-1">
                {group.group}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const Icon = item.icon
                    const isActive = currentPage === item.id
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          isActive={isActive}
                          onClick={() => onNavigate(item.id)}
                          tooltip={item.label}
                          className="group/nav-item"
                        >
                          <Icon className="shrink-0" />
                          <span>{item.label}</span>
                          {item.badge && (
                            <Badge variant="default" className="ml-auto h-4 px-1 text-[9px] bg-primary/15 text-primary hover:bg-primary/15 border-0">
                              {item.badge}
                            </Badge>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border pt-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" tooltip="Account" className="data-[state=open]:bg-sidebar-accent">
                    <Avatar className="size-6 shrink-0">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0 leading-none">
                      <span className="text-sm font-medium truncate">Jane Doe</span>
                      <span className="text-xs text-muted-foreground truncate">jane@acme.com</span>
                    </div>
                    <ChevronDown className="ml-auto size-3.5 text-muted-foreground shrink-0" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">Jane Doe</p>
                      <p className="text-xs text-muted-foreground">jane@acme.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><User className="size-4" />Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate("settings")}><Settings className="size-4" />Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive"><LogOut className="size-4" />Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        {/* Top navigation bar */}
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/95 backdrop-blur-sm px-4">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground -ml-1" />
          <Separator orientation="vertical" className="h-5" />

          {/* Search */}
          <button
            onClick={() => onNavigate("search")}
            className="hidden md:flex items-center gap-2 h-8 px-3 rounded-md border border-border bg-muted/40 text-muted-foreground text-sm hover:bg-muted hover:text-foreground transition-colors flex-1 max-w-xs"
          >
            <Search className="size-3.5 shrink-0" />
            <span>Search policies...</span>
            <div className="ml-auto flex items-center gap-0.5">
              <kbd className="inline-flex items-center justify-center size-5 rounded bg-background border border-border text-[10px] font-medium">⌘</kbd>
              <kbd className="inline-flex items-center justify-center size-5 rounded bg-background border border-border text-[10px] font-medium">K</kbd>
            </div>
          </button>

          <div className="ml-auto flex items-center gap-1">
            {/* AI Quick access */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("copilot")}
              className="hidden md:flex items-center gap-1.5 text-muted-foreground hover:text-foreground h-8 px-2.5"
            >
              <Sparkles className="size-3.5" />
              <span className="text-sm">Ask AI</span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative size-8 text-muted-foreground hover:text-foreground">
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
            </Button>

            {/* Theme toggle */}
            <ModeToggle />

            {/* Avatar */}
            <Avatar className="size-7 cursor-pointer ring-2 ring-border hover:ring-primary/50 transition-all">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
