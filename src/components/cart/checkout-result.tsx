import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LoaderIcon } from 'lucide-react'
import { getTransaction } from 'src/api/order/get-order'
import { createOrder } from 'src/api/order/post-order'
import CheckoutSuccess from './success'
import CheckoutFailed from './failed'
import { useSearchParams } from 'react-router-dom'
import { ICart, IOrder, IPaymentReturnDTO, ITransaction } from 'src/types'
import { SaveTransaction } from 'src/api/order/post-transaction'
import { useAuth } from 'src/hooks/useAuth'
import { getCartApi } from 'src/api/cart/get-cart'
import ErrorPage from 'src/pages/error-page'

function CheckoutResult() {
  const [searchParams] = useSearchParams()
  const refId = searchParams.get('refId')
  const [transaction, setTransaction] = useState<ITransaction>()
  const [dataOrder, setDataOrder] = useState<IOrder>()
  const [isLoadingTransaction, setIsLoadingTransaction] = useState(true) // Biến trạng thái để kiểm tra xem giao dịch đã tải xong chưa
  const [cartItems, setCartItems] = useState<ICart[]>([])
  const { user } = useAuth()

  const token = localStorage.getItem('token') as string
  console.log('token', token)
  // useEffect(() => {
  //   const resetUser = async () => {
  //     await getUserProfileApi((err, user) => {
  //       if (err) {
  //         return err.message
  //       } else {
  //         if (!user) {
  //           return
  //         }
  //         const token = localStorage.getItem('token') as string
  //         console.log(token)
  //       }
  //     })
  //   }

  //   resetUser()
  // }, [refId])

  useEffect(() => {
    const mergedDataString = localStorage.getItem('mergedData')
    console.log('mergedDataString', mergedDataString)
    if (mergedDataString) {
      try {
        const mergedData = JSON.parse(mergedDataString)
        setDataOrder(mergedData)
        console.log('mergedData', mergedData)
        localStorage.removeItem('mergedData')
      } catch (error) {
        console.error('Error parsing JSON:', error)
      }
    } else {
      console.log('No mergedDataString found in localStorage')
    }
  }, [])

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        if (refId) {
          const transactionDetail = await getTransaction(refId)
          setTransaction(transactionDetail)
          const saveTransaction = async () => {
            await SaveTransaction(refId)
          }
          saveTransaction()
        }
      } catch (error) {
        console.error('Error fetching transaction:', error)
      } finally {
        setIsLoadingTransaction(false) // Đánh dấu rằng giao dịch đã được tải xong
      }
    }

    fetchTransaction()
  }, [refId])

  const paymentData: IPaymentReturnDTO = useMemo(() => {
    return {
      paymentStatus: transaction?.paymentStatus || '',
      paymentMessage: transaction?.paymentMessage || '',
      paymentDate: transaction?.paymentDate || '',
      paymentRefId: transaction?.transactionId || '',
      amount: transaction?.amount || 0,
      signature: transaction?.signature || '',
    }
  }, [transaction])

  const mergedData: IOrder = useMemo(() => {
    return {
      customerId: dataOrder?.customerId,
      products: dataOrder?.products,
      paymentMethod: dataOrder?.paymentMethod,
      addressId: dataOrder?.addressId,
      paymentReturnDTO: paymentData,
    }
  }, [dataOrder, paymentData])

  const { isLoading: isLoadingOrder, data } = useQuery(
    ['postTrans', paymentData.paymentRefId],
    () => createOrder(mergedData),
    {
      retry: false,
      enabled: !isLoadingTransaction, // Sử dụng biến trạng thái để kiểm tra xem giao dịch đã tải xong chưa
    },
  )

  const success = useMemo(() => {
    if (isLoadingOrder) {
      return (
        <div className="text-center">
          <LoaderIcon className="mx-auto h-10 w-10 animate-spin text-primary" />
          <h1>Saving data... Please wait</h1>
        </div>
      )
    } else {
      if (data === 200) {
        if (user) {
          const fetchCartData = async () => {
            try {
              const cartDataFromServer = await getCartApi(user.userId as string)
              setCartItems(cartDataFromServer)
              document.cookie = `cartItems_${user.userId}=${JSON.stringify(cartItems)}; path=/`
            } catch (error) {
              console.error('Error fetching cart data from server:', error)
            }
          }

          if (user) {
            fetchCartData()
          }
        }
        return <CheckoutSuccess />
      } else {
        return <ErrorPage />
      }
    }
  }, [isLoadingOrder, data])

  if (!isLoadingTransaction && transaction?.paymentStatus === '00') {
    return success
  } else {
    return <CheckoutFailed />
  }
}

export default CheckoutResult
