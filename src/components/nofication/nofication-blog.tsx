import { Bell } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useNavigate } from 'react-router-dom'

function NotificationBlog() {
  const navigate = useNavigate()
  return (
    <Popover>
      <PopoverTrigger className="flex items-center rounded-sm p-1.5 hover:bg-orange-500 hover:text-orange-200">
        <Bell size={24} />
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex w-full flex-row justify-between">
          <p>Notifications!</p>
          <button
            className="hover-underline-animation hover:hover-underline-animation hover:font-semibold"
            onClick={() => navigate('/notifications')}
          >
            View All
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
export default NotificationBlog
