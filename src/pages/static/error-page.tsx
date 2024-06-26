import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/ui/button'

function ErrorPage() {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center  px-32 py-16 opacity-90">
      <div className="flex flex-row items-center">
        <img
          className="mr-8 w-[50vw] rounded-sm"
          src="https://res.cloudinary.com/dbpvdxzvi/image/upload/v1716459287/Books/Image/mfqs9mhv459qev3k3twp.png"
          alt="Something went wrong "
        />
        <div className="mb-32">
          <p className="py-4 text-3xl font-bold">Whoops! Something&apos;s changed</p>
          <p className="mb-6 w-[27vw] text-lg">
            You must have picked the wrong door because I haven&apos;t been able to lay my eye on the page you&apos;ve
            been searching for.
          </p>
          <Button onClick={() => navigate('/')}>BACK TO HOME</Button>
        </div>
      </div>
    </div>
  )
}
export default ErrorPage
