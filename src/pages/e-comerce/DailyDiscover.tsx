import { useParams } from 'react-router-dom'
import { Separator } from 'src/components/ui/separator'

function DailyDiscover() {
  const param = useParams()
  console.log(param)
  return (
    <div>
      <div className="relative">
        <p className="absolute">DAILY DISCOVER</p>
        <Separator className="absolute" />
      </div>
    </div>
  )
}
export default DailyDiscover
