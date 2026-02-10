"use client"

import { Bell, AlertTriangle } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { mockServersData } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useServer } from "@/contexts/ServerContext"

export default function AlertsCard() {
  const { selectedServer } = useServer()
  const serverData = selectedServer ? mockServersData[selectedServer.id] : undefined
  const alerts = serverData?.alerts || []

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <CardTitle>Recent Alerts</CardTitle>
        </div>
        <CardDescription>Critical notifications and system alerts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-4">
              <div className="mt-1">
                  <AlertTriangle className={cn(
                      "h-5 w-5",
                      alert.severity === 'High' && 'text-destructive',
                      alert.severity === 'Medium' && 'text-yellow-500',
                      alert.severity === 'Low' && 'text-blue-500'
                  )} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No recent alerts for this server.</p>
        )}
      </CardContent>
    </Card>
  )
}
