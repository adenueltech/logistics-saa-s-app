export interface Payment {
  id: string
  deliveryId: string
  customerId: string
  amount: number
  currency: string
  status: "pending" | "processing" | "completed" | "failed" | "refunded"
  paymentMethod: "card" | "bank_transfer" | "cash" | "digital_wallet"
  transactionId?: string
  createdAt: Date
  updatedAt: Date
  dueDate: Date
  paidAt?: Date
  description: string
  fees: {
    baseRate: number
    distanceFee: number
    weightFee: number
    urgentFee: number
    total: number
  }
}

export interface Invoice {
  id: string
  paymentId: string
  invoiceNumber: string
  customerName: string
  customerEmail: string
  customerAddress: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  issuedAt: Date
  dueDate: Date
  paidAt?: Date
}

export interface InvoiceItem {
  description: string
  quantity: number
  rate: number
  amount: number
}

class PaymentService {
  private payments: Payment[] = [
    {
      id: "pay-001",
      deliveryId: "del-001",
      customerId: "cust-001",
      amount: 45.99,
      currency: "USD",
      status: "completed",
      paymentMethod: "card",
      transactionId: "txn_1234567890",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
      dueDate: new Date("2024-01-20"),
      paidAt: new Date("2024-01-15"),
      description: "Express delivery - Downtown to Airport",
      fees: {
        baseRate: 25.0,
        distanceFee: 15.0,
        weightFee: 3.99,
        urgentFee: 2.0,
        total: 45.99,
      },
    },
    {
      id: "pay-002",
      deliveryId: "del-002",
      customerId: "cust-002",
      amount: 32.5,
      currency: "USD",
      status: "pending",
      paymentMethod: "bank_transfer",
      createdAt: new Date("2024-01-16"),
      updatedAt: new Date("2024-01-16"),
      dueDate: new Date("2024-01-23"),
      description: "Standard delivery - Office supplies",
      fees: {
        baseRate: 25.0,
        distanceFee: 7.5,
        weightFee: 0.0,
        urgentFee: 0.0,
        total: 32.5,
      },
    },
    {
      id: "pay-003",
      deliveryId: "del-003",
      customerId: "cust-003",
      amount: 78.25,
      currency: "USD",
      status: "processing",
      paymentMethod: "digital_wallet",
      createdAt: new Date("2024-01-17"),
      updatedAt: new Date("2024-01-17"),
      dueDate: new Date("2024-01-24"),
      description: "Urgent delivery - Medical supplies",
      fees: {
        baseRate: 25.0,
        distanceFee: 28.25,
        weightFee: 15.0,
        urgentFee: 10.0,
        total: 78.25,
      },
    },
  ]

  private invoices: Invoice[] = [
    {
      id: "inv-001",
      paymentId: "pay-001",
      invoiceNumber: "INV-2024-001",
      customerName: "Acme Corporation",
      customerEmail: "billing@acme.com",
      customerAddress: "123 Business St, Downtown, NY 10001",
      items: [
        { description: "Base delivery rate", quantity: 1, rate: 25.0, amount: 25.0 },
        { description: "Distance fee (15 miles)", quantity: 1, rate: 15.0, amount: 15.0 },
        { description: "Weight surcharge", quantity: 1, rate: 3.99, amount: 3.99 },
        { description: "Express handling", quantity: 1, rate: 2.0, amount: 2.0 },
      ],
      subtotal: 45.99,
      tax: 0.0,
      total: 45.99,
      status: "paid",
      issuedAt: new Date("2024-01-15"),
      dueDate: new Date("2024-01-20"),
      paidAt: new Date("2024-01-15"),
    },
  ]

