import React from 'react'

interface LandingLayoutProps {
  children?: React.ReactNode
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return <main>{children}</main>
}

export default LandingLayout
