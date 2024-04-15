import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
// import { useOrderCart } from '@/hooks/useOrderCart'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { ShoppingCartIcon } from 'lucide-react'
import { useOrderCart } from 'src/hooks/useOrderCart'
import { IBook } from 'src/types/books'
import { getBookById } from 'src/api/books/get-book'

function AddToCart() {
  const [open, setOpen] = useState(false)
  const maxOrdersToShow = 5

  const navigate = useNavigate()
  const { cartItems } = useOrderCart()
  const [bookData, setBookData] = useState<IBook[]>([])
  const [totalQuantity, setTotalQuantity] = useState(0)

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const promises = cartItems.map((cart) => getBookById(cart.productId as string))
      Promise.all(promises)
        .then((bookDataArray) => {
          setBookData(bookDataArray)
          const quantitySum = cartItems.reduce((total, cart) => total + cart.quantity, 0)
          setTotalQuantity(quantitySum)
        })
        .catch((error) => {
          console.error('Error fetching book data:', error)
        })
    } else {
      setTotalQuantity(0)
    }
  }, [cartItems])

  const onViewCart = () => {
    navigate('/view-cart')
  }

  return (
    <div className="relative z-40">
      <HoverCard>
        <HoverCardTrigger>
          <Button variant={'outline'} onClick={() => setOpen(!open)} className="px-2">
            <span className="sr-only">New orders added</span>
            <ShoppingCartIcon />
            {totalQuantity > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">
                {totalQuantity}
              </span>
            )}
          </Button>
        </HoverCardTrigger>

        <HoverCardContent>
          <div className="flex h-full w-full flex-col py-2 ">
            <div className="px-4 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">New orders added</h2>
            </div>
            <div className="mt-6 px-4 sm:px-6">
              <ul className="space-y-4">
                {cartItems && bookData && bookData.length > 0 ? (
                  cartItems.slice(0, maxOrdersToShow).map((cart, index) => {
                    const book = bookData[index]
                    return (
                      <li key={cart.productId} className="flex flex-row items-center space-x-4 py-2">
                        <div>
                          <p className="text-sm text-gray-500">
                            <span className="font-semibold text-gray-900">{book?.name || 'Book Name Not Found'}</span>
                            <p className="text-sm text-gray-500">
                              x <span className="font-semibold text-gray-900">{cart.quantity}</span>
                            </p>
                          </p>
                        </div>
                        {/* <div>
                          <p className="text-sm text-gray-500">
                            <span className="font-semibold text-gray-900">{formatPrice(book.price)}</span>
                          </p>
                        </div> */}
                      </li>
                    )
                  })
                ) : (
                  <p>No items in the cart</p>
                )}

                <li className="flex flex-row items-center space-x-4 py-2">
                  {cartItems && cartItems.length > maxOrdersToShow ? (
                    <div className="flex-1">
                      <p className="text-xs text-slate-500"> {cartItems.length - maxOrdersToShow} order(s) more</p>
                    </div>
                  ) : null}
                  <div className="flex-shrink-0">
                    <Button size={'sm'} className={'mx-4 px-2'} variant={'secondary'} onClick={onViewCart}>
                      View Cart
                    </Button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

export default AddToCart
