import { Button } from 'src/components/ui/button'
import { Textarea } from 'src/components/ui/text-area'

function ContactPage() {
  return (
    <div className="contact-container">
      <div className="z-20">
        <div className="z-10 flex flex-row justify-between">
          <div className="ml-56 mr-4 mt-16">
            <div>
              <p className="w-96 text-7xl font-extrabold text-orange-600">Contact Us</p>
              <p className="text-3xl font-medium text-orange-400">We&apos;d love to hear from you.</p>
            </div>
            <p className="mt-8 flex flex-col">
              <input className="w-90 mb-2 h-10 rounded-sm bg-orange-100 pl-4" placeholder="abc@mail.com" />
              <Textarea
                className="w-90 h-40 rounded-sm bg-orange-100 pl-4"
                placeholder="What difficulty are you having?"
              />
              <Button variant={'destructive'} className="mt-8 h-8 w-36 rounded-lg bg-orange-500 font-medium text-white">
                SEND
              </Button>
            </p>
          </div>
          <img
            className="mt-20"
            width="150%"
            src="https://res.cloudinary.com/dbpvdxzvi/image/upload/v1716453863/Books/Image/nmidnftjygqntybfb0ci.png"
            alt="image"
          />
        </div>
      </div>
    </div>
  )
}

export default ContactPage
