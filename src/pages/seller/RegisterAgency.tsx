import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/ui/button'

function RegisterAgency() {
  const navigate = useNavigate()
  return (
    <div className="mx-36 my-24">
      <div className="min-h-[32rem] rounded-sm border-2 shadow">
        <div className="flex flex-col items-center py-12">
          <img
            className="w-96 py-4"
            src="https://static.vecteezy.com/system/resources/previews/022/576/148/large_2x/creative-team-brainstorming-in-an-advertising-agency-business-people-plan-a-project-by-putting-together-different-ideas-during-a-meeting-ai-generated-photo.jpeg"
          />
          <p className="py-1 text-lg font-semibold">Welcome to BConnect!</p>
          <p className="py-1 text-slate-500">Please provide information to subscribe account agency on BConnect</p>
          <Button onClick={() => navigate('/seller/subscribe')} className="my-2">
            Start Subscribe
          </Button>
        </div>
      </div>
    </div>
  )
}
export default RegisterAgency
