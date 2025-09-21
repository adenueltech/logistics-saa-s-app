"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Route,
  MapPin,
  Clock,
  DollarSign,
  Zap,
  Search,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Leaf,
  Target,
  Navigation,
  RefreshCw,
} from "lucide-react"
import { type OptimizedRoute, type RouteAnalytics, routeOptimizationService } from "@/lib/route-optimization"

export default function RoutesPage() {
  const [routes, setRoutes] = useState<OptimizedRoute[]>([])
  const [analytics, setAnalytics] = useState<RouteAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [optimizing, setOptimizing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [routesData, analyticsData] = await Promise.all([
        routeOptimizationService.getRoutes(),
        routeOptimizationService.getRouteAnalytics(),
      ])
      setRoutes(routesData)
      setAnalytics(analyticsData)
    } catch (error) {
      console.error("Failed to load route data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOptimizeRoutes = async () => {
    setOptimizing(true)
    try {
      // Simulate route optimization
      await new Promise((resolve) => setTimeout(resolve, 3000))
      await loadData()
    } catch (error) {
      console.error("Failed to optimize routes:", error)
    } finally {
      setOptimizing(false)
    }
  }

  const handleRouteAction = async (routeId: string, action: "start" | "pause" | "reset") => {
    const statusMap = {
      start: "active" as const,
      pause: "paused" as const,
      reset: "planned" as const,
    }

    try {
      await routeOptimizationService.updateRouteStatus(routeId, statusMap[action])
      await loadData()
    } catch (error) {
      console.error("Failed to update route status:", error)
    }
  }

  const filteredRoutes = routes.filter(
    (route) =>
      route.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driverId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: OptimizedRoute["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "planned":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "completed":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      case "paused":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-green-500"
    if (efficiency >= 75) return "text-yellow-500"
    return "text-red-500"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Route Optimization</h1>
          <p className="text-muted-foreground">Optimize delivery routes for maximum efficiency</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Route
          </Button>
          <Button onClick={handleOptimizeRoutes} disabled={optimizing} className="bg-primary hover:bg-primary/90">
            {optimizing ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Zap className="h-4 w-4 mr-2" />}
            {optimizing ? "Optimizing..." : "Optimize All"}
          </Button>
        </div>
      </div>

      {/* Analytics Cards */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Efficiency</CardTitle>
                <Target className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{analytics.averageEfficiency.toFixed(1)}%</div>
                <Progress value={analytics.averageEfficiency} className="mt-2" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Distance Saved</CardTitle>
                <Navigation className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{analytics.totalDistanceSaved} mi</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Cost Savings</CardTitle>
                <DollarSign className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">${analytics.costSavings.toFixed(0)}</div>
                <p className="text-xs text-muted-foreground">+{analytics.timeReduction}% time reduction</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">CO₂ Reduced</CardTitle>
                <Leaf className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{analytics.co2Reduction} kg</div>
                <p className="text-xs text-muted-foreground">Environmental impact</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <Tabs defaultValue="routes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="routes">Active Routes</TabsTrigger>
          <TabsTrigger value="optimization">Route Planner</TabsTrigger>
        </TabsList>

        <TabsContent value="routes" className="space-y-6">
          {/* Search */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search routes, vehicles, drivers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Routes List */}
          <div className="space-y-4">
            {filteredRoutes.map((route, index) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge className={`${getStatusColor(route.status)} flex items-center gap-1`}>
                            <Route className="h-3 w-3" />
                            {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">#{route.id}</span>
                        </div>
                        <h3 className="font-semibold text-foreground">
                          {route.vehicleId} • {route.driverId}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {route.totalDistance} mi
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {Math.floor(route.totalTime / 60)}h {route.totalTime % 60}m
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />${route.estimatedCost.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className={`text-2xl font-bold ${getEfficiencyColor(route.efficiency)}`}>
                          {route.efficiency}%
                        </div>
                        <div className="text-xs text-muted-foreground">Efficiency</div>
                        <div className="flex gap-1">
                          {route.status === "planned" && (
                            <Button
                              size="sm"
                              onClick={() => handleRouteAction(route.id, "start")}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <Play className="h-3 w-3 mr-1" />
                              Start
                            </Button>
                          )}
                          {route.status === "active" && (
                            <Button size="sm" variant="outline" onClick={() => handleRouteAction(route.id, "pause")}>
                              <Pause className="h-3 w-3 mr-1" />
                              Pause
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => handleRouteAction(route.id, "reset")}>
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Reset
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Route Points */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Route Points ({route.points.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {route.points.slice(0, 6).map((point, pointIndex) => (
                          <div key={point.id} className="flex items-center gap-2 text-xs">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                point.type === "depot"
                                  ? "bg-blue-500"
                                  : point.type === "pickup"
                                    ? "bg-green-500"
                                    : "bg-orange-500"
                              }`}
                            />
                            <span className="truncate">{point.address.split(",")[0]}</span>
                          </div>
                        ))}
                        {route.points.length > 6 && (
                          <div className="text-xs text-muted-foreground">+{route.points.length - 6} more stops</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Route Optimization Engine</CardTitle>
              <CardDescription>Configure and run advanced route optimization algorithms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-12">
                <Zap className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI-Powered Route Optimization</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Our advanced algorithms consider traffic patterns, delivery windows, vehicle capacity, and driver
                  preferences to create the most efficient routes.
                </p>
                <Button
                  size="lg"
                  onClick={handleOptimizeRoutes}
                  disabled={optimizing}
                  className="bg-primary hover:bg-primary/90"
                >
                  {optimizing ? <RefreshCw className="h-5 w-5 mr-2 animate-spin" /> : <Zap className="h-5 w-5 mr-2" />}
                  {optimizing ? "Optimizing Routes..." : "Start Optimization"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
