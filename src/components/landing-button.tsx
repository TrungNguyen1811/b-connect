import { useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'

function LandingButton() {
  const navigate = useNavigate()
  const onClick = () => {
    navigate('/')
  }
  return (
    <div className={cn('m-10 text-center text-4xl font-extrabold')} onClick={onClick}>
      BConnect
    </div>
  )
}

export default LandingButton
