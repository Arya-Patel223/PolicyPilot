import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Users, UserPlus, MoreHorizontal, Mail, Crown, Shield, Eye,
  Trash2, Search, CheckCircle2, Clock,
} from "lucide-react"

const team = [
  { id: 1, name: "Jane Doe", email: "jane@acme.com", role: "admin", initials: "JD", status: "active", lastActive: "Just now", policies: 42 },
  { id: 2, name: "Sarah Kim", email: "sarah@acme.com", role: "editor", initials: "SK", status: "active", lastActive: "2h ago", policies: 28 },
  { id: 3, name: "Mark Thompson", email: "mark@acme.com", role: "editor", initials: "MT", status: "active", lastActive: "1d ago", policies: 19 },
  { id: 4, name: "Lisa Park", email: "lisa@acme.com", role: "viewer", initials: "LP", status: "active", lastActive: "3d ago", policies: 7 },
  { id: 5, name: "Tom Rivera", email: "tom@acme.com", role: "editor", initials: "TR", status: "invited", lastActive: "—", policies: 0 },
  { id: 6, name: "Amy Chen", email: "amy@acme.com", role: "viewer", initials: "AC", status: "inactive", lastActive: "2w ago", policies: 3 },
]

const roleConfig = {
  admin: { label: "Admin", icon: Crown, className: "bg-primary/10 text-primary border-primary/20" },
  editor: { label: "Editor", icon: Shield, className: "bg-success/10 text-success border-success/20" },
  viewer: { label: "Viewer", icon: Eye, className: "bg-muted text-muted-foreground border-border" },
}

const statusConfig = {
  active: { className: "bg-success/10 text-success border-success/20", label: "Active" },
  invited: { className: "bg-warning/10 text-warning-foreground border-warning/20", label: "Invited" },
  inactive: { className: "bg-muted text-muted-foreground border-border", label: "Inactive" },
}

export function TeamPage() {
  const [search, setSearch] = useState("")
  const filtered = team.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.includes(search.toLowerCase()))

  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{team.length} members · Manage access and permissions</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <UserPlus className="size-3.5" />
          Invite Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Members", value: team.length.toString(), icon: Users },
          { label: "Active Now", value: team.filter(m => m.status === "active").length.toString(), icon: CheckCircle2 },
          { label: "Pending Invites", value: team.filter(m => m.status === "invited").length.toString(), icon: Clock },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="shadow-none border border-border">
              <CardContent className="pt-4 pb-3 px-4 flex items-center gap-3">
                <Icon className="size-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xl font-bold leading-none">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="shadow-none border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-8 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border">
                <TableHead className="pl-6 text-xs font-semibold text-muted-foreground">Member</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Role</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Status</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Last Active</TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">Policies</TableHead>
                <TableHead className="pr-6 w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((member) => {
                const role = roleConfig[member.role as keyof typeof roleConfig]
                const status = statusConfig[member.status as keyof typeof statusConfig]
                const RoleIcon = role.icon
                return (
                  <TableRow key={member.id} className="group hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">{member.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">{member.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                            <Mail className="size-2.5" />{member.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs gap-1 ${role.className}`}>
                        <RoleIcon className="size-3" />{role.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${status.className}`}>{status.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground">{member.lastActive}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground">{member.policies}</span>
                    </TableCell>
                    <TableCell className="pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-7 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="size-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem>Change Role</DropdownMenuItem>
                          <DropdownMenuItem>View Activity</DropdownMenuItem>
                          <DropdownMenuItem>Resend Invite</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="size-3.5" />Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
