import React, { createContext, useContext, useState, useEffect } from 'react'
import { IBook, ICart } from 'src/types'
import { useAuth } from './useAuth'
import { getCartIdApi } from 'src/api/cart/get-cart-id'
import { postCartApi } from 'src/api/cart/post-cart'
import { toast } from 'src/components/ui/use-toast'
import { getCartApi } from 'src/api/cart/get-cart'
import { getBookById } from 'src/api/books/get-book'

// export interface ContextType {
//   cartItems: ICart[]
//   addToCart: (_id: string) => void
//   decreaseToCart: (_id: string) => void
//   removeFromCart: (_id: string) => void
//   clearCart: () => void
// }

// export interface DataCart {
//   productId: string
//   cartId: string
//   quantity: number
// }

// export const OrderCartContext = createContext<ContextType | undefined>(undefined)

// export const useOrderCart = (): ContextType => {
//   const context = useContext(OrderCartContext)

//   if (!context) {
//     throw new Error('useOrderCart must be used within an OrderCartProvider')
//   }

//   return context
// }

// export const OrderCartProvider = ({ children }: React.PropsWithChildren) => {
//   const [cartItems, setCartItems] = useState<ICart[]>([])
//   const { user, logout } = useAuth()
//   const userId: string = user?.userId as string
//   const [cartData, setCartData] = useState<DataCart[]>([])
//   const [cartId, setCartId] = useState<string>()

//   useEffect(() => {
//     const storedCartItems = document.cookie.split('; ').find((row) => row.startsWith(`cartItems_${userId}=`))

//     if (storedCartItems) {
//       try {
//         const cartItemsArray = JSON.parse(storedCartItems.split('=')[1] || '[]')
//         setCartItems(cartItemsArray)
//       } catch (error) {
//         // console.log('Error parsing stored cart items:', error)
//       }
//     } else {
//       fetchCartDataFromDatabase()
//     }
//   }, [userId])

//   useEffect(() => {
//     document.cookie = `cartItems_${userId}=${JSON.stringify(cartItems)}; path=/`
//   }, [cartItems, userId])

//   useEffect(() => {
//     if (user) {
//       fetchCartDataFromDatabase()
//     }
//   }, [user])

//   useEffect(() => {
//     const fetchCartId = async () => {
//       try {
//         const fetchedCartId = await getCartIdApi(userId)
//         setCartId(fetchedCartId)
//       } catch (error) {
//         // console.error('Error retrieving cartId:', error)
//       }
//     }

//     fetchCartId()
//   }, [userId])

//   useEffect(() => {
//     const updateCartData = () => {
//       if (cartItems && cartItems.length > 0) {
//         const updatedCartData = cartItems.map((book) => ({
//           productId: book.productId,
//           cartId: cartId || '',
//           quantity: book.quantity,
//         }))
//         setCartData(updatedCartData)
//       }
//     }

//     updateCartData()
//   }, [cartItems, cartId])

//   useEffect(() => {
//     const handleLogout = async () => {
//       if (cartData.length > 0) {
//         await saveCartToDatabase(cartData)
//       }
//     }

//     if (!logout) {
//       toast({
//         title: 'Not yet saved to the database',
//       })
//     } else {
//       handleLogout()
//     }
//   }, [logout, cartData])

//   const saveCartToDatabase = async (cartData: DataCart[]) => {
//     try {
//       await postCartApi(cartData)
//       // console.log('Cart saved to the database:', cartData)
//     } catch (error) {
//       // console.error('Error saving cart to the database:', error)
//       toast({
//         title: 'Error saving cart to the database',
//         description: 'An error occurred while saving your cart. Please try again later.',
//       })
//     }
//   }

//   const fetchCartDataFromDatabase = async () => {
//     try {
//       const cartDataFromDatabase = await getCartApi(userId)
//       setCartItems(cartDataFromDatabase)
//     } catch (error) {
//       // console.error('Error fetching cart data from database:', error)
//     }
//   }

//   const addToCart = (_id: string) => {
//     const existingItem = cartItems.find((item) => item.productId === _id)

//     if (existingItem) {
//       setCartItems((prevItems) =>
//         prevItems.map((item) => (item.productId === _id ? { ...item, quantity: item.quantity + 1 } : item)),
//       )
//     } else {
//       setCartItems((prevItems) => [...prevItems, { productId: _id, quantity: 1 }])
//     }
//   }

