"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import type { Server } from "@/lib/types"
import { mockServers } from "@/lib/data"

interface ServerContextType {
  servers: Server[]
  selectedServer: Server | undefined
  setSelectedServer: (server: Server | undefined) => void
}

const ServerContext = createContext<ServerContextType | undefined>(undefined)

export function ServerProvider({ children }: { children: ReactNode }) {
  const [servers] = useState<Server[]>(mockServers)
  const [selectedServer, setSelectedServer] = useState<Server | undefined>(servers.length > 0 ? servers[0] : undefined);

  return (
    <ServerContext.Provider value={{ servers, selectedServer, setSelectedServer }}>
      {children}
    </ServerContext.Provider>
  )
}

export function useServer() {
  const context = useContext(ServerContext)
  if (context === undefined) {
    throw new Error("useServer must be used within a ServerProvider")
  }
  return context
}
