"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

export interface Delivery {
  id: string
  customer: {
    name: string
    email: string
    phone: string
    company?: string
  }
  pickup: {
    address: string
    lat: number
    lng: number
    contactName: string
    contactPhone: string
    instructions?: string
  }
  destination: {
    address: string
    lat: number
    lng: number
    contactName: string
    contactPhone: string
    instructions?: string
  }
  package: {
    description: string
    weight: number
    dimensions: {
      length: number
      width: number
      height: number
    }
    value: number
    fragile: boolean
    requiresSignature: boolean
  }
  status: "pending" | "assigned" | "picked-up" | "in-transit" | "delivered" | "failed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"
  assignedDriver?: string
  assignedVehicle?: string
  scheduledPickup: string
  estimatedDelivery: string
  actualPickup?: string
  actualDelivery?: string
  cost: number
  distance: number
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface DeliveryContextType {
  deliveries: Delivery[]
  createDelivery: (
    delivery: Omit<Delivery, "id" | "createdAt" | "updatedAt">,
  ) => Promise<{ success: boolean; id?: string; error?: string }>
  updateDelivery: (id: string, updates: Partial<Delivery>) => Promise<{ success: boolean; error?: string }>
  deleteDelivery: (id: string) => Promise<{ success: boolean; error?: string }>
  assignDelivery: (id: string, driverId: string, vehicleId: string) => Promise<{ success: boolean; error?: string }>
  updateDeliveryStatus: (id: string, status: Delivery["status"]) => Promise<{ success: boolean; error?: string }>
  getDeliveryById: (id: string) => Delivery | undefined
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined)

export function useDelivery() {
  const context = useContext(DeliveryContext)
  if (context === undefined) {
    throw new Error("useDelivery must be used within a DeliveryProvider")
  }
  return context
}

export function DeliveryProvider({ children }: { children: React.ReactNode }) {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: "DEL-001",
      customer: {
        name: "John Doe",
        email: "john@acmecorp.com",
        phone: "+1 (555) 123-4567",
        company: "Acme Corporation",
      },
      pickup: {
        address: "123 Main St, New York, NY 10001",
        lat: 40.7128,
        lng: -74.006,
        contactName: "Reception Desk",
        contactPhone: "+1 (555) 123-4567",
        instructions: "Use loading dock entrance",
      },
      destination: {
        address: "456 Oak Ave, Brooklyn, NY 11201",
        lat: 40.6892,
        lng: -73.9442,
        contactName: "Sarah Johnson",
        contactPhone: "+1 (555) 987-6543",
        instructions: "Ring apartment 4B",
      },
      package: {
        description: "Office supplies and documents",
        weight: 15.5,
        dimensions: { length: 24, width: 18, height: 12 },
        value: 250,
        fragile: false,
        requiresSignature: true,
      },
      status: "delivered",
      priority: "high",
      assignedDriver: "John Smith",
      assignedVehicle: "VAN-001",
      scheduledPickup: "2024-01-15T09:00:00Z",
      estimatedDelivery: "2024-01-15T14:30:00Z",
      actualPickup: "2024-01-15T09:15:00Z",
      actualDelivery: "2024-01-15T14:25:00Z",
      cost: 45.99,
      distance: 12.5,
      notes: "Customer requested early delivery",
      createdAt: "2024-01-14T10:30:00Z",
      updatedAt: "2024-01-15T14:25:00Z",
    },
    {
      id: "DEL-002",
      customer: {
        name: "Alice Smith",
        email: "alice@techsolutions.com",
        phone: "+1 (555) 234-5678",
        company: "Tech Solutions Inc",
      },
      pickup: {
        address: "789 Tech Blvd, San Francisco, CA 94105",
        lat: 37.7749,
        lng: -122.4194,
        contactName: "Warehouse Manager",
        contactPhone: "+1 (555) 234-5678",
      },
      destination: {
        address: "321 Innovation Dr, Palo Alto, CA 94301",
        lat: 37.4419,
        lng: -122.143,
        contactName: "Mike Wilson",
        contactPhone: "+1 (555) 345-6789",
        instructions: "Deliver to security desk",
      },
      package: {
        description: "Computer equipment",
        weight: 25.0,
        dimensions: { length: 30, width: 20, height: 15 },
        value: 1500,
        fragile: true,
        requiresSignature: true,
      },
      status: "in-transit",
      priority: "medium",
      assignedDriver: "Sarah Johnson",
      assignedVehicle: "TRUCK-003",
      scheduledPickup: "2024-01-15T11:00:00Z",
      estimatedDelivery: "2024-01-15T16:15:00Z",
      actualPickup: "2024-01-15T11:10:00Z",
      cost: 78.5,
      distance: 28.3,
      createdAt: "2024-01-14T14:20:00Z",
      updatedAt: "2024-01-15T11:10:00Z",
    },
    {
      id: "DEL-003",
      customer: {
        name: "Robert Brown",
        email: "robert@globalind.com",
        phone: "+1 (555) 345-6789",
        company: "Global Industries",
      },
      pickup: {
        address: "555 Industrial Way, Chicago, IL 60601",
        lat: 41.8781,
        lng: -87.6298,
        contactName: "Loading Supervisor",
        contactPhone: "+1 (555) 345-6789",
        instructions: "Heavy machinery - use crane",
      },
      destination: {
        address: "777 Commerce St, Milwaukee, WI 53202",
        lat: 43.0389,
        lng: -87.9065,
        contactName: "Plant Manager",
        contactPhone: "+1 (555) 456-7890",
      },
      package: {
        description: "Industrial machinery parts",
        weight: 150.0,
        dimensions: { length: 48, width: 36, height: 24 },
        value: 5000,
        fragile: false,
        requiresSignature: true,
      },
      status: "pending",
      priority: "low",
      scheduledPickup: "2024-01-16T08:00:00Z",
      estimatedDelivery: "2024-01-16T18:00:00Z",
      cost: 125.0,
      distance: 95.2,
      createdAt: "2024-01-14T16:45:00Z",
      updatedAt: "2024-01-14T16:45:00Z",
    },
  ])

  const createDelivery = async (deliveryData: Omit<Delivery, "id" | "createdAt" | "updatedAt">) => {
    try {
      const newDelivery: Delivery = {
        ...deliveryData,
        id: `DEL-${String(deliveries.length + 1).padStart(3, "0")}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setDeliveries((prev) => [newDelivery, ...prev])
      return { success: true, id: newDelivery.id }
    } catch (error) {
      return { success: false, error: "Failed to create delivery" }
    }
  }

  const updateDelivery = async (id: string, updates: Partial<Delivery>) => {
    try {
      setDeliveries((prev) =>
        prev.map((delivery) =>
          delivery.id === id
            ? {
                ...delivery,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : delivery,
        ),
      )
      return { success: true }
    } catch (error) {
      return { success: false, error: "Failed to update delivery" }
    }
  }

  const deleteDelivery = async (id: string) => {
    try {
      setDeliveries((prev) => prev.filter((delivery) => delivery.id !== id))
      return { success: true }
    } catch (error) {
      return { success: false, error: "Failed to delete delivery" }
    }
  }

  const assignDelivery = async (id: string, driverId: string, vehicleId: string) => {
    try {
      setDeliveries((prev) =>
        prev.map((delivery) =>
          delivery.id === id
            ? {
                ...delivery,
                assignedDriver: driverId,
                assignedVehicle: vehicleId,
                status: "assigned" as const,
                updatedAt: new Date().toISOString(),
              }
            : delivery,
        ),
      )
      return { success: true }
    } catch (error) {
      return { success: false, error: "Failed to assign delivery" }
    }
  }

  const updateDeliveryStatus = async (id: string, status: Delivery["status"]) => {
    try {
      setDeliveries((prev) =>
        prev.map((delivery) =>
          delivery.id === id
            ? {
                ...delivery,
                status,
                updatedAt: new Date().toISOString(),
                ...(status === "picked-up" && !delivery.actualPickup ? { actualPickup: new Date().toISOString() } : {}),
                ...(status === "delivered" && !delivery.actualDelivery
                  ? { actualDelivery: new Date().toISOString() }
                  : {}),
              }
            : delivery,
        ),
      )
      return { success: true }
    } catch (error) {
      return { success: false, error: "Failed to update delivery status" }
    }
  }

  const getDeliveryById = (id: string) => {
    return deliveries.find((delivery) => delivery.id === id)
  }

  const value: DeliveryContextType = {
    deliveries,
    createDelivery,
    updateDelivery,
    deleteDelivery,
    assignDelivery,
    updateDeliveryStatus,
    getDeliveryById,
  }

  return <DeliveryContext.Provider value={value}>{children}</DeliveryContext.Provider>
}
