import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { AppSidebar } from "./components/AppSidebar"
import { DashboardPage } from "./pages/DashboardPage"
import { TCAForecastPage } from "./pages/TCAForecastPage"
import { SKUForecastPage } from "./pages/SKUForecastPage"
import { UploadPage } from "./pages/UploadPage"
import { MasterPage } from "./pages/MasterPage"
import { IssuesPage } from "./pages/IssuesPage"

export default function App() {
  return (
    <Router>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 flex flex-col">
            <header className="border-b border-border p-4 flex items-center gap-2">
              <SidebarTrigger />
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