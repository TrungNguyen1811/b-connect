export interface IResponseInteresterList {
  recordId: string
  userId: string
  username: string
  avatarDir: string
  createDate: Date
  videoDir: string
  isChosen: boolean
}

export interface ITradeInterested {
  postId: string
  video: File
}
export interface IResponseTraderList {
  ownerId: string
  interesterId: string
}

export enum ITradeStatus {
  Unsubmitted = 0,
  Submitted = 1,
  OnDeliveryToMiddle = 2,
  MiddleReceived = 3,
  WaitFoeCheckListConfirm = 4,
  Cancel = 5,
  OnDeliveryToTrader = 6,
  Successful = 7,
}
