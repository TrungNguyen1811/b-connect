import { Active } from 'src/components/landing-blog/active'
import { Menu } from 'src/components/landing-blog/menu'

export function LandingBlog() {
  return (
    <div className="mx-32 px-4 py-2">
      <div className="grid grid-cols-12 gap-4 pt-2">
        <div className="col-span-2 bg-gray-200">
          <Menu />
        </div>
        <div className="col-span-7 bg-gray-300">Col 2</div>
        <div className="col-span-3 bg-gray-200">
          <Active />
        </div>
      </div>
    </div>
  )
}
