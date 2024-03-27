import { Bell } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

function Notification() {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center">
        <Bell size={20} />
        <p className="hidden-on-mobile hidden-on-tablet">Notifications</p>
      </PopoverTrigger>
      <PopoverContent>Place content for the popover here!</PopoverContent>
    </Popover>
  )
}
export default Notification
