export interface IAgency {
  agencyId?: string
  ownerId?: string
  agencyName?: string
  GHTKTokenCode?: string
  logoImg: File | string
  postAddress?: string
  addressId?: string
  businessType?: 'Individual' | 'Company'
}

export interface IAgencyAnalyst {
  agencyId?: string
  agencyName?: string
  totalQuantityOfBookInInventory: number //
  totalBookSold?: number //
  totalUnitSold?: number //
  totalRevenue?: number //
  thisMonthRevenue?: number //
  thisDayRevenue?: number //
  avgMonthRevenue?: number //
  avgDayRevenue?: number //
  highestMonthRevenue?: number //
  highestDayRevenue?: number
  percentThisMonthToAvgMonth?: number //
  percentThisDayToAvgDay?: number //
  percentThisMonthToHighestMonth?: number //
  percentThisDayToHighestDay?: number //
  revenueByMonths?: { [month: string]: number } //
  revenueByDays?: { [day: string]: number }
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
  } //
  revenueByCategory: {
    [category: string]: {
      revenue: number
      percentage: number
    }
  } //
  numberOfBookANdUnitSoldByMonth: {
    [date: string]: {
      numberOfBookSold: number
      numberOfUnitSold: number
    }
  } //
  numberOfBookANdUnitSoldByDay: {
    [day: string]: {
      numberOfBookSold: number
      numberOfUnitSold: number
    } //
  }
}

export interface IAgencyAnalystByTime {
  agencyId?: string
  agencyName?: string
  revenue: number
  revenueByTimeInput?: { [time: string]: number } //
}

export interface ITotalRevenue {
  startDate: Date
  endDate?: Date
}

export interface IRevenueByTime {
  [month: string]: number
}

export interface IAgencyStat {
  productCount: number
  agencyAverageRate: number
  replyRate: number
}
