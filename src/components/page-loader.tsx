import { Loader2 } from 'lucide-react'

function PageLoader() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader2 className="mr-2 h-5 w-5 animate-spin text-primary ease-in-out" />
    </div>
  )
}

export default PageLoader
