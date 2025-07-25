import { useLocation, Link } from "react-router-dom"
import { ChevronRight, BarChart3, TrendingUp, Package, Upload, Database, AlertTriangle } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader } from "./ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    path: "/"
  },
  {
    title: "TCA 예측",
    icon: TrendingUp,
    path: "/tca-forecast"
  },
  {
    title: "SKU 예측", 
    icon: Package,
    path: "/sku-forecast"
  },
  {
    title: "Upload",
    icon: Upload,
    path: "/upload"
  },
  {
    title: "Master",
    icon: Database,
    path: "/master"
  },
  {
    title: "Issues",
    icon: AlertTriangle,
    path: "/issues"
  }
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded"></div>
          <span>TCA Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={location.pathname === item.path}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to={item.path}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto w-4 h-4" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}