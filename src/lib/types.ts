export type PerformanceMetric = {
  name: "CPU" | "Memory" | "Disk" | "Network";
  usage: number;
};

export type Process = {
  pid: number;
  name: string;
  cpu: number;
  memory: number;
};

export type EventLog = {
  id: number;
  level: "Info" | "Warning" | "Error";
  source: string;
  message: string;
  timestamp: string;
};

export type Service = {
  name:string;
  displayName: string;
  status: "Running" | "Stopped";
};

export type Alert = {
  id: number;
  severity: "High" | "Medium" | "Low";
  message: string;
  timestamp: string;
};

export type Server = {
  id: string;
  name: string;
  hostname: string;
};

export type ServerData = {
  performanceMetrics: PerformanceMetric[];
  processes: Process[];
  eventLogs: EventLog[];
  services: Service[];
  alerts: Alert[];
};

export type AllServersData = {
  [key: string]: ServerData;
};
