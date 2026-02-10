"use client"

import { useState, useMemo } from "react"
import { FileText } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockServersData } from "@/lib/data"
import type { EventLog } from "@/lib/types"
import { useServer } from "@/contexts/ServerContext"

type LogLevel = "All" | "Error" | "Warning" | "Info"

export default function EventLogViewer() {
  const { selectedServer } = useServer()
  const [activeTab, setActiveTab] = useState<LogLevel>("All")
  
  const serverData = selectedServer ? mockServersData[selectedServer.id] : undefined
  const eventLogs = serverData?.eventLogs || []

  const filteredLogs = useMemo(() => {
    if (activeTab === "All") return eventLogs
    return eventLogs.filter((log) => log.level === activeTab)
  }, [activeTab, eventLogs])

  const getBadgeVariant = (level: EventLog["level"]) => {
    switch (level) {
      case "Error":
        return "destructive"
      case "Warning":
        return "default"
      case "Info":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <CardTitle>Event Log Viewer</CardTitle>
          </div>
        </div>
        <CardDescription>
          View and filter system, application, and security logs for {selectedServer?.hostname || 'the selected server'}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as LogLevel)}>
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Error">Error</TabsTrigger>
            <TabsTrigger value="Warning">Warning</TabsTrigger>
            <TabsTrigger value="Info">Info</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            <ScrollArea className="h-96">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Level</TableHead>
                    <TableHead className="w-[180px]">Timestamp</TableHead>
                    <TableHead className="w-[120px]">Source</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <Badge variant={getBadgeVariant(log.level)}>{log.level}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                        <TableCell className="font-medium">{log.source}</TableCell>
                        <TableCell>{log.message}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No event logs for this server or filter.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
