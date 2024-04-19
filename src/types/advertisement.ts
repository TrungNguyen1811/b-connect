export interface ITopBanner {
  bannerDir: string
  productId: string
  agencyId: string
  adId: string
  bannerTitle: string
  price: number
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
  bookId?: string
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
  tradeDetailsId?: string
  target?: string
  bookOwnerUploadDir: File
  middleUploadDir: File
}
