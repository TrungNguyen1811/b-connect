import React, { createContext, useContext, useState, useEffect } from 'react'
import { ICart } from 'src/types'
import { useAuth } from './useAuth'

export interface ContextType {
  cartItems: ICart[]
  addToCart: (_id: string) => void
  decreaseToCart: (_id: string) => void
  removeFromCart: (_id: string) => void
  clearCart: () => void
}

export const OrderCartContext = createContext<ContextType | undefined>(undefined)

export const useOrderCart = (): ContextType => {
  const context = useContext(OrderCartContext)

  if (!context) {
    throw new Error('useOrderCart must be used within an OrderCartProvider')
  }
  return context
}

export const OrderCartProvider = ({ children }: React.PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<ICart[]>([])
  const { user } = useAuth()
  const userId: string = user?.userId as string

  useEffect(() => {
    // Retrieve cart items from cookies
    const storedCartItems = document.cookie.split('; ').find((row) => row.startsWith(`cartItems_${userId}=`))
    console.log(storedCartItems)

    if (storedCartItems) {
      try {
        const cartItemsArray = JSON.parse(storedCartItems.split('=')[1] || '[]')
        setCartItems(cartItemsArray)
      } catch (error) {
        console.log('lỗi')
      }
    }
  }, [userId])

  useEffect(() => {
    // Save cart items to cookies
    document.cookie = `cartItems_${userId}=${JSON.stringify(cartItems)}; path=/`
    // Optionally, save to the server using postCartApi(cartItems)
    // saveCartToDatabase(cartItems, userId)
  }, [cartItems, userId])

  const addToCart = (_id: string) => {
    const existingItem = cartItems.find((item) => item.bookId === _id)

    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.bookId === _id ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      setCartItems((prevItems) => [...prevItems, { bookId: _id, quantity: 1, _id: new Date().toISOString() }])
    }
    // saveCartState()
  }

  const decreaseToCart = (_id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.bookId === _id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    )
    // saveCartState()
  }

  const removeFromCart = (_id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.bookId !== _id))
    // saveCartState()
  }

  const clearCart = () => {
    setCartItems([])
    // saveCartState()
  }
  // const saveCartToDatabase = async (cartData: ICart[], userId: string) => {
  //   try {
  //     const saveCartResponse = await postCartApi(cartData)
  //     console.log('Cart saved to database:', saveCartResponse.data)
  //   } catch (error) {
  //     console.error('Error saving cart to database:', error)
  //   }
  // }

  // const saveCartState = () => {
  //   // Save cart data to both cookie and server
  //   document.cookie = `cartItems_${userId}=${JSON.stringify(cartItems)}; path=/`
  //   saveCartToDatabase(cartItems, userId)
  // }
  const contextValue = {
    cartItems,
    addToCart,
    decreaseToCart,
    removeFromCart,
    clearCart,
  }

  return <OrderCartContext.Provider value={contextValue}>{children}</OrderCartContext.Provider>
}
