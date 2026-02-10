"use client"

import { Server } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { mockServersData } from "@/lib/data"
import { ScrollArea } from "../ui/scroll-area"
import { useServer } from "@/contexts/ServerContext"

export default function ServiceStatus() {
  const { selectedServer } = useServer()
  const serverData = selectedServer ? mockServersData[selectedServer.id] : undefined
  const services = serverData?.services || []

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            <CardTitle>Service Status</CardTitle>
        </div>
        <CardDescription>Monitor the status of Windows services.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length > 0 ? (
                services.map((service) => (
                  <TableRow key={service.name}>
                    <TableCell className="font-medium truncate" title={service.displayName}>
                      {service.displayName}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={service.status === "Running" ? "default" : "secondary"}
                        className={service.status === "Running" ? "bg-green-500/20 text-green-700 border-green-500/30 hover:bg-green-500/30" : "bg-red-500/10 text-red-700 border-red-500/20 hover:bg-red-500/20"}
                      >
                        {service.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center">
                    No services to display.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
