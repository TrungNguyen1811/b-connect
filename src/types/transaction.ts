export interface ITransaction {
  transactionId: string
  userId: string
  username: string
  bankCode: string
  cardType: string
  orderInfo: string
  paymentStatus: string
  transactionNo: string
  paymentDate: string
  // paymentMessage: string
  amount: number
  signature: string
  isRefunded: string
}

export interface IRefund {
  id?: string
  userId?: string
  transactionId: string
  reason: string
}
