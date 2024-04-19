import { Outlet } from 'react-router-dom'
import { HeaderBlog } from 'src/components/header/header-blog'
import MetaData from 'src/components/metadata'
import TailwindIndicator from 'src/components/tailwind-indicator'

export default function BlogLayout() {
  return (
    <div className="h-min-screen bg-orange-50 font-sans antialiased">
      <MetaData title="Blog" />
      <HeaderBlog />
      <Outlet />
      <TailwindIndicator />
    </div>
  )
}
