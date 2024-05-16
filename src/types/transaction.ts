export interface ITransaction {
  transactionId: string
  userId: string
  username: string
  bankCode: string
  cardType: string
  orderInfo: string
  paymentStatus: string
  paymentMessage: string
  paymentDate: string
  amount: number
  signature: string
}

export interface IRefund {
  id?: string
  userId?: string
  transactionId: string
  reason: string
}
