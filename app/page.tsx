"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Truck,
  MapPin,
  Shield,
  Zap,
  Users,
  BarChart3,
  Globe,
  ArrowRight,
  Play,
  Star,
  Check,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import dynamic from "next/dynamic"

const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => ({ default: mod.Canvas })), {
  ssr: false,
})

const OrbitControls = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.OrbitControls })), {
  ssr: false,
})

const Environment = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.Environment })), {
  ssr: false,
})

const Float = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.Float })), {
  ssr: false,
})

function TruckModel() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={[0, 0, 0]} scale={[2, 2, 2]}>
        <boxGeometry args={[3, 1.5, 1]} />
        <meshStandardMaterial color="#ff6633" />
      </mesh>
      <mesh position={[-1.5, -0.5, 0]} scale={[1, 1, 1]}>
        <boxGeometry args={[1.5, 1, 1]} />
        <meshStandardMaterial color="#ff6633" />
      </mesh>
      <mesh position={[-2, -1, 0.6]} scale={[0.3, 0.3, 0.3]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-2, -1, -0.6]} scale={[0.3, 0.3, 0.3]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1, -1, 0.6]} scale={[0.3, 0.3, 0.3]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1, -1, -0.6]} scale={[0.3, 0.3, 0.3]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </Float>
  )
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  const features = [
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description: "Monitor your entire fleet with GPS precision and live updates",
    },
    {
      icon: Zap,
      title: "Route Optimization",
      description: "AI-powered routing saves time, fuel, and reduces delivery costs",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Integrated payment processing with fraud protection",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and performance metrics",
    },
    {
      icon: Users,
      title: "Driver Management",
      description: "Complete driver profiles, scheduling, and performance tracking",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Worldwide logistics support with local expertise",
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small fleets",
      features: ["Up to 5 vehicles", "Basic tracking", "Route optimization", "Email support", "Mobile app access"],
      popular: false,
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 25 vehicles",
        "Advanced analytics",
        "Driver management",
        "API access",
        "Priority support",
        "Custom integrations",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For large operations",
      features: [
        "Unlimited vehicles",
        "White-label solution",
        "Advanced reporting",
        "Dedicated support",
        "Custom development",
        "SLA guarantee",
      ],
      popular: false,
    },
  ]

  const stats = [
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "50%", label: "Cost Reduction" },
    { value: "24/7", label: "Support Available" },
    { value: "10k+", label: "Active Fleets" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-balance">FleetFlow</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </button>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="animate-glow">
                Get Started
              </Button>
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <button
                onClick={() => scrollToSection("about")}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </button>
              <Link href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="w-full animate-glow">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-8 sm:pb-12 min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left"
          >
            <motion.div variants={itemVariants}>
              <Badge className="mb-3 sm:mb-4 bg-primary/20 text-primary border-primary/30 text-xs sm:text-sm">
                Revolutionary Logistics Platform
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-balance leading-[1.1] sm:leading-tight">
                Unified
                <span className="text-primary block">Logistics</span>
                Platform
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground text-pretty leading-relaxed max-w-full lg:max-w-lg mx-auto lg:mx-0"
            >
              Unlock unequalled business performance with real-time insights, automation, an expanding marketplace, and
              digital payments. Join the logistics revolution in the making.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 lg:py-6 animate-glow max-w-xs sm:max-w-none mx-auto sm:mx-0"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 lg:py-6 bg-transparent max-w-xs sm:max-w-none mx-auto sm:mx-0"
              >
                <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 pt-2 sm:pt-4 justify-center lg:justify-start"
            >
              <div className="flex items-center space-x-1 justify-center lg:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground text-center lg:text-left">
                Trusted by 10,000+ logistics companies
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] order-first lg:order-last"
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
              {/* Animated Truck */}
              <motion.div
                animate={{
                  x: [0, 20, 0, -20, 0],
                  y: [0, -10, 0, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <Truck className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 text-primary" />
              </motion.div>

              {/* Floating Text Elements */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute top-8 left-8 bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs sm:text-sm font-medium border border-primary/20"
              >
                Real-time Tracking
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-16 right-8 bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs sm:text-sm font-medium border border-accent/20"
              >
                Route Optimization
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute bottom-16 left-12 bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs sm:text-sm font-medium border border-primary/20"
              >
                Fleet Management
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-8 right-12 bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs sm:text-sm font-medium border border-accent/20"
              >
                Analytics
              </motion.div>

              {/* Background Animation Lines */}
              <div className="absolute inset-0">
                <motion.div
                  animate={{
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                />
                <motion.div
                  animate={{
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent/20 to-transparent"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-16 sm:h-32 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-flow" />
          <div className="absolute bottom-2 sm:bottom-4 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-flow delay-1000" />
          <div className="absolute bottom-4 sm:bottom-8 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-flow delay-2000" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">About FleetFlow</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
                Revolutionizing logistics for the modern world
              </h2>
              <p className="text-lg text-muted-foreground mb-6 text-pretty">
                Founded in 2020, FleetFlow has been at the forefront of logistics innovation. We believe that technology
                should simplify operations, not complicate them.
              </p>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Our platform serves over 10,000 companies worldwide, from small local delivery services to enterprise
                logistics operations, helping them reduce costs by up to 50% while improving efficiency.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">500M+</div>
                  <div className="text-muted-foreground">Deliveries Tracked</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">150+</div>
                  <div className="text-muted-foreground">Countries Served</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div className="bg-card/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                  <div className="bg-card/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">50%</div>
                    <div className="text-sm text-muted-foreground">Cost Savings</div>
                  </div>
                  <div className="bg-card/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">10k+</div>
                    <div className="text-sm text-muted-foreground">Happy Clients</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Platform Features</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              The complete platform to build the future
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Your team's toolkit to stop configuring and start innovating. Securely build, deploy, and scale the best
              logistics experiences.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-pretty">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="pricing" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Pricing Plans</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Choose the perfect plan for your fleet
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
          >
            {pricingPlans.map((plan, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  className={`h-full relative ${plan.popular ? "border-primary shadow-lg scale-105" : "border-border"} bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground mb-4">{plan.description}</p>
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-primary">{plan.price}</span>
                        <span className="text-muted-foreground ml-1">{plan.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${plan.popular ? "animate-glow" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Ready to transform your logistics?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Join thousands of companies already using FleetFlow to optimize their delivery operations and reduce
              costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-6 sm:px-8 py-4 sm:py-6 animate-glow">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-6 sm:px-8 py-4 sm:py-6 bg-transparent">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">FleetFlow</span>
              </div>
              <p className="text-muted-foreground text-pretty">
                Revolutionary logistics platform for the modern world.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <button onClick={() => scrollToSection("about")} className="hover:text-foreground transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 FleetFlow. All rights reserved.</p>
            <p className="mt-2">
              Developed by{" "}
              <a
                href="https://github.com/adenueltech?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                adenuel
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
