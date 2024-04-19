export interface IResponseInteresterList {
  recordId: string
  userId: string
  username: string
  avatarDir: string
  createDate: Date
  isChosen: boolean
}

export interface IResponseTraderList {
  ownerId: string
  interesterId: string
}

export enum ITradeStatus {
  Unsubmitted = 0,
  Submitted = 1,
  OnDelivery = 2,
  Successful = 3,
  Cancel = 4,
}
