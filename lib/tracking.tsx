"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export interface Vehicle {
  id: string
  driver: string
  type: "van" | "truck" | "motorcycle"
  status: "active" | "idle" | "maintenance" | "offline"
  location: {
    lat: number
    lng: number
    address: string
  }
  speed: number
  fuel: number
  lastUpdate: string
  route?: string
  nextStop?: string
  eta?: string
}

export interface TrackingContextType {
  vehicles: Vehicle[]
  selectedVehicle: Vehicle | null
  setSelectedVehicle: (vehicle: Vehicle | null) => void
  isConnected: boolean
  updateVehicleLocation: (vehicleId: string, location: Vehicle["location"]) => void
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined)

export function useTracking() {
  const context = useContext(TrackingContext)
  if (context === undefined) {
    throw new Error("useTracking must be used within a TrackingProvider")
  }
  return context
}

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "VAN-001",
      driver: "John Smith",
      type: "van",
      status: "active",
      location: {
        lat: 40.7128,
        lng: -74.006,
        address: "Manhattan, NY",
      },
      speed: 35,
      fuel: 78,
      lastUpdate: new Date().toISOString(),
      route: "ROUTE-001",
      nextStop: "Brooklyn Distribution Center",
      eta: "15 mins",
    },
    {
      id: "TRUCK-003",
      driver: "Sarah Johnson",
      type: "truck",
      status: "active",
      location: {
        lat: 37.7749,
        lng: -122.4194,
        address: "San Francisco, CA",
      },
      speed: 42,
      fuel: 65,
      lastUpdate: new Date().toISOString(),
      route: "ROUTE-002",
      nextStop: "Palo Alto Warehouse",
      eta: "25 mins",
    },
    {
      id: "VAN-005",
      driver: "Mike Wilson",
      type: "van",
      status: "idle",
      location: {
        lat: 41.8781,
        lng: -87.6298,
        address: "Chicago, IL",
      },
      speed: 0,
      fuel: 92,
      lastUpdate: new Date().toISOString(),
    },
    {
      id: "TRUCK-002",
      driver: "Emily Davis",
      type: "truck",
      status: "active",
      location: {
        lat: 30.2672,
        lng: -97.7431,
        address: "Austin, TX",
      },
      speed: 55,
      fuel: 43,
      lastUpdate: new Date().toISOString(),
      route: "ROUTE-004",
      nextStop: "Houston Distribution Hub",
      eta: "2 hours",
    },
  ])

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Simulate WebSocket connection
    setIsConnected(true)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) => {
          if (vehicle.status === "active") {
            // Simulate small location changes
            const latChange = (Math.random() - 0.5) * 0.01
            const lngChange = (Math.random() - 0.5) * 0.01
            const speedChange = Math.random() * 10 - 5

            return {
              ...vehicle,
              location: {
                ...vehicle.location,
                lat: vehicle.location.lat + latChange,
                lng: vehicle.location.lng + lngChange,
              },
              speed: Math.max(0, Math.min(70, vehicle.speed + speedChange)),
              lastUpdate: new Date().toISOString(),
            }
          }
          return vehicle
        }),
      )
    }, 5000) // Update every 5 seconds

    return () => {
      clearInterval(interval)
      setIsConnected(false)
    }
  }, [])

  const updateVehicleLocation = (vehicleId: string, location: Vehicle["location"]) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        vehicle.id === vehicleId
          ? {
              ...vehicle,
              location,
              lastUpdate: new Date().toISOString(),
            }
          : vehicle,
      ),
    )
  }

  const value: TrackingContextType = {
    vehicles,
    selectedVehicle,
    setSelectedVehicle,
    isConnected,
    updateVehicleLocation,
  }

  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>
}
