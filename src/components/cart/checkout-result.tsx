import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LoaderIcon } from 'lucide-react'
import { getTransaction } from 'src/api/order/get-order'
import { createOrder } from 'src/api/order/post-order'
import CheckoutSuccess from './success'
import CheckoutFailed from './failed'
import { useSearchParams } from 'react-router-dom'
import { IOrder, IPaymentReturnDTO } from 'src/types'

function CheckoutResult() {
  const [searchParams] = useSearchParams()
  const refId = searchParams.get('refId')
  const [transaction, setTransaction] = useState<IPaymentReturnDTO>()
  const [dataOrder, setDataOrder] = useState<IOrder>()

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
        const transactionDetail = await getTransaction(refId as string)
        setTransaction(transactionDetail)
      } catch (error) {
        console.error('Error fetching transaction:', error)
      }
    }

    if (refId) {
      // Ensure refId is present before fetching transaction
      fetchTransaction()
    }
  }, [refId])

  const mergedData: IOrder = useMemo(() => {
    return {
      customerId: dataOrder?.customerId,
      products: dataOrder?.products,
      paymentMethod: dataOrder?.paymentMethod,
      addressId: dataOrder?.addressId,
      paymentReturnDTO: transaction,
    }
  }, [transaction, dataOrder])
  console.log('mergedData', mergedData)

  const { isLoading, data } = useQuery(['postTrans', transaction?.paymentId], () => createOrder(mergedData), {
    retry: false,
  })

  const success = useMemo(() => {
    if (isLoading) {
      return (
        <div className="text-center">
          <LoaderIcon className="mx-auto h-10 w-10 animate-spin text-primary" />
          <h1>Saving data... Please wait</h1>
        </div>
      )
    } else {
      if (data) {
        return <CheckoutSuccess />
      }
      return <h1 className="text-center">Something went wrong while saving data</h1>
    }
  }, [isLoading, data])

  if (transaction?.paymentStatus === '00') {
    return success
  } else {
    return <CheckoutFailed />
  }
}

export default CheckoutResult