  async getPayments(): Promise<Payment[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.payments]), 500)
    })
  }

  async getPayment(id: string): Promise<Payment | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const payment = this.payments.find((p) => p.id === id)
        resolve(payment || null)
      }, 300)
    })
  }

  async createPayment(paymentData: Omit<Payment, "id" | "createdAt" | "updatedAt">): Promise<Payment> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPayment: Payment = {
          ...paymentData,
          id: `pay-${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        this.payments.unshift(newPayment)
        resolve(newPayment)
      }, 800)
    })
  }

  async updatePaymentStatus(id: string, status: Payment["status"]): Promise<Payment | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const paymentIndex = this.payments.findIndex((p) => p.id === id)
        if (paymentIndex !== -1) {
          this.payments[paymentIndex] = {
            ...this.payments[paymentIndex],
            status,
            updatedAt: new Date(),
            ...(status === "completed" && { paidAt: new Date() }),
          }
          resolve(this.payments[paymentIndex])
        } else {
          resolve(null)
        }
      }, 500)
    })
  }

  async processPayment(
    paymentId: string,
    paymentMethod: Payment["paymentMethod"],
  ): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate payment processing
        const success = Math.random() > 0.1 // 90% success rate
        if (success) {
          const transactionId = `txn_${Date.now()}`
          this.updatePaymentStatus(paymentId, "completed")
          resolve({ success: true, transactionId })
        } else {
          this.updatePaymentStatus(paymentId, "failed")
          resolve({ success: false, error: "Payment processing failed. Please try again." })
        }
      }, 2000)
    })
  }

  async getInvoices(): Promise<Invoice[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.invoices]), 500)
    })
  }

  async generateInvoice(paymentId: string): Promise<Invoice> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const payment = this.payments.find((p) => p.id === paymentId)
        if (payment) {
          const invoice: Invoice = {
            id: `inv-${Date.now()}`,
            paymentId,
            invoiceNumber: `INV-2024-${String(this.invoices.length + 1).padStart(3, "0")}`,
            customerName: "Customer Name",
            customerEmail: "customer@example.com",
            customerAddress: "Customer Address",
            items: [
              {
                description: "Base delivery rate",
                quantity: 1,
                rate: payment.fees.baseRate,
                amount: payment.fees.baseRate,
              },
              ...(payment.fees.distanceFee > 0
                ? [
                    {
                      description: "Distance fee",
                      quantity: 1,
                      rate: payment.fees.distanceFee,
                      amount: payment.fees.distanceFee,
                    },
                  ]
                : []),
              ...(payment.fees.weightFee > 0
                ? [
                    {
                      description: "Weight surcharge",
                      quantity: 1,
                      rate: payment.fees.weightFee,
                      amount: payment.fees.weightFee,
                    },
                  ]
                : []),
              ...(payment.fees.urgentFee > 0
                ? [
                    {
                      description: "Express handling",
                      quantity: 1,
                      rate: payment.fees.urgentFee,
                      amount: payment.fees.urgentFee,
                    },
                  ]
                : []),
            ],
            subtotal: payment.amount,
            tax: 0.0,
            total: payment.amount,
            status: payment.status === "completed" ? "paid" : "sent",
            issuedAt: new Date(),
            dueDate: payment.dueDate,
            paidAt: payment.paidAt,
          }
          this.invoices.unshift(invoice)
          resolve(invoice)
        }
      }, 800)
    })
  }

  calculateDeliveryFee(distance: number, weight: number, isUrgent: boolean): Payment["fees"] {
    const baseRate = 25.0
    const distanceFee = distance * 1.5 // $1.50 per mile
    const weightFee = weight > 50 ? (weight - 50) * 0.25 : 0 // $0.25 per lb over 50lbs
    const urgentFee = isUrgent ? 10.0 : 0

    return {
      baseRate,
      distanceFee: Math.round(distanceFee * 100) / 100,
      weightFee: Math.round(weightFee * 100) / 100,
      urgentFee,
      total: Math.round((baseRate + distanceFee + weightFee + urgentFee) * 100) / 100,
    }
  }
}

export const paymentService = new PaymentService()
