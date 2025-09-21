"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Truck, Gauge, Clock, Wifi, WifiOff } from "lucide-react"
import { useTracking, type Vehicle } from "@/lib/tracking"
import { useState } from "react"

export function InteractiveMap() {
  const { vehicles, selectedVehicle, setSelectedVehicle, isConnected } = useTracking()
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 }) // Center of US

  const getVehicleIcon = (type: Vehicle["type"]) => {
    switch (type) {
      case "truck":
        return "🚛"
      case "van":
        return "🚐"
      case "motorcycle":
        return "🏍️"
      default:
        return "🚚"
    }
  }

  const getStatusColor = (status: Vehicle["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "maintenance":
        return "bg-red-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Map Area */}
      <div className="lg:col-span-3">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-0">
            <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg overflow-hidden">
              {/* Connection Status */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className={`${isConnected ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                  {isConnected ? <Wifi className="mr-1 h-3 w-3" /> : <WifiOff className="mr-1 h-3 w-3" />}
                  {isConnected ? "Live Tracking" : "Disconnected"}
                </Badge>
              </div>

              {/* Map Grid Background */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-grid-pattern" />
              </div>

              {/* Vehicle Markers */}
              {vehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                    selectedVehicle?.id === vehicle.id ? "z-20" : "z-10"
                  }`}
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${30 + index * 10}%`,
                  }}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className="relative">
                    <div
                      className={`w-4 h-4 rounded-full ${getStatusColor(
                        vehicle.status,
                      )} animate-pulse absolute -top-1 -right-1 z-10`}
                    />
                    <div
                      className={`text-2xl p-2 rounded-full bg-background/90 border-2 transition-all duration-200 ${
                        selectedVehicle?.id === vehicle.id
                          ? "border-primary scale-110 shadow-lg"
                          : "border-border/50 hover:border-primary/50 hover:scale-105"
                      }`}
                    >
                      {getVehicleIcon(vehicle.type)}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Route Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(255, 102, 51)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(255, 102, 51)" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {vehicles
                  .filter((v) => v.status === "active")
                  .map((vehicle, index) => (
                    <motion.path
                      key={`route-${vehicle.id}`}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: index * 0.5 }}
                      d={`M ${20 + index * 15}% ${30 + index * 10}% Q ${50 + index * 5}% ${
                        20 + index * 5
                      }% ${80 - index * 10}% ${40 + index * 8}%`}
                      stroke="url(#routeGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  ))}
              </svg>

              {/* Map Controls */}
              <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                <Button size="sm" variant="outline" className="bg-background/90">
                  <Navigation className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-background/90">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle Details Panel */}
      <div className="space-y-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4 flex items-center">
              <Truck className="mr-2 h-4 w-4" />
              Fleet Overview
            </h3>
            <div className="space-y-3">
              {vehicles.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedVehicle?.id === vehicle.id
                      ? "bg-primary/20 border border-primary/30"
                      : "bg-secondary/30 border border-border/50 hover:border-primary/30"
                  }`}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{vehicle.id}</span>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(vehicle.status)}`} />
                  </div>
                  <p className="text-xs text-muted-foreground">{vehicle.driver}</p>
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <Gauge className="mr-1 h-3 w-3" />
                    {vehicle.speed} mph
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedVehicle && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Vehicle Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">{selectedVehicle.id}</p>
                    <p className="text-xs text-muted-foreground">{selectedVehicle.driver}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className={getStatusColor(selectedVehicle.status).replace("bg-", "bg-") + "/20"}>
                      {selectedVehicle.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Speed</span>
                    <span className="text-sm font-medium">{selectedVehicle.speed} mph</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Fuel</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${selectedVehicle.fuel}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{selectedVehicle.fuel}%</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-muted-foreground">Location</span>
                    <p className="text-sm font-medium">{selectedVehicle.location.address}</p>
                  </div>

                  {selectedVehicle.nextStop && (
                    <div>
                      <span className="text-sm text-muted-foreground">Next Stop</span>
                      <p className="text-sm font-medium">{selectedVehicle.nextStop}</p>
                      {selectedVehicle.eta && (
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          ETA: {selectedVehicle.eta}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                      Last updated: {new Date(selectedVehicle.lastUpdate).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
