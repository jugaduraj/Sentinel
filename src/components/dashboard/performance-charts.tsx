"use client"

import { useState, useEffect, useMemo } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Cpu, MemoryStick, Database, Network } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { PerformanceMetric } from "@/lib/types"
import { mockServersData } from "@/lib/data"
import { useServer } from "@/contexts/ServerContext"

const ICONS: Record<PerformanceMetric['name'], JSX.Element> = {
  CPU: <Cpu className="h-6 w-6 text-muted-foreground" />,
  Memory: <MemoryStick className="h-6 w-6 text-muted-foreground" />,
  Disk: <Database className="h-6 w-6 text-muted-foreground" />,
  Network: <Network className="h-6 w-6 text-muted-foreground" />,
}

function PerformanceChart({ metric }: { metric: PerformanceMetric }) {
  const chartData = useMemo(() => [{ name: metric.name, value: metric.usage }], [metric])
  const usageColor = metric.usage > 90 ? "hsl(var(--destructive))" : metric.usage > 70 ? "hsl(var(--chart-5))" : "hsl(var(--primary))"

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{metric.name} Usage</CardTitle>
        {ICONS[metric.name]}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-end">
        <div className="text-2xl font-bold" style={{ color: usageColor }}>{metric.usage}%</div>
        <div className="h-20 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 0, left: -35, bottom: 0 }}>
              <XAxis dataKey="name" hide />
              <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tickMargin={8} />
              <Bar dataKey="value" fill={usageColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}


export default function PerformanceCharts() {
  const { selectedServer } = useServer()
  const serverData = selectedServer ? mockServersData[selectedServer.id] : undefined;
  const initialMetrics = useMemo(() => serverData?.performanceMetrics || [], [serverData]);

  const [metrics, setMetrics] = useState<PerformanceMetric[]>(initialMetrics)

  useEffect(() => {
    setMetrics(initialMetrics)

    if (initialMetrics.length === 0) {
      return
    }

    const interval = setInterval(() => {
      setMetrics((prevMetrics) =>
        prevMetrics.map((metric) => ({
          ...metric,
          usage: Math.min(100, Math.max(0, metric.usage + Math.round((Math.random() - 0.5) * 10))),
        }))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [initialMetrics, selectedServer])

  if (initialMetrics.length === 0) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {(['CPU', 'Memory', 'Disk', 'Network'] as const).map(name => (
          <Card key={name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{name} Usage</CardTitle>
              {ICONS[name]}
            </CardHeader>
            <CardContent className="flex h-full flex-col items-center justify-center pt-0">
              <p className="text-sm text-muted-foreground">No data available.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <PerformanceChart key={metric.name} metric={metric} />
      ))}
    </div>
  )
}
