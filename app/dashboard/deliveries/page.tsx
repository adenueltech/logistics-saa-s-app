"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Filter,
  Plus,
  MapPin,
  Clock,
  User,
  Truck,
  CheckCircle,
  AlertTriangle,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  Eye,
} from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DeliveryProvider, useDelivery } from "@/lib/delivery"
import { DeliveryForm } from "@/components/delivery-form"
import { useToast } from "@/hooks/use-toast"

export const dynamic = "force-dynamic"

function DeliveriesContent() {
  const { deliveries, deleteDelivery, updateDeliveryStatus } = useDelivery()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  const filteredDeliveries = deliveries.filter(
    (delivery) =>
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.company?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "in-transit":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "picked-up":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "assigned":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
      case "pending":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "cancelled":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return CheckCircle
      case "in-transit":
      case "picked-up":
        return Truck
      case "assigned":
        return UserCheck
      case "pending":
        return Clock
      default:
        return AlertTriangle
    }
  }

  const handleDeleteDelivery = async (id: string) => {
    const result = await deleteDelivery(id)
    if (result.success) {
      toast({
        title: "Delivery deleted",
        description: "The delivery has been deleted successfully.",
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to delete delivery.",
        variant: "destructive",
      })
    }
  }

  const handleStatusUpdate = async (id: string, status: string) => {
    const result = await updateDeliveryStatus(id, status as any)
    if (result.success) {
      toast({
        title: "Status updated",
        description: `Delivery status has been updated to ${status}.`,
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update status.",
        variant: "destructive",
      })
    }
  }

  const selectedDeliveryData = deliveries.find((d) => d.id === selectedDelivery)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-balance">Deliveries</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">Manage and track all your delivery operations</p>
        </div>
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogTrigger asChild>
            <Button className="animate-glow flex-shrink-0">
              <Plus className="mr-2 h-4 w-4" />
              New Delivery
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Delivery</DialogTitle>
              <DialogDescription>Fill in the details to create a new delivery request.</DialogDescription>
            </DialogHeader>
            <DeliveryForm
              onSuccess={() => {
                setShowCreateForm(false)
              }}
              onCancel={() => setShowCreateForm(false)}
            />
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deliveries..."
            className="pl-10 bg-secondary/50 border-border/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="bg-transparent flex-shrink-0">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </motion.div>

      {/* Deliveries List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        {filteredDeliveries.map((delivery, index) => {
          const StatusIcon = getStatusIcon(delivery.status)
          return (
            <motion.div
              key={delivery.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start space-x-3 sm:space-x-4 min-w-0 flex-1">
                      <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                        <StatusIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div className="space-y-2 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-sm sm:text-base">{delivery.id}</h3>
                          <Badge className={getStatusColor(delivery.status)}>{delivery.status}</Badge>
                          <Badge className={getPriorityColor(delivery.priority)}>{delivery.priority} priority</Badge>
                          {delivery.package.fragile && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">fragile</Badge>
                          )}
                        </div>
                        <p className="text-sm font-medium truncate">
                          {delivery.customer.name} • {delivery.customer.company}
                        </p>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-3 w-3 flex-shrink-0" />
                            <span className="truncate">From: {delivery.pickup.address}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-3 w-3 flex-shrink-0" />
                            <span className="truncate">To: {delivery.destination.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-4">
                      <div className="text-left sm:text-right space-y-1 sm:space-y-2 order-2 sm:order-1">
                        {delivery.assignedDriver && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <User className="mr-1 h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{delivery.assignedDriver}</span>
                          </div>
                        )}
                        {delivery.assignedVehicle && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Truck className="mr-1 h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{delivery.assignedVehicle}</span>
                          </div>
                        )}
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3 flex-shrink-0" />
                          {new Date(delivery.scheduledPickup).toLocaleDateString()}
                        </div>
                        <p className="text-sm font-medium">${delivery.cost}</p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="flex-shrink-0 order-1 sm:order-2">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedDelivery(delivery.id)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedDelivery(delivery.id)
                              setShowEditForm(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleStatusUpdate(delivery.id, "assigned")}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Mark as Assigned
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(delivery.id, "picked-up")}>
                            <Truck className="mr-2 h-4 w-4" />
                            Mark as Picked Up
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(delivery.id, "delivered")}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Delivered
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteDelivery(delivery.id)} className="text-red-400">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Edit Dialog */}
      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Delivery</DialogTitle>
            <DialogDescription>Update the delivery information.</DialogDescription>
          </DialogHeader>
          {selectedDeliveryData && (
            <DeliveryForm
              delivery={selectedDeliveryData}
              onSuccess={() => {
                setShowEditForm(false)
                setSelectedDelivery(null)
              }}
              onCancel={() => {
                setShowEditForm(false)
                setSelectedDelivery(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function DeliveriesPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <DeliveryProvider>
          <DeliveriesContent />
        </DeliveryProvider>
      </DashboardLayout>
    </AuthGuard>
  )
}
