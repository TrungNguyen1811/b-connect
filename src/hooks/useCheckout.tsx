import React, { createContext, useContext, useState, ReactNode } from 'react'
import { IOrder } from 'src/types'

export interface ContextType {
  dataCheckout: IOrder | null
  setDataCheckout: (dataCheckout: IOrder | null) => void
}

export const CheckoutContext = createContext<ContextType | undefined>(undefined)

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dataCheckout, setDataCheckout] = useState<IOrder | null>(null)

  return <CheckoutContext.Provider value={{ dataCheckout, setDataCheckout }}>{children}</CheckoutContext.Provider>
}

export const useCheckout = (): ContextType => {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider')
  }
  return context
}
