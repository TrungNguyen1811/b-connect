import { Outlet } from 'react-router-dom'
import { HeaderBlog } from 'src/components/header/header-blog'
import MetaData from 'src/components/metadata'
import TailwindIndicator from 'src/components/tailwind-indicator'

export function BlogLayout() {
  return (
    <div className="min-h-screen bg-gray-200 font-sans antialiased">
      <MetaData title="Blog" />
      <HeaderBlog />
      <Outlet />
      <TailwindIndicator />
    </div>
  )
}
