"use client"

import type React from "react"
import { useEffect } from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Truck,
  LayoutDashboard,
  Package,
  MapPin,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  Bell,
  Search,
  Menu,
  LogOut,
  User,
  HelpCircle,
  Route,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    console.log("[v0] Logout clicked, user:", user)
    logout()
    router.push("/")
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/dashboard",
    },
    {
      name: "Deliveries",
      href: "/dashboard/deliveries",
      icon: Package,
      current: pathname.startsWith("/dashboard/deliveries"),
      badge: "12",
    },
    {
      name: "Tracking",
      href: "/dashboard/tracking",
      icon: MapPin,
      current: pathname.startsWith("/dashboard/tracking"),
    },
    {
      name: "Routes",
      href: "/dashboard/routes",
      icon: Route,
      current: pathname.startsWith("/dashboard/routes"),
    },
    {
      name: "Fleet",
      href: "/dashboard/fleet",
      icon: Truck,
      current: pathname.startsWith("/dashboard/fleet"),
    },
    {
      name: "Drivers",
      href: "/dashboard/drivers",
      icon: Users,
      current: pathname.startsWith("/dashboard/drivers"),
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      current: pathname.startsWith("/dashboard/analytics"),
    },
    {
      name: "Payments",
      href: "/dashboard/payments",
      icon: CreditCard,
      current: pathname.startsWith("/dashboard/payments"),
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      current: pathname.startsWith("/dashboard/settings"),
    },
  ]

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card/50 backdrop-blur-lg border-r border-border/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-4 sm:px-6 py-4 border-b border-border/50">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="ml-2 text-lg sm:text-xl font-bold truncate">FleetFlow</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setSidebarOpen(false)}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center px-2 sm:px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    item.current
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                  )}
                >
                  <item.icon className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                  {item.badge && (
                    <Badge className="ml-auto bg-primary/20 text-primary border-primary/30 text-xs">{item.badge}</Badge>
                  )}
                </motion.div>
              </Link>
            ))}
          </nav>
          {/* fff */}

          {/* User Profile */}
          <div className="p-2 sm:p-4 border-t border-border/50">
            {mounted && user ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-2">
                  <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start p-2 h-auto text-red-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="w-full p-2 h-12 bg-secondary/50 rounded-lg animate-pulse" />
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-card/30 backdrop-blur-lg border-b border-border/50 px-4 sm:px-6 py-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center min-w-0 flex-1">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2 flex-shrink-0"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-secondary/50 border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 w-full"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 ml-4">
              <Button variant="ghost" size="sm" className="relative flex-shrink-0">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs">
                  3
                </Badge>
              </Button>

              <div className="hidden md:flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground">Welcome back,</span>
                <span className="font-medium truncate max-w-24">{user?.firstName}</span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 max-w-full overflow-x-hidden">{children}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
