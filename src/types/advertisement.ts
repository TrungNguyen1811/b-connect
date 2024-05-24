export interface ITopBanner {
  bannerDir: string
  productId: string
  agencyId: string
  adId: string
  bannerTitle: string
  price: number
  isDisplaySelected: boolean
}
export interface IRelevantBooks {
  bookId: string
  imageDir: string
  title: string
  price: number
  rating: number
}

export interface ICheckoutAds {
  transactionId: string
  campaignType: number
  duration: string
  numberOfTargetUser?: number
  ppc_Price?: number
  bookId?: string | null
  displayBid?: number | null
  agencyId?: string
  bannerTitle?: string
  bannerImg?: File | string
}

export enum Duration {
  WEEK = 'Week',
  MONTH = 'Month',
  YEAR = 'Year',
}

export interface ICheckList {
  id?: string
  tradeDetailsId: string
  target: string
  bookOwnerUploadDir?: File | string
  middleUploadDir?: File | string
}

export interface IResponseAds {
  adId: string
  campaignType: number
  bannerTitle: string
  bannerDir: string
  bannerFee: number
  targetUserFee: number
  ppC_Price: number
  duration: string
  subFee: number
  lastUpdate: string
  startDate: string
  endDate: string
  isDisplaySelected: boolean
  agencyId: string
  bookId: string
  transactionId: string
  transaction: string
}