//   const decreaseToCart = (_id: string) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.productId === _id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item,
//       ),
//     )
//   }

//   const removeFromCart = (_id: string) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.productId !== _id))
//   }

//   const clearCart = () => {
//     setCartItems([])
//   }

//   const contextValue = {
//     cartItems,
//     addToCart,
//     decreaseToCart,
//     removeFromCart,
//     clearCart,
//   }

//   return <OrderCartContext.Provider value={contextValue}>{children}</OrderCartContext.Provider>
// }

export interface ContextType {
  cartItems: ICart[]
  addToCart: (_id: string) => void
  decreaseToCart: (_id: string) => void
  removeFromCart: (_id: string) => void
  clearCart: () => void
}

export interface DataCart {
  productId: string
  cartId: string
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
  const [cartData, setCartData] = useState<DataCart[]>([])
  const [cartId, setCartId] = useState<string>()
  console.log('cartData', cartData)

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartDataFromServer = await getCartApi(userId)
        console.log('cartDataFromServer', cartDataFromServer)
        setCartItems(cartDataFromServer)
        document.cookie = `cartItems_${userId}=${JSON.stringify(cartDataFromServer)}; path=/`
      } catch (error) {
        console.error('Error fetching cart data from server:', error)
      }
    }

    if (user) {
      fetchCartData()
    }
  }, [user, userId])

  useEffect(() => {
    const fetchCartId = async () => {
      try {
        const fetchedCartId = await getCartIdApi(userId)
        setCartId(fetchedCartId)
      } catch (error) {
        console.error('Error retrieving cartId:', error)
      }
    }

    if (user) {
      fetchCartId()
    }
  }, [userId, user])

  useEffect(() => {
    document.cookie = `cartItems_${userId}=${JSON.stringify(cartItems)}; path=/`
  }, [cartItems, userId])

  useEffect(() => {
    const updateCartData = () => {
      if (cartItems && cartItems.length > 0) {
        const updatedCartData = cartItems.map((book) => ({
          productId: book.productId,
          cartId: cartId || '',
          quantity: book.quantity,
        }))
        setCartData(updatedCartData)
      } else {
        setCartData([])
      }
    }

    updateCartData()
  }, [cartItems, cartId])

  useEffect(() => {
    const handleLogout = async () => {
      if (cartItems.length > 0) {
        await saveCartToDatabase(cartData)
      }
    }

    if (!logout) {
      toast({
        title: 'Not yet saved to the database',
      })
    } else {
      handleLogout()
    }
  }, [logout, cartItems, cartData])

  const saveCartToDatabase = async (cartData: DataCart[]) => {
    try {
      await postCartApi(cartData)
      toast({
        title: 'Cart saved to the database',
      })
    } catch (error) {
      console.error('Error saving cart to the database:', error)
      toast({
        title: 'Error saving cart to the database',
        description: 'An error occurred while saving your cart. Please try again later.',
      })
    }
  }

  const addToCart = async (_id: string) => {
    const existingItem = cartItems.find((item) => item.productId === _id)

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.productId === _id
          ? {
              ...item,
              quantity: item.quantity + 1 > item.stock ? item.quantity : item.quantity + 1,
            }
          : item,
      )
      setCartItems(updatedCartItems)
    } else {
      // Hàm trung gian async để gọi getBookById
      const addBookToCart = async (bookId: string) => {
        const book = await getBookById(bookId)
        return book
      }

      const book: IBook = await addBookToCart(_id)
      console.log('book', book)
      if (book && book.stock > 0) {
        setCartItems([...cartItems, { productId: _id, quantity: 1, stock: book.stock }])
      }
    }
  }

  // const addToCart = (_id: string) => {
  //   const existingItem = cartItems.find((item) => item.productId === _id)

  //   if (existingItem) {
  //     const updatedCartItems = cartItems.map((item) =>
  //       item.productId === _id ? { ...item, quantity: item.quantity + 1 } : item,
  //     )
  //     setCartItems(updatedCartItems)
  //   } else {
  //     setCartItems([...cartItems, { productId: _id, quantity: 1 }])
  //   }
  // }

  const decreaseToCart = (_id: string) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === _id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item,
    )
    setCartItems(updatedCartItems)
  }

  const removeFromCart = (_id: string) => {
    const updatedCartItems = cartItems.filter((item) => item.productId !== _id)
    setCartItems(updatedCartItems)
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
