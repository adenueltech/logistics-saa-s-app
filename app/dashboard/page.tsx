"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Truck,
  Package,
  MapPin,
  Users,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useAuth } from "@/lib/auth"

export const dynamic = "force-dynamic"

export default function DashboardPage() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Active Deliveries",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: Truck,
      color: "text-blue-500",
    },
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Fleet Utilization",
      value: "87%",
      change: "-2.1%",
      trend: "down",
      icon: BarChart3,
      color: "text-orange-500",
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      change: "+0.3",
      trend: "up",
      icon: Users,
      color: "text-purple-500",
    },
  ]

  const recentDeliveries = [
    {
      id: "DEL-001",
      customer: "Acme Corp",
      destination: "New York, NY",
      status: "delivered",
      driver: "John Smith",
      time: "2 hours ago",
    },
    {
      id: "DEL-002",
      customer: "Tech Solutions",
      destination: "Los Angeles, CA",
      status: "in-transit",
      driver: "Sarah Johnson",
      time: "4 hours ago",
    },
    {
      id: "DEL-003",
      customer: "Global Industries",
      destination: "Chicago, IL",
      status: "pending",
      driver: "Mike Wilson",
      time: "6 hours ago",
    },
    {
      id: "DEL-004",
      customer: "StartupXYZ",
      destination: "Austin, TX",
      status: "delivered",
      driver: "Emily Davis",
      time: "8 hours ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "in-transit":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "pending":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return CheckCircle
      case "in-transit":
        return Truck
      case "pending":
        return Clock
      default:
        return AlertTriangle
    }
  }

  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="space-y-6 sm:space-y-8 max-w-full">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-balance">Welcome back, {user?.firstName}!</h1>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                  Here's what's happening with your fleet today.
                </p>
              </div>
              <Button className="animate-glow flex-shrink-0">
                <Package className="mr-2 h-4 w-4" />
                New Delivery
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{stat.title}</p>
                        <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          {stat.trend === "up" ? (
                            <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 flex-shrink-0" />
                          )}
                          <span
                            className={`text-xs sm:text-sm ml-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
                          >
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div className={`p-2 sm:p-3 rounded-lg bg-primary/10 ${stat.color} flex-shrink-0`}>
                        <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Deliveries */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="xl:col-span-2"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Package className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="truncate">Recent Deliveries</span>
                  </CardTitle>
                  <CardDescription className="text-sm">Latest delivery updates from your fleet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {recentDeliveries.map((delivery, index) => {
                      const StatusIcon = getStatusIcon(delivery.status)
                      return (
                        <motion.div
                          key={delivery.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                          className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300"
                        >
                          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                            <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                              <StatusIcon className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm sm:text-base truncate">{delivery.id}</p>
                              <p className="text-xs sm:text-sm text-muted-foreground truncate">{delivery.customer}</p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-2">
                            <Badge className={`${getStatusColor(delivery.status)} text-xs`}>{delivery.status}</Badge>
                            <p className="text-xs text-muted-foreground mt-1">{delivery.time}</p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent text-sm">
                    View All Deliveries
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fleet Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <Truck className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="truncate">Fleet Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active Vehicles</span>
                      <span>24/30</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Maintenance Due</span>
                      <span>3/30</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Fuel Efficiency</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="truncate">Route Optimization</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-primary">32%</div>
                    <p className="text-sm text-muted-foreground">Average time saved with AI routing</p>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent text-sm">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Routes
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
