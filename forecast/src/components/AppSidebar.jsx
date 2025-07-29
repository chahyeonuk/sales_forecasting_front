import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import { 
  BarChart3, 
  TrendingUp, 
  Upload, 
  AlertTriangle, 
  Settings,
  Home
} from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "TCA 예측",
    url: "/tca-forecast", 
    icon: BarChart3,
  },
  {
    title: "SKU 예측",
    url: "/sku-forecast",
    icon: TrendingUp,
  },
  {
    title: "Upload",
    url: "/upload",
    icon: Upload,
  },
  {
    title: "Issues",
    url: "/issues",
    icon: AlertTriangle,
  },
  {
    title: "Master",
    url: "/master",
    icon: Settings,
  },
]

export function AppSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-3 py-2">
          <h2 className="text-lg font-semibold">TCA Forecast</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                    onClick={() => navigate(item.url)}
                  >
                    <div className="flex items-center gap-2 cursor-pointer">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-2 text-xs text-muted-foreground">
          Version 1.0.0
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}