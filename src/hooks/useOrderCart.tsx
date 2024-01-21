// // useOrderCart.ts
// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { ICart } from 'src/types'
// import { authAxiosClient } from 'src/lib/axios'

// const useOrderCart = () => {
//   const [products, setProducts] = useState<ICart[]>([])
//   const [cart, setCart] = useState<ICart[]>([])

//   useEffect(() => {
//     // Fetch products from your API endpoint
//     authAxiosClient
//       .get('/products')
//       .then((response) => setProducts(response.data))
//       .catch((error) => console.error('Error fetching products:', error))

//     // Fetch cart from cookie when component mounts
//     // const savedCart = JSON.parse(document.cookie)
//     // if (savedCart && Array.isArray(savedCart)) {
//     //   setCart(savedCart)
//     // }
//   }, [])

//   const addToCart = (productId: string) => {
//     // Fetch product details from your API endpoint
//     authAxiosClient
//       .get(`/products/${productId}`)
//       .then((response) => {
//         const product = response.data
//         const existingItem = cart.find((item) => item.bookId === product.id)

//         if (existingItem) {
//           existingItem.quantity += 1
//           setCart([...cart])
//         } else {
//           const newItem: ICart = { bookId: productId, quantity: 1 }
//           const updatedCart: ICart[] = [...cart, newItem]
//           setCart(updatedCart)

//           // Set the updated cart data as a cookie
//           // document.cookie = `cart=${JSON.stringify(updatedCart)}; path=/`

//           // Send the updated cart data to the server
//           // saveCartToDatabase(updatedCart)
//         }
//       })
//       .catch((error) => console.error('Error fetching product details:', error))
//   }

//   // const saveCartToDatabase = (cartData: ICart[]) => {
//   //   // Send the cart data to the server
//   //   axios
//   //     .post('/api/add-products-to-cart', cartData)
//   //     .then((response) => console.log('Cart saved to database:', response.data))
//   //     .catch((error) => console.error('Error saving cart to database:', error))
//   // }

//   return {
//     products,
//     cart,
//     addToCart,
//   }
// }

// export default useOrderCart// useOrderCart.js

import React, { createContext, useContext, useState, useEffect } from 'react'
import { ICart } from 'src/types'

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

  useEffect(() => {
    const storedCartItems = document.cookie.split('; ').find((row) => row.startsWith('cartItems='))

    if (storedCartItems) {
      try {
        const cartItemsArray = JSON.parse(storedCartItems.split('=')[1] || '[]')
        setCartItems(cartItemsArray)
      } catch (error) {
        // Handle parsing error if needed
      }
    }
  }, [])

  useEffect(() => {
    document.cookie = `cartItems=${JSON.stringify(cartItems)}; path=/`
  }, [cartItems])

  const addToCart = (_id: string) => {
    const existingItem = cartItems.find((item) => item.bookId === _id)

    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.bookId === _id ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      setCartItems((prevItems) => [...prevItems, { bookId: _id, quantity: 1, _id: new Date().toISOString() }])
    }
  }

  const decreaseToCart = (_id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.bookId === _id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    )
  }

  const removeFromCart = (_id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.bookId !== _id))
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
