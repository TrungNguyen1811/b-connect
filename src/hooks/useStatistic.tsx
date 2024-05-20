import { faker } from '@faker-js/faker'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { axiosClient } from 'src/lib/axios'

interface IStatistic {
  statId: string
  postId?: string
  bookId?: string
  view?: number
  interested?: number
  purchase?: number
  hearts?: number
}

interface StatisticContextType {
  postData: IStatistic[]
  updateStatPost: (postId: string, newData: Partial<IStatistic>) => void
  updateStatBook: (bookId: string, newData: Partial<IStatistic>) => void
}

const StatisticContext = createContext<StatisticContextType | undefined>(undefined)

export const useStatisticContext = () => {
  const context = useContext(StatisticContext)
  if (!context) {
    throw new Error('useStatisticContext must be used within a StatisticProvider')
  }
  return context
}

const generateStatId = () => {
  return faker.string.uuid()
}

export const StatisticProvider = ({ children }: { children: ReactNode }) => {
  const initialPostData = JSON.parse(localStorage.getItem('post_data') as string) || []
  const [postData, setPostData] = useState<IStatistic[]>(initialPostData)

  const updateStatPost = (postId: string, newData: Partial<IStatistic>) => {
    let updatedPostData = postData.map((stat) => {
      if (stat.postId === postId) {
        const updatedStat = { ...stat, ...newData }
        return updatedStat
      }
      return stat
    })

    if (!updatedPostData.some((stat) => stat.postId === postId)) {
      const newStat: IStatistic = {
        statId: generateStatId(),
        postId,
        ...newData,
      }
      updatedPostData = [...updatedPostData, newStat]
    }

    setPostData(updatedPostData)
    localStorage.setItem('post_data', JSON.stringify(updatedPostData))
  }

  const updateStatBook = (bookId: string, newData: Partial<IStatistic>) => {
    let updatedPostData = postData.map((stat) => {
      if (stat.bookId === bookId) {
        const updatedStat = { ...stat, ...newData }
        return updatedStat
      }
      return stat
    })

    if (!updatedPostData.some((stat) => stat.bookId === bookId)) {
      const newStat: IStatistic = {
        statId: generateStatId(),
        bookId,
        ...newData,
      }
      updatedPostData = [...updatedPostData, newStat]
    }

    setPostData(updatedPostData)
    localStorage.setItem('post_data', JSON.stringify(updatedPostData))
  }

  const sendDataToServer = () => {
    const dataToSend = JSON.parse(localStorage.getItem('post_data') as string)
    if (dataToSend) {
      console.log('save:', dataToSend)
      axiosClient
        .post('/statistic/add-stats', dataToSend)
        .then((response) => {
          console.log('Data sent to server:', response.data)
          localStorage.removeItem('post_data')
          setPostData([])
        })
        .catch((error) => {
          console.error('Error sending data to server:', error)
        })
    }
    console.log('remove:', dataToSend)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      sendDataToServer()
    }, 300000) // 5 minutes
    return () => clearInterval(interval)
  }, [])

  const contextValue = {
    postData,
    updateStatPost,
    updateStatBook,
  }

  return <StatisticContext.Provider value={contextValue}>{children}</StatisticContext.Provider>
}
