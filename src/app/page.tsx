import AppSidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import PerformanceCharts from "@/components/dashboard/performance-charts"
import ProcessList from "@/components/dashboard/process-list"
import ServiceStatus from "@/components/dashboard/service-status"
import AlertsCard from "@/components/dashboard/alerts-card"
import EventLogViewer from "@/components/dashboard/event-log-viewer"
import { ServerProvider } from "@/contexts/ServerContext"

export default function DashboardPage() {
  return (
    <ServerProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background">
          <Header />
          <main className="p-4 sm:p-6 lg:p-8 space-y-6">
            <PerformanceCharts />
            <div className="grid gap-6 lg:grid-cols-3">
              <ProcessList />
              <div className="lg:col-span-1 space-y-6">
                <ServiceStatus />
                <AlertsCard />
              </div>
            </div>
            <EventLogViewer />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ServerProvider>
  )
}
