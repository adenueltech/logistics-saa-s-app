"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, TrendingDown, Package, DollarSign, Clock, Fuel, Star } from "lucide-react"

const deliveryData = [
  { month: "Jan", deliveries: 245, revenue: 12250 },
  { month: "Feb", deliveries: 289, revenue: 14450 },
  { month: "Mar", deliveries: 324, revenue: 16200 },
  { month: "Apr", deliveries: 298, revenue: 14900 },
  { month: "May", deliveries: 356, revenue: 17800 },
  { month: "Jun", deliveries: 412, revenue: 20600 },
]

const performanceData = [
  { day: "Mon", onTime: 95, delayed: 5 },
  { day: "Tue", onTime: 92, delayed: 8 },
  { day: "Wed", onTime: 98, delayed: 2 },
  { day: "Thu", onTime: 89, delayed: 11 },
  { day: "Fri", onTime: 94, delayed: 6 },
  { day: "Sat", onTime: 97, delayed: 3 },
  { day: "Sun", onTime: 91, delayed: 9 },
]

const routeEfficiencyData = [
  { name: "Route A", efficiency: 92, color: "#10b981" },
  { name: "Route B", efficiency: 88, color: "#3b82f6" },
  { name: "Route C", efficiency: 95, color: "#8b5cf6" },
  { name: "Route D", efficiency: 85, color: "#f59e0b" },
  { name: "Route E", efficiency: 90, color: "#ef4444" },
]

const fuelConsumptionData = [
  { month: "Jan", consumption: 1250, cost: 3750 },
  { month: "Feb", consumption: 1180, cost: 3540 },
  { month: "Mar", consumption: 1320, cost: 3960 },
  { month: "Apr", consumption: 1290, cost: 3870 },
  { month: "May", consumption: 1410, cost: 4230 },
  { month: "Jun", consumption: 1380, cost: 4140 },
]

const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights into your logistics operations</p>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">$96,200</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 mr-1 text-green-400" />
                +12.5% from last month
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deliveries</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">1,924</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 mr-1 text-green-400" />
                +8.2% from last month
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
              <Clock className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">94.2%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 mr-1 text-green-400" />
                +2.1% from last month
              </div>
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
              <div className="text-2xl font-bold text-yellow-400">4.8</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 mr-1 text-green-400" />
                +0.3 from last month
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Analytics Tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Detailed Analytics</CardTitle>
            <CardDescription>Comprehensive performance metrics and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="deliveries" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="routes">Routes</TabsTrigger>
                <TabsTrigger value="costs">Costs</TabsTrigger>
              </TabsList>

              <TabsContent value="deliveries" className="space-y-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={deliveryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Area type="monotone" dataKey="deliveries" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">This Month</p>
                        <p className="text-2xl font-bold">412</p>
                      </div>
                      <Package className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Growth Rate</p>
                        <p className="text-2xl font-bold text-green-400">+15.8%</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-400" />
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg per Day</p>
                        <p className="text-2xl font-bold">13.7</p>
                      </div>
                      <Clock className="w-8 h-8 text-blue-400" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="onTime" fill="#10b981" name="On Time %" />
                      <Bar dataKey="delayed" fill="#ef4444" name="Delayed %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-400">On-Time Deliveries</p>
                        <p className="text-2xl font-bold text-green-400">94.2%</p>
                      </div>
                      <Clock className="w-8 h-8 text-green-400" />
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-red-400">Delayed Deliveries</p>
                        <p className="text-2xl font-bold text-red-400">5.8%</p>
                      </div>
                      <TrendingDown className="w-8 h-8 text-red-400" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="routes" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={routeEfficiencyData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="efficiency"
                          label={({ name, efficiency }) => `${name}: ${efficiency}%`}
                        >
                          {routeEfficiencyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    {routeEfficiencyData.map((route, index) => (
                      <div key={route.name} className="p-4 rounded-lg bg-secondary/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{route.name}</span>
                          <span className="text-sm font-bold">{route.efficiency}%</span>
                        </div>
                        <Progress value={route.efficiency} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="costs" className="space-y-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={fuelConsumptionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="consumption"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        name="Fuel (Liters)"
                      />
                      <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} name="Cost ($)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Fuel Cost</p>
                        <p className="text-2xl font-bold text-yellow-400">$4,140</p>
                      </div>
                      <Fuel className="w-8 h-8 text-yellow-400" />
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Cost per Delivery</p>
                        <p className="text-2xl font-bold">$10.05</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-green-400" />
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Efficiency Trend</p>
                        <p className="text-2xl font-bold text-green-400">+2.3%</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-400" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
