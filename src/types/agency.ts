export interface IAgency {
  agencyId?: string
  ownerId?: string
  agencyName?: string
  logoImg: File | string
  postAddress?: string
  addressId?: string
  businessType?: 'Individual' | 'Company'
}

export interface IAgencyAnalyst {
  agencyId?: string
  agencyName?: string
  TotalQuantityOfBookInInventory: number
  TotalBookSold?: number
  TotalRevenue?: number
  revenueByMonths?: { [month: string]: number }
  thisMonthRevenue: number
  percentThisMonthToAvg: number
  avgRevenue: number
  highestMonthRevenue: number
  percentThisMonthToHighest: number
  revenueByType: {
    Old: {
      revenue: number
      percentage: number
    }
    New: {
      revenue: number
      percentage: number
    }
    Total: {
      revenue: number
      percentage: number
    }
  }
  revenueByCategory: {
    [category: string]: {
      revenue: number
      percentage: number
    }
  }
  numberOfBookANdUnitSoldByMonth: {
    [date: string]: {
      numberOfBookSold: number
      numberOfUnitSold: number
    }
  }
}
export interface ITotalRevenue {
  startDate: Date
  endDate?: Date
}

export interface IRevenueByTime {
  [month: string]: number
}
