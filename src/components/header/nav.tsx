import { NavLink } from 'react-router-dom'
import { Facebook, Instagram } from 'lucide-react'
import Notification from './notification'
import Help from './help'
import AuthPreview from './auth-preview'
import { LanguageSelector } from '../language-selector'
function Navigation() {
  return (
    <div className="m-1 flex items-center justify-between">
      <div className="flex">
        <NavLink className={'nav-link'} to={'/'}>
          Seller Center
        </NavLink>
        <NavLink className={'nav-link'} to={'/'}>
          Follow us on
        </NavLink>
        <div className="ml-1 flex items-center">
          <Facebook size={20} className="mr-1" />
          <Instagram size={20} />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="mr-4 flex items-center justify-center">
          <Notification />
        </div>
        <div className="mr-4 flex items-center justify-center">
          <Help />
        </div>
        <div className="mr-4 flex items-center justify-center">
          <LanguageSelector />
        </div>
        <div className="mr-4 flex items-center justify-center">
          <AuthPreview />
        </div>
      </div>
    </div>
  )
}
export default Navigation
