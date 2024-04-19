import { useEffect, useMemo, useState } from 'react'
import { Bar, Pie, Chart } from 'react-chartjs-2'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card'
import { ScrollArea } from 'src/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs'
import { cn, formatPrice } from 'src/lib/utils'
import { IAgencyAnalyst, IRevenueByTime } from 'src/types/agency'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  ArcElement,
} from 'chart.js'
import { getAgencyAnalyst } from 'src/api/agency/get-agency'
import { Popover, PopoverTrigger, PopoverContent } from 'src/components/ui/popover'
import { Button } from 'src/components/ui/button'
import { Calendar } from 'src/components/ui/calendar'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { CalendarIcon } from 'lucide-react'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ArcElement,
  LineController,
  BarController,
)
interface Value {
  value: number
  label: string
}
interface IRevenueByCategory {
  value: {
    revenue: number
    percentage: number
  }
  label: string
}

interface INumberOfBookANdUnitSoldByMonth {
  value: {
    numberOfBookSold: number
    numberOfUnitSold: number
  }
  label: string
}

export default function DashboardSellerPage() {
  const [agencyAnalyst, setAgencyAnalyst] = useState<IAgencyAnalyst>()

  useEffect(() => {
    const fetchData = async () => {
      const data = (await getAgencyAnalyst()) as IAgencyAnalyst
      setAgencyAnalyst(data)
    }
    fetchData()
  }, [])

  // revenueByMonths
  const revenueByMonths = useMemo(() => {
    if (!agencyAnalyst?.revenueByMonths) return []
    else {
      return Object.entries(agencyAnalyst.revenueByMonths).map<Value>(([month, revenue]) => ({
        label: month,
        value: revenue,
      }))
    }
  }, [agencyAnalyst?.revenueByMonths])
  const dataRevenueByMonths = {
    labels: revenueByMonths.map((d) => d.value),
    datasets: [
      {
        label: 'month',
        data: revenueByMonths.map((d) => d.value),
        backgroundColor: 'orange',
        borderColor: 'orange',
        borderWidth: 1,
      },
    ],
  }
  const optionRevenueByMonths = {}

  // type
  const pie = {
    labels: ['Old', 'New'],
    datasets: [
      {
        label: 'Revenue',
        data: [agencyAnalyst?.revenueByType.Old.revenue, agencyAnalyst?.revenueByType.New.revenue],
        backgroundColor: ['#fbd24e', '#d87607'],
        hoverOffset: 4,
      },
    ],
  }
  const pieOptions = {}

  // revenueByCategory
  const revenueByCategory = useMemo(() => {
    if (!agencyAnalyst?.revenueByCategory) return []
    else {
      return Object.entries(agencyAnalyst?.revenueByCategory).map<IRevenueByCategory>(([category, result]) => ({
        label: category,
        value: {
          revenue: result.revenue,
          percentage: result.percentage,
        },
      }))
    }
  }, [agencyAnalyst?.revenueByCategory])
  const dataRevenueByCategory = {
    labels: revenueByCategory.map((dt) => dt.label),
    datasets: [
      {
        label: 'percentage',
        data: revenueByCategory.map((dt) => dt.value.percentage),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        order: 1,
        type: 'line' as const,
        yAxisID: 'percentage',
      },
      {
        label: 'revenue',
        data: revenueByCategory.map((dt) => dt.value.revenue),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        order: 2,
        type: 'bar' as const,
        yAxisID: 'revenue',
      },
    ],
  }
  const revenueByCategoryOptions = {
    scales: {
      y: {
        grid: {
          drawOnChartArea: false,
        },
        beginAtZero: true,
        display: false,
      },
      percentage: {
        display: false,
        max: 100,
      },
    },
  }

  //numberOfBookANdUnitSoldByMonth
  const numberOfBookANdUnitSoldByMonth = useMemo(() => {
    if (!agencyAnalyst?.numberOfBookANdUnitSoldByMonth) return []
    else {
      return Object.entries(agencyAnalyst?.numberOfBookANdUnitSoldByMonth).map<INumberOfBookANdUnitSoldByMonth>(
        ([date, result]) => ({
          label: date,
          value: {
            numberOfBookSold: result.numberOfBookSold,
            numberOfUnitSold: result.numberOfUnitSold,
          },
        }),
      )
    }
  }, [agencyAnalyst?.numberOfBookANdUnitSoldByMonth])
  const dataNumberOfBookANdUnitSoldByMonth = {
    labels: numberOfBookANdUnitSoldByMonth.map((dt) => dt.label),
    datasets: [
      {
        label: 'Book Sold',
        data: numberOfBookANdUnitSoldByMonth.map((dt) => dt.value.numberOfBookSold),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        order: 1,
        type: 'line' as const,
      },
      {
        label: 'Unit Sold',
        data: numberOfBookANdUnitSoldByMonth.map((dt) => dt.value.numberOfUnitSold),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        order: 2,
        type: 'line' as const,
      },
    ],
  }
  const numberOfBookANdUnitSoldByMonthOptions = {}

  //Date
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  })
  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')

  useEffect(() => {
    if (date && date.from && date.to) {
      const from = format(date.from, 'yyyy-MM-dd')
      const to = format(date.to, 'yyyy-MM-dd')
      setDateFrom(from)
      setDateTo(to)
    }
  }, [date?.from, date?.to])
  const [revenueByTime, setRevenueByTime] = useState<IRevenueByTime[]>()
  console.log('revenueByTime', revenueByTime)

  // useEffect(() => {
  //   const getData = async () => {
  //     console.log('Fetching data for date range:', dateFrom, 'to', dateTo)
  //     try {
  //       const filter = await getAgencyRevenueByTime(dateFrom, dateTo)
  //       setRevenueByTime(filter)
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     }
  //   }
  //   getData()
  // }, [date.from, date.to])

  // const convertRevenueByTime = useMemo(() => {
  //   if (!revenueByTime) return []
  //   else {
  //     return Object.entries(revenueByTime).map<Value>(([month, revenue]) => ({
  //       label: month,
  //       value: revenue,
  //     }))
  //   }
  // }, [revenueByTime])
  // const dataRevenueByTime = {
  //   labels: convertRevenueByTime.map((d) => d.value),
  //   datasets: [
  //     {
  //       label: 'month',
  //       data: convertRevenueByTime.map((d) => d.value),
  //       backgroundColor: 'orange',
  //       borderColor: 'orange',
  //       borderWidth: 1,
  //     },
  //   ],
  // }
  // const optionRevenueBytime = {}
  // console.log('date', date)

  return (
    <ScrollArea className="h-full w-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
          <div className="hidden items-center space-x-2 md:flex">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(agencyAnalyst?.TotalRevenue)}</div>
                  <p className="text-xs text-muted-foreground">Average: {agencyAnalyst?.avgRevenue}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Book</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{agencyAnalyst?.TotalQuantityOfBookInInventory}</div>
                  <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{agencyAnalyst?.TotalBookSold}</div>
                  {/* <p className="text-xs text-muted-foreground">+19% from last month</p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{agencyAnalyst?.thisMonthRevenue}</div>
                  <p className="text-xs text-muted-foreground">
                    {agencyAnalyst?.percentThisMonthToAvg && agencyAnalyst?.percentThisMonthToAvg - 100} since average
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  {/* <Bar data={dataRevenueByTime} options={optionRevenueBytime}></Bar> */}
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Revenue by Type Book</CardTitle>
                  {/* <CardDescription>You made 265 sales this month.</CardDescription> */}
                </CardHeader>
                <CardContent>
                  <Pie data={pie} options={pieOptions} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Highest Month Revenue</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(agencyAnalyst?.percentThisMonthToHighest)}</div>
                  <p className="text-xs text-muted-foreground">{agencyAnalyst?.highestMonthRevenue}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Book</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{agencyAnalyst?.TotalQuantityOfBookInInventory}</div>
                  {/* <p className="text-xs text-muted-foreground">+180.1% from last month</p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{agencyAnalyst?.TotalBookSold}</div>
                  {/* <p className="text-xs text-muted-foreground">+19% from last month</p> */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{}</div>
                  <p className="text-xs text-muted-foreground">+201 since last hour</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Bar data={dataRevenueByMonths} options={optionRevenueByMonths}></Bar>
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Revenue by Category</CardTitle>
                  <CardDescription>You made 265 sales this month.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Chart type="bar" data={dataRevenueByCategory} options={revenueByCategoryOptions} />
                </CardContent>
              </Card>
            </div>
            <Card className="col-span-4 md:col-span-3">
              <CardHeader>
                <CardTitle>Number of Book by month</CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <Chart
                  type="line"
                  data={dataNumberOfBookANdUnitSoldByMonth}
                  options={numberOfBookANdUnitSoldByMonthOptions}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  )
}
