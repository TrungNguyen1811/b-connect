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

export interface DataCart {
  productId: string
  userId: string
  quantity: number
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
  const { user, logout } = useAuth()
  const userId: string = user?.userId as string
  const [cartData, setCartData] = useState<DataCart>()
  const [cartId, setCartId] = useState<string>()

  useEffect(() => {
    // Retrieve cart items from cookies
    const storedCartItems = document.cookie.split('; ').find((row) => row.startsWith(`cartItems_${userId}=`))

    if (storedCartItems) {
      try {
        const cartItemsArray = JSON.parse(storedCartItems.split('=')[1] || '[]')
        setCartItems(cartItemsArray)
      } catch (error) {
        console.log('Error parsing stored cart items:', error)
      }
    }
  }, [userId])

  useEffect(() => {
    // Save cart items to cookies
    document.cookie = `cartItems_${userId}=${JSON.stringify(cartItems)}; path=/`
  }, [cartItems, userId])

  // useEffect(() => {
  //   // Fetch cartId asynchronously
  //   const fetchCartId = async () => {
  //     try {
  //       const fetchedCartId = await getCartIdApi(userId)
  //       setCartId(fetchedCartId)
  //     } catch (error) {
  //       console.error('Error retrieving cartId:', error)
  //     }
  //   }

  //   fetchCartId()
  // }, [userId])

  // useEffect(() => {
  //   // Update cartData when cartItems or cartId change
  //   setCartData({
  //     productId: cartItems || '', // Handle the case when cartId is undefined
  //     userId,
  //     quantity: cartItems.reduce((total, item) => total + item.quantity, 0),
  //   })
  // }, [cartItems, userId, cartId])

  // useEffect(() => {
  //   // Save to the database on logout
  //   const handleLogout = async () => {
  //     if (cartData) {
  //       await saveCartToDatabase(cartData)
  //     }
  //   }

  //   if (!logout) {
  //     toast({
  //       title: 'Not yet saved to the database',
  //     })
  //   } else {
  //     handleLogout()
  //   }
  // }, [logout, cartData])

  // const saveCartToDatabase = async (cartData: DataCart) => {
  //   // Your logic to save cart data to the database
  //   try {
  //     await postCartApi(cartData)
  //     console.log('Cart saved to the database.')
  //   } catch (error) {
  //     console.error('Error saving cart to the database:', error)
  //   }
  // }

  const addToCart = (_id: string) => {
    const existingItem = cartItems.find((item) => item.productId === _id)

    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.productId === _id ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      setCartItems((prevItems) => [...prevItems, { productId: _id, quantity: 1, _id: new Date().toISOString() }])
    }
  }

  const decreaseToCart = (_id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === _id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    )
  }

  const removeFromCart = (_id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.productId !== _id))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const contextValue = {
    cartItems,
    addToCart,
    decreaseToCart,
    removeFromCart,
    clearCart,
  }

  return <OrderCartContext.Provider value={contextValue}>{children}</OrderCartContext.Provider>
}
