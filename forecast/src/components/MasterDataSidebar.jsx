import { ChevronRight, BarChart3, TrendingUp, Package, Upload, Database, AlertTriangle } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader } from "./ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    isActive: false
  },
  {
    title: "TCA 예측",
    icon: TrendingUp,
    isActive: false
  },
  {
    title: "SKU 예측", 
    icon: Package,
    isActive: false
  },
  {
    title: "Upload",
    icon: Upload,
    isActive: false
  },
  {
    title: "Master",
    icon: Database,
    isActive: true
  },
  {
    title: "Issues",
    icon: AlertTriangle,
    isActive: false
  }
]

export function MasterDataSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded"></div>
          <span>SKU Master</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={item.isActive}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto w-4 h-4" />
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