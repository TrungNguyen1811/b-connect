import React, { createContext, useContext, useState, useEffect } from 'react'
import { IBook, ICart } from 'src/types'
import { useAuth } from './useAuth'
import { getCartIdApi } from 'src/api/cart/get-cart-id'
import { postCartApi } from 'src/api/cart/post-cart'
import { toast } from 'src/components/ui/use-toast'
import { getCartApi } from 'src/api/cart/get-cart'
import { getBookById } from 'src/api/books/get-book'

export interface ContextType {
  cartItems: ICart[]
  addToCart: (_id: string) => void
  addMultiToCart: (_ids: string[]) => Promise<void>
  decreaseToCart: (_id: string) => void
  removeFromCart: (_id: string) => void
  clearCart: () => void
  resetCartItems: (cart: ICart[]) => void
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
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 7)
  const expires = expirationDate.toUTCString()

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartDataFromServer = await getCartApi(userId)
        setCartItems(cartDataFromServer)
        document.cookie = `cartItems_${userId}=${JSON.stringify(cartDataFromServer)}; expires=${expires}; path=/`
      } catch (error) {
        console.error('Error fetching cart data from server:', error)
      }
    }

    if (userId) {
      fetchCartData()
    }
  }, [])

  useEffect(() => {
    const storedCartItems = document.cookie.split('; ').find((row) => row.startsWith(`cartItems_${userId}=`))

    if (storedCartItems) {
      try {
        const cartItemsArray = JSON.parse(storedCartItems.split('=')[1] || '[]')
        setCartItems(cartItemsArray)
      } catch (error) {
        // Xử lý lỗi nếu cần
      }
    }
  }, [userId])

  useEffect(() => {
    const fetchCartId = async () => {
      try {
        const fetchedCartId = await getCartIdApi(userId)
        setCartId(fetchedCartId)
      } catch (error) {
        console.error('Error retrieving cartId:', error)
      }
    }

    if (userId) {
      fetchCartId()
    }
  }, [userId])

  useEffect(() => {
    document.cookie = `cartItems_${userId}=${JSON.stringify(cartItems)}; expires=${expires}; path=/`
  }, [cartItems, userId, expires])

  useEffect(() => {
    const updateCartData = () => {
      if (cartItems && cartItems.length > 0) {
        const updatedCartData = cartItems.map((book) => ({
          productId: book.productId as string,
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
  }, [logout])

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

  const saveCartToCookie = (cartItems: ICart[]) => {
    document.cookie = `cartItems_${userId}=${JSON.stringify(cartItems)}; expires=${expires}; path=/`
  }

  const addToCart = async (_id: string) => {
    try {
      const book: IBook = await getBookById(_id)

      if (book && book.stock > 0) {
        const existingItem = cartItems.find((item) => item.productId === _id)

        if (existingItem) {
          const updatedCartItems = cartItems.map((item) =>
            item.productId === _id
              ? {
                  ...item,
                  quantity: item.quantity + 1 > book.stock ? book.stock : item.quantity + 1,
                  stock: book.stock,
                }
              : item,
          )
          setCartItems(updatedCartItems)
          saveCartToCookie(cartItems)
        } else {
          setCartItems([...cartItems, { productId: _id, quantity: 1, stock: book.stock }])
          saveCartToCookie(cartItems)
        }
      } else {
        console.log('Book not found or out of stock')
      }
    } catch (error) {
      console.error('Error fetching book details:', error)
    }
  }
  const addMultiToCart = async (_ids: string[]) => {
    try {
      const newCartItems = [...cartItems]

      for (const id of _ids) {
        const book: IBook = await getBookById(id)
        if (book && book.stock > 0) {
          const existingItem = newCartItems.find((item) => item.productId === id)

          if (existingItem) {
            existingItem.quantity = existingItem.quantity + 1 > book.stock ? book.stock : existingItem.quantity + 1
            existingItem.stock = book.stock
          } else {
            newCartItems.push({ productId: id, quantity: 1, stock: book.stock })
          }
        } else {
          console.log('Book not found or out of stock')
        }
      }

      setCartItems(newCartItems)
      saveCartToCookie(newCartItems)

      toast({
        type: 'foreground',
        title: 'Add to cart successfully',
        description: 'Your cart has been updated',
      })
    } catch (error) {
      console.error('Error adding multiple books to cart:', error)
      toast({
        type: 'foreground',
        title: 'Error',
        description: 'An error occurred while adding books to the cart.',
      })
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
    saveCartToCookie(cartItems)
  }

  const removeFromCart = (_id: string) => {
    const updatedCartItems = cartItems.filter((item) => item.productId !== _id)
    setCartItems(updatedCartItems)
    saveCartToCookie(cartItems)
  }

  const clearCart = () => {
    setCartItems([])
    saveCartToCookie(cartItems)
  }

  const resetCartItems = (newCartItems: ICart[]) => {
    setCartItems(newCartItems)
  }

  const contextValue = {
    cartItems,
    addToCart,
    addMultiToCart,
    decreaseToCart,
    removeFromCart,
    clearCart,
    resetCartItems,
  }

  return <OrderCartContext.Provider value={contextValue}>{children}</OrderCartContext.Provider>
}
