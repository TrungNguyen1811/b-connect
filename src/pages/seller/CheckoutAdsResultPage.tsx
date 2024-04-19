import { useQuery } from '@tanstack/react-query'
import { LoaderIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { postRegisterBannerAds, postRegisterRelevantAds } from 'src/api/advertisement/post-checkout-ads'
import { getTransaction } from 'src/api/order/get-order'
import { SaveTransaction } from 'src/api/order/post-transaction'
import { useAuth } from 'src/hooks/useAuth'
import { ICheckoutAds } from 'src/types/advertisement'
import { ITransaction } from 'src/types/order'
import ErrorPage from '../error-page'
import CheckoutFailed from 'src/components/cart/failed'
import CheckoutSuccess from 'src/components/cart/success'

function CheckoutAdsResultPage() {
  const [searchParams] = useSearchParams()
  const refId = searchParams.get('refId')
  const [transaction, setTransaction] = useState<ITransaction>()
  const [adsData, setAdsData] = useState<ICheckoutAds>()
  const [isLoadingTransaction, setIsLoadingTransaction] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const mergedDataString = localStorage.getItem('checkoutAdsData')
    console.log('mergedDataString', mergedDataString)
    if (mergedDataString) {
      try {
        const mergedData = JSON.parse(mergedDataString)
        setAdsData(mergedData)
        console.log('mergedData', mergedData)
        localStorage.removeItem('checkoutAdsData')
      } catch (error) {
        console.error('Error parsing JSON:', error)
      }
    } else {
      console.log('No checkoutAdsData found in localStorage')
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
        setIsLoadingTransaction(false)
      }
    }

    fetchTransaction()
  }, [refId])

  const mergedData: ICheckoutAds = useMemo(() => {
    return {
      agencyId: adsData?.agencyId as string,
      campaignType: adsData?.campaignType as number,
      duration: adsData?.duration as string,
      bookId: adsData?.bookId,
      bannerImg: adsData?.bannerImg || '',
      displayBid: adsData?.displayBid || 0,
      transactionId: adsData?.transactionId as string,
      bannerTitle: adsData?.bannerTitle || '',
      numberOfTargetUser: adsData?.numberOfTargetUser,
      ppc_Price: adsData?.ppc_Price,
    }
  }, [adsData])

  const { isLoading: isLoadingOrder, data } = useQuery<any>(
    ['postRegister', mergedData.transactionId],
    () => (adsData?.campaignType === 1 ? postRegisterRelevantAds(mergedData) : postRegisterBannerAds(mergedData)),
    {
      retry: false,
      enabled: !isLoadingTransaction,
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
      if (data && data === 200) {
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
export default CheckoutAdsResultPage
