import { CheckCircle2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <div className="h-screen bg-orange-100">
      <div className="bg-orange-50 p-6  md:mx-auto">
        <CheckCircle2Icon size={24} className="mx-auto my-6 h-16 w-16 text-blue-600" />

        <div className="text-center">
          <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">Payment Done!</h3>
          <p className="my-2 text-gray-600">Thank you for completing your secure online payment.</p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <Link className="bg-indigo-600 px-12 py-3 font-semibold text-white hover:bg-indigo-500" to={`/`}>
              GO BACK
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccess
