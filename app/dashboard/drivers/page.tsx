"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Plus,
  MapPin,
  Star,
  Phone,
  Mail,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export const dynamic = "force-dynamic"

const drivers = [
  {
    id: "D001",
    name: "John Smith",
    email: "john.smith@fleetflow.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    vehicle: "Truck Alpha",
    location: "Downtown Route",
    rating: 4.8,
    deliveries: 156,
    experience: "5 years",
    joinDate: "2019-03-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D002",
    name: "Sarah Johnson",
    email: "sarah.johnson@fleetflow.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    vehicle: "Truck Gamma",
    location: "Route 45",
    rating: 4.9,
    deliveries: 203,
    experience: "7 years",
    joinDate: "2017-08-22",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D003",
    name: "Mike Wilson",
    email: "mike.wilson@fleetflow.com",
    phone: "+1 (555) 345-6789",
    status: "idle",
    vehicle: "Van Delta",
    location: "North Depot",
    rating: 4.6,
    deliveries: 89,
    experience: "3 years",
    joinDate: "2021-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D004",
    name: "Emily Davis",
    email: "emily.davis@fleetflow.com",
    phone: "+1 (555) 456-7890",
    status: "off-duty",
    vehicle: "Unassigned",
    location: "Off Duty",
    rating: 4.7,
    deliveries: 134,
    experience: "4 years",
    joinDate: "2020-06-18",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D005",
    name: "David Brown",
    email: "david.brown@fleetflow.com",
    phone: "+1 (555) 567-8901",
    status: "break",
    vehicle: "Van Echo",
    location: "Rest Area",
    rating: 4.5,
    deliveries: 67,
    experience: "2 years",
    joinDate: "2022-04-05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "idle":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "off-duty":
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    case "break":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle className="w-4 h-4" />
    case "idle":
      return <Clock className="w-4 h-4" />
    case "off-duty":
      return <AlertTriangle className="w-4 h-4" />
    case "break":
      return <Clock className="w-4 h-4" />
    default:
      return <AlertTriangle className="w-4 h-4" />
  }
}

export default function DriversPage() {
  const activeDrivers = drivers.filter((d) => d.status === "active").length
  const totalDeliveries = drivers.reduce((acc, d) => acc + d.deliveries, 0)
  const avgRating = (drivers.reduce((acc, d) => acc + d.rating, 0) / drivers.length).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-balance">Driver Management</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Manage your delivery team and track performance</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 flex-shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Driver
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{drivers.length}</div>
              <p className="text-xs text-muted-foreground">Team members</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{activeDrivers}</div>
              <p className="text-xs text-muted-foreground">Currently on duty</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalDeliveries}</div>
              <p className="text-xs text-muted-foreground">Completed this month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{avgRating}</div>
              <p className="text-xs text-muted-foreground">Customer satisfaction</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Drivers Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Driver Overview</CardTitle>
            <CardDescription>Manage your delivery team and track their performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto p-1">
                <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
                <TabsTrigger value="active" className="text-xs sm:text-sm">Active</TabsTrigger>
                <TabsTrigger value="idle" className="text-xs sm:text-sm hidden sm:inline-flex">Idle</TabsTrigger>
                <TabsTrigger value="break" className="text-xs sm:text-sm hidden lg:inline-flex">Break</TabsTrigger>
                <TabsTrigger value="off-duty" className="text-xs sm:text-sm hidden lg:inline-flex">Off Duty</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="grid gap-4">
                  {drivers.map((driver, index) => (
                    <motion.div
                      key={driver.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border border-border/50 bg-secondary/20 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                          <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                            <AvatarImage src={driver.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-primary/20 text-primary text-xs sm:text-sm">
                              {driver.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-sm sm:text-base truncate">{driver.name}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">
                              {driver.id} • {driver.experience} experience
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                          <Badge className={`${getStatusColor(driver.status)} text-xs`}>
                            {getStatusIcon(driver.status)}
                            <span className="ml-1 capitalize hidden sm:inline">{driver.status.replace("-", " ")}</span>
                          </Badge>

                          <div className="text-center hidden sm:block">
                            <p className="text-sm font-medium truncate max-w-24">{driver.vehicle}</p>
                            <p className="text-xs text-muted-foreground">Vehicle</p>
                          </div>

                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current flex-shrink-0" />
                            <span className="text-xs sm:text-sm font-medium">{driver.rating}</span>
                          </div>

                          <div className="text-center hidden md:block">
                            <p className="text-sm font-medium">{driver.deliveries}</p>
                            <p className="text-xs text-muted-foreground">Deliveries</p>
                          </div>

                          <div className="flex items-center space-x-1 min-w-0">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-xs sm:text-sm truncate max-w-20 sm:max-w-none">{driver.location}</span>
                          </div>

                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="text-xs sm:text-sm">View Profile</DropdownMenuItem>
                                <DropdownMenuItem className="text-xs sm:text-sm">Edit Driver</DropdownMenuItem>
                                <DropdownMenuItem className="text-xs sm:text-sm">Assign Vehicle</DropdownMenuItem>
                                <DropdownMenuItem className="text-xs sm:text-sm">View Performance</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Other tab contents with filtered drivers */}
              <TabsContent value="active">
                <div className="grid gap-4">
                  {drivers
                    .filter((d) => d.status === "active")
                    .map((driver) => (
                      <div key={driver.id} className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={driver.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-green-500/20 text-green-400">
                                {driver.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{driver.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {driver.vehicle} • {driver.location}
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
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
