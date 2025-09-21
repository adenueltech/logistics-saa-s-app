"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Truck,
  Plus,
  MapPin,
  Fuel,
  Wrench,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const vehicles = [
  {
    id: "V001",
    name: "Truck Alpha",
    type: "Heavy Duty",
    status: "active",
    location: "Downtown Depot",
    driver: "John Smith",
    fuel: 85,
    mileage: "45,230 km",
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-04-15",
    efficiency: 92,
  },
  {
    id: "V002",
    name: "Van Beta",
    type: "Light Commercial",
    status: "maintenance",
    location: "Service Center",
    driver: "Unassigned",
    fuel: 60,
    mileage: "32,100 km",
    lastMaintenance: "2024-01-20",
    nextMaintenance: "2024-03-20",
    efficiency: 88,
  },
  {
    id: "V003",
    name: "Truck Gamma",
    type: "Medium Duty",
    status: "active",
    location: "Route 45",
    driver: "Sarah Johnson",
    fuel: 45,
    mileage: "28,750 km",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-04-10",
    efficiency: 95,
  },
  {
    id: "V004",
    name: "Van Delta",
    type: "Light Commercial",
    status: "idle",
    location: "North Depot",
    driver: "Mike Wilson",
    fuel: 90,
    mileage: "15,420 km",
    lastMaintenance: "2024-01-25",
    nextMaintenance: "2024-04-25",
    efficiency: 90,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "maintenance":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case "idle":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle className="w-4 h-4" />
    case "maintenance":
      return <Wrench className="w-4 h-4" />
    case "idle":
      return <Clock className="w-4 h-4" />
    default:
      return <AlertTriangle className="w-4 h-4" />
  }
}

export default function FleetPage() {
  const activeVehicles = vehicles.filter((v) => v.status === "active").length
  const maintenanceVehicles = vehicles.filter((v) => v.status === "maintenance").length
  const idleVehicles = vehicles.filter((v) => v.status === "idle").length
  const avgEfficiency = Math.round(vehicles.reduce((acc, v) => acc + v.efficiency, 0) / vehicles.length)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Fleet Management</h1>
          <p className="text-muted-foreground">Monitor and manage your vehicle fleet</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicles.length}</div>
              <p className="text-xs text-muted-foreground">Fleet size</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{activeVehicles}</div>
              <p className="text-xs text-muted-foreground">Currently on routes</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Maintenance</CardTitle>
              <Wrench className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{maintenanceVehicles}</div>
              <p className="text-xs text-muted-foreground">Under service</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Efficiency</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{avgEfficiency}%</div>
              <p className="text-xs text-muted-foreground">Fleet performance</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Fleet Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Fleet Overview</CardTitle>
            <CardDescription>Detailed view of all vehicles in your fleet</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Vehicles</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="idle">Idle</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="grid gap-4">
                  {vehicles.map((vehicle, index) => (
                    <motion.div
                      key={vehicle.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border border-border/50 bg-secondary/20 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Truck className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{vehicle.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {vehicle.id} • {vehicle.type}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <Badge className={getStatusColor(vehicle.status)}>
                              {getStatusIcon(vehicle.status)}
                              <span className="ml-1 capitalize">{vehicle.status}</span>
                            </Badge>
                          </div>

                          <div className="text-center">
                            <p className="text-sm font-medium">{vehicle.driver}</p>
                            <p className="text-xs text-muted-foreground">Driver</p>
                          </div>

                          <div className="text-center">
                            <div className="flex items-center space-x-2">
                              <Fuel className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium">{vehicle.fuel}%</span>
                            </div>
                            <Progress value={vehicle.fuel} className="w-16 h-2 mt-1" />
                          </div>

                          <div className="text-center">
                            <p className="text-sm font-medium">{vehicle.mileage}</p>
                            <p className="text-xs text-muted-foreground">Mileage</p>
                          </div>

                          <div className="text-center">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{vehicle.location}</span>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Vehicle</DropdownMenuItem>
                              <DropdownMenuItem>Schedule Maintenance</DropdownMenuItem>
                              <DropdownMenuItem>Assign Driver</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="active">
                <div className="grid gap-4">
                  {vehicles
                    .filter((v) => v.status === "active")
                    .map((vehicle, index) => (
                      <div key={vehicle.id} className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                              <Truck className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{vehicle.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {vehicle.driver} • {vehicle.location}
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Active
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="maintenance">
                <div className="grid gap-4">
                  {vehicles
                    .filter((v) => v.status === "maintenance")
                    .map((vehicle, index) => (
                      <div key={vehicle.id} className="p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                              <Wrench className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{vehicle.name}</h3>
                              <p className="text-sm text-muted-foreground">Last service: {vehicle.lastMaintenance}</p>
                            </div>
                          </div>
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            <Wrench className="w-4 h-4 mr-1" />
                            Maintenance
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="idle">
                <div className="grid gap-4">
                  {vehicles
                    .filter((v) => v.status === "idle")
                    .map((vehicle, index) => (
                      <div key={vehicle.id} className="p-4 rounded-lg border border-blue-500/30 bg-blue-500/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                              <Clock className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{vehicle.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {vehicle.driver} • {vehicle.location}
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            <Clock className="w-4 h-4 mr-1" />
                            Idle
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
