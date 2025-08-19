import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { AppSidebar } from "./components/AppSidebar"
import { LoginPage } from "./pages/LoginPage"
import { DashboardPage } from "./pages/DashboardPage"
import { TCAForecastPage } from "./pages/TCAForecastPage"
import { SKUForecastPage } from "./pages/SKUForecastPage"
import { UploadPage } from "./pages/UploadPage"
import { MasterPage } from "./pages/MasterPage"
import { IssuesPage } from "./pages/IssuesPage"
import { Button } from "./components/ui/button"
import { LogOut, User } from "lucide-react"
import { Avatar, AvatarFallback } from "./components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/dropdown-menu"
import "./styles/globals.css"


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      const rememberLogin = localStorage.getItem("rememberLogin")
      const userEmail = localStorage.getItem("userEmail")
      const sessionAuth = sessionStorage.getItem("currentUser")

      if (rememberLogin && userEmail) {
        // Auto-login from localStorage
        setUser({ email: userEmail, rememberMe: true })
        setIsAuthenticated(true)
      } else if (sessionAuth) {
        // Restore session
        const userData = JSON.parse(sessionAuth)
        setUser(userData)
        setIsAuthenticated(true)
      }
      
      setIsLoading(false)
    }

    checkAuthStatus()
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    
    // Store session data
    sessionStorage.setItem("currentUser", JSON.stringify(userData))
    
    // Store persistent data if remember me is checked
    if (userData.rememberMe) {
      localStorage.setItem("rememberLogin", "true")
      localStorage.setItem("userEmail", userData.email)
    }
  }

  const handleLogout = () => {
    // Clear all stored auth data
    localStorage.removeItem("rememberLogin")
    localStorage.removeItem("userEmail")
    sessionStorage.removeItem("currentUser")
    
    // Reset state
    setUser(null)
    setIsAuthenticated(false)
  }

  const getUserInitials = (email) => {
    if (!email) return "U"
    const name = email.split("@")[0]
    return name.slice(0, 2).toUpperCase()
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    )
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  // Main dashboard application
  return (
    <Router>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 flex flex-col">
            <header className="border-b border-border p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
              </div>
              
              {/* User Menu */}
              <div className="flex items-center gap-4">
                <div className="md:block text-sm text-muted-foreground">
                  안녕하세요, {user?.email?.split("@")[0] || "사용자"}님
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {getUserInitials(user?.email || "")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">
                        {user?.email?.split("@")[0] || "사용자"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      프로필 설정
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600 focus:text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
            
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/tca-forecast" element={<TCAForecastPage />} />
                <Route path="/sku-forecast" element={<SKUForecastPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/master" element={<MasterPage />} />
                <Route path="/issues" element={<IssuesPage />} />
                {/* Catch all route to redirect to dashboard */}
                <Route path="*" element={<DashboardPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </Router>
  )
}