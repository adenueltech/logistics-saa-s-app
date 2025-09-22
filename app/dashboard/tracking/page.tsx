"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Clock, AlertCircle, CheckCircle, Route, Activity, Zap } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { InteractiveMap } from "@/components/interactive-map"
import { TrackingProvider, useTracking } from "@/lib/tracking"

export const dynamic = "force-dynamic"

function TrackingContent() {
  const { vehicles, isConnected } = useTracking()

  const activeRoutes = [
    {
      id: "ROUTE-001",
      driver: "John Smith",
      vehicle: "VAN-001",
      status: "on-route",
      currentLocation: "Downtown Manhattan, NY",
      nextStop: "Brooklyn Distribution Center",
      eta: "15 mins",
      completedStops: 3,
      totalStops: 7,
      progress: 43,
    },
    {
      id: "ROUTE-002",
      driver: "Sarah Johnson",
      vehicle: "TRUCK-003",
      status: "delayed",
      currentLocation: "Highway 101, CA",
      nextStop: "Palo Alto Warehouse",
      eta: "25 mins",
      completedStops: 1,
      totalStops: 4,
      progress: 25,
    },
    {
      id: "ROUTE-003",
      driver: "Mike Wilson",
      vehicle: "VAN-005",
      status: "completed",
      currentLocation: "Chicago Depot",
      nextStop: "Return to base",
      eta: "Completed",
      completedStops: 5,
      totalStops: 5,
      progress: 100,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-route":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "delayed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-route":
        return Navigation
      case "delayed":
        return AlertCircle
      case "completed":
        return CheckCircle
      default:
        return Clock
    }
  }

  const activeVehicles = vehicles.filter((v) => v.status === "active").length
  const totalVehicles = vehicles.length
  const averageSpeed = Math.round(
    vehicles.filter((v) => v.status === "active").reduce((sum, v) => sum + v.speed, 0) /
      vehicles.filter((v) => v.status === "active").length || 0,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Real-time Tracking</h1>
            <p className="text-muted-foreground mt-2">Monitor your fleet and deliveries in real-time</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className={`${isConnected ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
              <Activity className="mr-1 h-3 w-3" />
              {isConnected ? "Live" : "Offline"}
            </Badge>
            <Button className="animate-glow">
              <Zap className="mr-2 h-4 w-4" />
              Optimize Routes
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Vehicles</p>
                <p className="text-2xl font-bold">
                  {activeVehicles}/{totalVehicles}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Navigation className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Speed</p>
                <p className="text-2xl font-bold">{averageSpeed} mph</p>
              </div>
              <div className="p-2 rounded-lg bg-green-500/20">
                <Activity className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On-time Delivery</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/20">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Interactive Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <InteractiveMap />
      </motion.div>

      {/* Active Routes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Route className="mr-2 h-5 w-5" />
              Active Routes
            </CardTitle>
            <CardDescription>Current delivery routes and their real-time progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeRoutes.map((route, index) => {
                const StatusIcon = getStatusIcon(route.status)
                return (
                  <motion.div
                    key={route.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="p-4 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <StatusIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{route.id}</h4>
                          <p className="text-sm text-muted-foreground">
                            {route.driver} • {route.vehicle}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(route.status)}>{route.status}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Current:</span>
                        <span className="ml-1 font-medium">{route.currentLocation}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Navigation className="mr-2 h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Next:</span>
                        <span className="ml-1 font-medium">{route.nextStop}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">ETA:</span>
                        <span className="ml-1 font-medium">{route.eta}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>Progress:</span>
                        <span className="font-medium">
                          {route.completedStops}/{route.totalStops} stops
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${route.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                            className="h-full bg-primary"
                          />
                        </div>
                        <span className="text-sm font-medium">{route.progress}%</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function TrackingPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <TrackingProvider>
          <TrackingContent />
        </TrackingProvider>
      </DashboardLayout>
    </AuthGuard>
  )
}
