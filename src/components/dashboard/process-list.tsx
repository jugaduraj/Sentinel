"use client"

import { Activity } from "lucide-react"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockServersData } from "@/lib/data"
import { useServer } from "@/contexts/ServerContext"

export default function ProcessList() {
  const { selectedServer } = useServer()
  const serverData = selectedServer ? mockServersData[selectedServer.id] : undefined
  const processes = serverData?.processes || []

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          <CardTitle>Process Monitor</CardTitle>
        </div>
        <CardDescription>
          A list of currently running processes and their resource consumption.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Process Name</TableHead>
                <TableHead className="text-right">PID</TableHead>
                <TableHead className="text-right">CPU (%)</TableHead>
                <TableHead className="text-right">Memory (MB)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processes.length > 0 ? (
                processes.map((process) => (
                  <TableRow key={process.pid}>
                    <TableCell className="font-medium">{process.name}</TableCell>
                    <TableCell className="text-right">{process.pid}</TableCell>
                    <TableCell className="text-right">{process.cpu.toFixed(1)}</TableCell>
                    <TableCell className="text-right">{process.memory.toFixed(1)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No running processes to display.
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
