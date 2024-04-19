import React from 'react'
import Footer from '../../components/footer'
import Header from 'src/components/header/header'

export const getNoneLayout = (page: React.ReactElement) => page

export const getDefaultLayout = (page: React.ReactElement) => {
  return (
    <div className="h-min-screen">
      <Header />
      {page}
      <Footer />
    </div>
  )
}
