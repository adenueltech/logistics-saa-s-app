"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Package, MapPin, User, Clock, Truck } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useDelivery, type Delivery } from "@/lib/delivery"
import { useToast } from "@/hooks/use-toast"

interface DeliveryFormProps {
  delivery?: Delivery
  onSuccess?: () => void
  onCancel?: () => void
}

export function DeliveryForm({ delivery, onSuccess, onCancel }: DeliveryFormProps) {
  const { createDelivery, updateDelivery } = useDelivery()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [scheduledPickup, setScheduledPickup] = useState<Date | undefined>(
    delivery?.scheduledPickup ? new Date(delivery.scheduledPickup) : undefined,
  )
  const [estimatedDelivery, setEstimatedDelivery] = useState<Date | undefined>(
    delivery?.estimatedDelivery ? new Date(delivery.estimatedDelivery) : undefined,
  )

  const [formData, setFormData] = useState({
    // Customer info
    customerName: delivery?.customer.name || "",
    customerEmail: delivery?.customer.email || "",
    customerPhone: delivery?.customer.phone || "",
    customerCompany: delivery?.customer.company || "",

    // Pickup info
    pickupAddress: delivery?.pickup.address || "",
    pickupContactName: delivery?.pickup.contactName || "",
    pickupContactPhone: delivery?.pickup.contactPhone || "",
    pickupInstructions: delivery?.pickup.instructions || "",

    // Destination info
    destinationAddress: delivery?.destination.address || "",
    destinationContactName: delivery?.destination.contactName || "",
    destinationContactPhone: delivery?.destination.contactPhone || "",
    destinationInstructions: delivery?.destination.instructions || "",

    // Package info
    packageDescription: delivery?.package.description || "",
    packageWeight: delivery?.package.weight?.toString() || "",
    packageLength: delivery?.package.dimensions.length?.toString() || "",
    packageWidth: delivery?.package.dimensions.width?.toString() || "",
    packageHeight: delivery?.package.dimensions.height?.toString() || "",
    packageValue: delivery?.package.value?.toString() || "",
    packageFragile: delivery?.package.fragile || false,
    packageRequiresSignature: delivery?.package.requiresSignature || false,

    // Delivery info
    priority: delivery?.priority || "medium",
    cost: delivery?.cost?.toString() || "",
    distance: delivery?.distance?.toString() || "",
    notes: delivery?.notes || "",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const deliveryData = {
        customer: {
          name: formData.customerName,
          email: formData.customerEmail,
          phone: formData.customerPhone,
          company: formData.customerCompany || undefined,
        },
        pickup: {
          address: formData.pickupAddress,
          lat: 40.7128, // Mock coordinates
          lng: -74.006,
          contactName: formData.pickupContactName,
          contactPhone: formData.pickupContactPhone,
          instructions: formData.pickupInstructions || undefined,
        },
        destination: {
          address: formData.destinationAddress,
          lat: 40.6892, // Mock coordinates
          lng: -73.9442,
          contactName: formData.destinationContactName,
          contactPhone: formData.destinationContactPhone,
          instructions: formData.destinationInstructions || undefined,
        },
        package: {
          description: formData.packageDescription,
          weight: Number.parseFloat(formData.packageWeight) || 0,
          dimensions: {
            length: Number.parseFloat(formData.packageLength) || 0,
            width: Number.parseFloat(formData.packageWidth) || 0,
            height: Number.parseFloat(formData.packageHeight) || 0,
          },
          value: Number.parseFloat(formData.packageValue) || 0,
          fragile: formData.packageFragile,
          requiresSignature: formData.packageRequiresSignature,
        },
        status: delivery?.status || ("pending" as const),
        priority: formData.priority as Delivery["priority"],
        scheduledPickup: scheduledPickup?.toISOString() || new Date().toISOString(),
        estimatedDelivery: estimatedDelivery?.toISOString() || new Date().toISOString(),
        cost: Number.parseFloat(formData.cost) || 0,
        distance: Number.parseFloat(formData.distance) || 0,
        notes: formData.notes || undefined,
        assignedDriver: delivery?.assignedDriver,
        assignedVehicle: delivery?.assignedVehicle,
        actualPickup: delivery?.actualPickup,
        actualDelivery: delivery?.actualDelivery,
      }

      let result
      if (delivery) {
        result = await updateDelivery(delivery.id, deliveryData)
      } else {
        result = await createDelivery(deliveryData)
      }

      if (result.success) {
        toast({
          title: delivery ? "Delivery updated" : "Delivery created",
          description: delivery
            ? "The delivery has been updated successfully."
            : "A new delivery has been created successfully.",
        })
        onSuccess?.()
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save delivery.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5" />
            {delivery ? "Edit Delivery" : "Create New Delivery"}
          </CardTitle>
          <CardDescription>
            {delivery ? "Update delivery information" : "Fill in the details to create a new delivery"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Customer Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-semibold">Customer Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email *</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Phone *</Label>
                  <Input
                    id="customerPhone"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerCompany">Company</Label>
                  <Input
                    id="customerCompany"
                    value={formData.customerCompany}
                    onChange={(e) => handleInputChange("customerCompany", e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Pickup Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-semibold">Pickup Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="pickupAddress">Pickup Address *</Label>
                  <Input
                    id="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={(e) => handleInputChange("pickupAddress", e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupContactName">Contact Name *</Label>
                  <Input
                    id="pickupContactName"
                    value={formData.pickupContactName}
                    onChange={(e) => handleInputChange("pickupContactName", e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupContactPhone">Contact Phone *</Label>
                  <Input
                    id="pickupContactPhone"
                    value={formData.pickupContactPhone}
                    onChange={(e) => handleInputChange("pickupContactPhone", e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="pickupInstructions">Special Instructions</Label>
                  <Textarea
                    id="pickupInstructions"
                    value={formData.pickupInstructions}
                    onChange={(e) => handleInputChange("pickupInstructions", e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Destination Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-semibold">Destination Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="destinationAddress">Destination Address *</Label>
                  <Input
                    id="destinationAddress"
                    value={formData.destinationAddress}
                    onChange={(e) => handleInputChange("destinationAddress", e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destinationContactName">Contact Name *</Label>
                  <Input
                    id="destinationContactName"
                    value={formData.destinationContactName}
                    onChange={(e) => handleInputChange("destinationContactName", e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destinationContactPhone">Contact Phone *</Label>
                  <Input
                    id="destinationContactPhone"
                    value={formData.destinationContactPhone}
                    onChange={(e) => handleInputChange("destinationContactPhone", e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="destinationInstructions">Special Instructions</Label>
                  <Textarea
                    id="destinationInstructions"
                    value={formData.destinationInstructions}
                    onChange={(e) => handleInputChange("destinationInstructions", e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Package Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-semibold">Package Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="packageDescription">Package Description *</Label>
                  <Input
                    id="packageDescription"
                    value={formData.packageDescription}
                    onChange={(e) => handleInputChange("packageDescription", e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="packageWeight">Weight (lbs) *</Label>
                  <Input
                    id="packageWeight"
                    type="number"
                    step="0.1"
                    value={formData.packageWeight}
                    onChange={(e) => handleInputChange("packageWeight", e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="packageValue">Value ($) *</Label>
                  <Input
                    id="packageValue"
                    type="number"
                    step="0.01"
                    value={formData.packageValue}
                    onChange={(e) => handleInputChange("packageValue", e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="packageLength">Length (inches)</Label>
                  <Input
                    id="packageLength"
                    type="number"
                    step="0.1"
                    value={formData.packageLength}
                    onChange={(e) => handleInputChange("packageLength", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="packageWidth">Width (inches)</Label>
                  <Input
                    id="packageWidth"
                    type="number"
                    step="0.1"
                    value={formData.packageWidth}
                    onChange={(e) => handleInputChange("packageWidth", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="packageHeight">Height (inches)</Label>
                  <Input
                    id="packageHeight"
                    type="number"
                    step="0.1"
                    value={formData.packageHeight}
                    onChange={(e) => handleInputChange("packageHeight", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => handleInputChange("priority", value)}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4 md:col-span-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="packageFragile"
                      checked={formData.packageFragile}
                      onCheckedChange={(checked) => handleInputChange("packageFragile", checked as boolean)}
                      disabled={loading}
                    />
                    <Label htmlFor="packageFragile">Fragile item</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="packageRequiresSignature"
                      checked={formData.packageRequiresSignature}
                      onCheckedChange={(checked) => handleInputChange("packageRequiresSignature", checked as boolean)}
                      disabled={loading}
                    />
                    <Label htmlFor="packageRequiresSignature">Requires signature</Label>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Scheduling & Pricing */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <h3 className="text-lg font-semibold">Scheduling & Pricing</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Scheduled Pickup *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-transparent",
                          !scheduledPickup && "text-muted-foreground",
                        )}
                        disabled={loading}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {scheduledPickup ? format(scheduledPickup, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={scheduledPickup} onSelect={setScheduledPickup} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Estimated Delivery *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-transparent",
                          !estimatedDelivery && "text-muted-foreground",
                        )}
                        disabled={loading}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {estimatedDelivery ? format(estimatedDelivery, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={estimatedDelivery}
                        onSelect={setEstimatedDelivery}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Delivery Cost ($) *</Label>
                  <Input
                    id="cost"
                    type="number"
                    step="0.01"
                    value={formData.cost}
                    onChange={(e) => handleInputChange("cost", e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance (miles)</Label>
                  <Input
                    id="distance"
                    type="number"
                    step="0.1"
                    value={formData.distance}
                    onChange={(e) => handleInputChange("distance", e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border/50">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                  Cancel
                </Button>
              )}
              <Button type="submit" className="animate-glow" disabled={loading}>
                {loading ? (
                  <>
                    <Truck className="mr-2 h-4 w-4 animate-spin" />
                    {delivery ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <Package className="mr-2 h-4 w-4" />
                    {delivery ? "Update Delivery" : "Create Delivery"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
