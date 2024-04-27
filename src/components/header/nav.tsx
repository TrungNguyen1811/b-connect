import { NavLink } from 'react-router-dom'
import { Facebook, Instagram } from 'lucide-react'
import Notification from '../nofication/notification'
import Help from './help'
import AuthPreview from '../auth-preview/auth-preview'
import { LanguageSelector } from '../language-selector'
import { useTranslation } from 'react-i18next'
function Navigation() {
  const { t } = useTranslation('translation')

  return (
    <div className="m-1 flex items-center justify-between">
      <div className="flex">
        <NavLink className={'nav-link'} to={'/seller/dashboard'}>
          {t('SellerCenter')}
        </NavLink>
        <NavLink className={'hidden-on-mobile nav-link'} to={'/'}>
          {t('Followuson')}
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
