import { cn } from 'src/lib/utils'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from 'src/hooks/useAuth'
import { useOrderCart } from 'src/hooks/useOrderCart'
import MetaData from 'src/components/metadata'
import { Button } from 'src/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import { IBreadcrumb } from 'src/components/breadcrumb'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import CartPage from 'src/components/cart/cart-page'

type Props = React.HTMLAttributes<HTMLDivElement>

function ViewCart({ className, ...props }: Props) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { cartItems } = useOrderCart()

  const { pathname } = useLocation()

  const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
    const paths = pathname.split('/')
    const cart = paths[1]
    return [
      {
        label: 'Home',
        key: 'home',
        href: '/',
        icon: 'home',
      },
      {
        key: 'cart',
        label: 'Shopping Cart',
        href: `/view-cart`,
      },
    ]
  }, [pathname])
  return (
    <div className={cn(className, 'mx-auto my-auto min-h-[600px] bg-orange-100')} {...props}>
      <MetaData title="Cart" />
      {<Breadcrumb items={breadcrumb} className="mx-auto max-w-7xl py-4" />}

      <div className="mx-auto max-w-screen-xl bg-orange-50 p-8">
        <div className="flex justify-center">
          <h2 className="mb-4 content-center text-3xl font-semibold">Shopping Cart</h2>
        </div>
        {cartItems && cartItems.length === 0 ? (
          <div className="cart-empty flex flex-col items-center">
            <p className="text-gray-600">WHOOPS ;V</p>
            <img
              src={'https://cdn-icons-png.flaticon.com/512/6533/6533800.png'}
              alt={'cart-empty'}
              className="aspect-[1] object-contain transition-all duration-300"
              style={{ width: '18%' }}
            />{' '}
            <p className="m-8 text-3xl font-semibold text-gray-600">Your cart is currently empty!!!</p>
            <p className="opacity-50">Behire proceed to checkout you must add some products to your shopping cart.</p>
            <p className="opacity-50"> You will find a lot of interesting products on our Shop page.</p>
            <div className="start-shopping mt-4">
              <Link className="flex items-center text-blue-500" to="/">
                <ArrowLeftIcon />
                <span>Start Buying</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* <CartForm /> */}
            <CartPage />
            <div className="cart-summary mt-8">
              <div className="cart-checkout">
                <div className="flex justify-between">
                  <div className="continue-shopping mt-4">
                    <Link className="flex items-center text-blue-500" to="/books">
                      <ArrowLeftIcon />
                      <span>Continue Buying</span>
                    </Link>
                  </div>
                  {user ? null : (
                    <Button
                      className="cart-login mt-4 inline-block rounded-md bg-blue-500 px-4 py-2 text-white"
                      onClick={() => navigate('/login')}
                    >
                      Login to Check out
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewCart
