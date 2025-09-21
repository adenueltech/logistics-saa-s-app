"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, CreditCard, Key, Save, Upload, Plus } from "lucide-react"
import { useAuth } from "@/lib/auth"

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              {/* Profile Settings */}
              <TabsContent value="profile" className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Profile Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Update your personal information and profile picture
                    </p>
                  </div>

                  <div className="flex items-center space-x-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary/20 text-primary text-lg">
                        {user?.firstName?.[0]}
                        {user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Change Photo
                      </Button>
                      <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={user?.firstName || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={user?.lastName || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user?.email || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select defaultValue="manager">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="manager">Fleet Manager</SelectItem>
                          <SelectItem value="dispatcher">Dispatcher</SelectItem>
                          <SelectItem value="driver">Driver</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="utc-5">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                          <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                          <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Tell us about yourself..." />
                  </div>

                  <Button className="bg-primary hover:bg-primary/90">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </TabsContent>

              {/* Notifications Settings */}
              <TabsContent value="notifications" className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Notification Preferences</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose how you want to be notified about important events
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Email Notifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Delivery Updates</p>
                            <p className="text-sm text-muted-foreground">Get notified when deliveries are completed</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Driver Alerts</p>
                            <p className="text-sm text-muted-foreground">Notifications about driver status changes</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">System Maintenance</p>
                            <p className="text-sm text-muted-foreground">Important system updates and maintenance</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Push Notifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Real-time Tracking</p>
                            <p className="text-sm text-muted-foreground">Live updates on vehicle locations</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Emergency Alerts</p>
                            <p className="text-sm text-muted-foreground">Critical alerts and emergencies</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">SMS Notifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Delivery Confirmations</p>
                            <p className="text-sm text-muted-foreground">SMS confirmations for completed deliveries</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Security Settings</h3>
                    <p className="text-sm text-muted-foreground">Manage your account security and authentication</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Password</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                      </div>
                      <Button variant="outline">Update Password</Button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                        <div>
                          <p className="font-medium">Enable 2FA</p>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                          Not Enabled
                        </Badge>
                      </div>
                      <Button variant="outline">
                        <Shield className="w-4 h-4 mr-2" />
                        Enable 2FA
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">API Keys</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                          <div>
                            <p className="font-medium">Production API Key</p>
                            <p className="text-sm text-muted-foreground font-mono">sk_prod_••••••••••••••••</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Key className="w-4 h-4 mr-2" />
                            Regenerate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Appearance Settings */}
              <TabsContent value="appearance" className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Appearance</h3>
                    <p className="text-sm text-muted-foreground">Customize the look and feel of your dashboard</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Theme</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 border border-primary rounded-lg bg-primary/10">
                          <div className="w-full h-20 bg-gradient-to-br from-slate-900 to-slate-800 rounded mb-2"></div>
                          <p className="text-sm font-medium">Dark</p>
                          <p className="text-xs text-muted-foreground">Current theme</p>
                        </div>
                        <div className="p-4 border border-border/50 rounded-lg hover:border-primary/50 cursor-pointer">
                          <div className="w-full h-20 bg-gradient-to-br from-white to-gray-100 rounded mb-2"></div>
                          <p className="text-sm font-medium">Light</p>
                          <p className="text-xs text-muted-foreground">Coming soon</p>
                        </div>
                        <div className="p-4 border border-border/50 rounded-lg hover:border-primary/50 cursor-pointer">
                          <div className="w-full h-20 bg-gradient-to-br from-slate-900 via-white to-slate-900 rounded mb-2"></div>
                          <p className="text-sm font-medium">Auto</p>
                          <p className="text-xs text-muted-foreground">System preference</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Dashboard Layout</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Compact Mode</p>
                            <p className="text-sm text-muted-foreground">Reduce spacing and padding</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Sidebar Auto-collapse</p>
                            <p className="text-sm text-muted-foreground">
                              Automatically collapse sidebar on small screens
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Company Settings */}
              <TabsContent value="company" className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Company Information</h3>
                    <p className="text-sm text-muted-foreground">Manage your company details and branding</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" defaultValue="FleetFlow Logistics" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select defaultValue="logistics">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="logistics">Logistics & Transportation</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select defaultValue="50-200">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="50-200">50-200 employees</SelectItem>
                          <SelectItem value="200+">200+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" placeholder="https://fleetflow.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="123 Main St, City, State, ZIP" />
                  </div>

                  <Button className="bg-primary hover:bg-primary/90">
                    <Save className="w-4 h-4 mr-2" />
                    Save Company Info
                  </Button>
                </div>
              </TabsContent>

              {/* Billing Settings */}
              <TabsContent value="billing" className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Billing & Subscription</h3>
                    <p className="text-sm text-muted-foreground">Manage your subscription and payment methods</p>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 border border-border/50 rounded-lg bg-secondary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Current Plan</h4>
                          <p className="text-sm text-muted-foreground">Professional Plan</p>
                        </div>
                        <Badge className="bg-primary/20 text-primary border-primary/30">Active</Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Monthly Cost</p>
                          <p className="text-lg font-bold">$99/month</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Next Billing</p>
                          <p className="text-lg font-bold">Feb 15, 2024</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Vehicles Included</p>
                          <p className="text-lg font-bold">Up to 50</p>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline">Change Plan</Button>
                        <Button variant="outline">Cancel Subscription</Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Payment Methods</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CreditCard className="w-8 h-8 text-muted-foreground" />
                            <div>
                              <p className="font-medium">•••• •••• •••• 4242</p>
                              <p className="text-sm text-muted-foreground">Expires 12/25</p>
                            </div>
                          </div>
                          <Badge variant="outline">Primary</Badge>
                        </div>
                      </div>
                      <Button variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Payment Method
                      </Button>
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
