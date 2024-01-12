import { Link } from 'react-router-dom'

const SERVICE = [
  { id: 1, title: 'Help Centre', path: '/' },
  { id: 2, title: 'BConnect Mall', path: '/' },
  { id: 3, title: 'BConnect Blog', path: '/' },
  { id: 4, title: 'Shipping', path: '/' },
  { id: 5, title: 'Exchange', path: '/' },
  { id: 6, title: 'Return & Refund', path: '/' },
  { id: 7, title: 'Contact Us', path: '/' },
  { id: 8, title: 'Warranty Policy', path: '/' },
]

const ABOUT = [
  { id: 1, title: 'About Us', path: '/help-center' },
  { id: 2, title: 'BConnect Policies', path: '/product' },
  { id: 3, title: 'Seller Centre', path: '/access' },
  { id: 4, title: 'BConnect Ambassador Programme', path: '/contact' },
  { id: 5, title: 'Media Contact', path: '/store' },
]

const FOLLOW = [
  { id: 1, title: 'Facebook', path: '/#' },
  { id: 2, title: 'Instagram', path: '/#' },
]

const GENRES = [
  { id: 1, title: 'Drama', path: '/books?genres=drama' },
  { id: 2, title: 'Horror', path: '/books?genres=horror' },
  { id: 3, title: 'Kids', path: '/books?genres=kids' },
  { id: 4, title: 'Romantic', path: '/books?genres=romantic' },
  { id: 5, title: 'Comedy', path: '/books?genres=comedy' },
]

const POLICIES = [
  { id: 1, title: 'PRIVACY POLICY', path: '/' },
  { id: 2, title: 'TERM OF SERVICE', path: '/' },
  { id: 3, title: 'SHIPPING POLICY', path: '/ ' },
  { id: 4, title: 'VIOLATION', path: '/ ' },
]

const ADDRESS = [
  {
    id: 1,
    title: '123 Nam Ki Khoi Nghia, Ngu Hanh Son, Da Nang, Viet Nam',
    path: '/#',
  },
  { id: 2, title: 'BRental@gmail.com', path: '/#' },
  { id: 3, title: '+1 234-567-789', path: '/#' },
]
const A = ({ items }: { items: Array<{ id: number; title: string; path: string }> }) => {
  return (
    <ul className="text-left font-medium text-gray-500">
      {items.map((item) => (
        <li key={item.id} className="mb-4">
          <Link to={item.path} className="hover:text-white">
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const B = ({ items }: { items: Array<{ id: number; title: string; path: string }> }) => {
  return (
    <ul className="nav-link flex text-left font-medium text-gray-500">
      {items.map((item) => (
        <li key={item.id} className="nav-link mb-4">
          <Link to={item.path} className="hover:text-white">
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const categories: Category[] = [
  { title: 'CUSTOMER SERVICE', items: SERVICE },
  { title: 'ABOUT BCONNECT', items: ABOUT },
  { title: 'FOLLOW US', items: FOLLOW },
  { title: 'GENRES', items: GENRES },
]

type Category = {
  title: string
  items: Array<{ id: number; title: string; path: string }> // Thay thế kiểu dữ liệu bằng kiểu dữ liệu chính xác của mảng items.
}

const renderCategory = (category: Category) => (
  <div key={category.title}>
    <h2 className="mb-12 text-sm font-semibold uppercase text-white">{category.title}</h2>
    <A items={category.items} />
  </div>
)

export default function Footer() {
  return (
    <footer className="bg-black dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-4 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="m-4 flex items-center">
              <span className="self-center whitespace-nowrap text-5xl font-extrabold text-white">BConnect</span>
            </Link>
            <div className="mt-9 text-center">
              <A items={ADDRESS} />
            </div>
          </div>
          <div className="mx-auto w-full max-w-screen-xl py-2">
            <div className="grid grid-cols-2 gap-8 px-4 py-2 md:grid-cols-4 lg:py-8">
              {categories.map(renderCategory)}
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-200 dark:border-gray-700 sm:mx-auto" />
      <div>
        <div className="m-5 sm:flex sm:items-center sm:justify-between">
          <span className="mb-4 text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2023{' '}
            <a href="#" className="hover:text-white">
              BRental™
            </a>
            . All Rights Reserved.
          </span>
          <div className="mt-4 flex justify-around space-x-5 sm:mt-0 sm:justify-center">{<B items={POLICIES} />}</div>
        </div>
      </div>
    </footer>
  )
}
