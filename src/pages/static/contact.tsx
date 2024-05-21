import Footer from 'src/components/footer'
import Header from 'src/components/header/header'

function ContactPage() {
  return (
    <div>
      <Header />
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
                <input
                  className="w-90 h-40 rounded-sm bg-orange-100 pl-4 text-start"
                  placeholder="What difficulty are you having?"
                />
                <button className="mt-8 h-8 w-36 rounded-lg bg-orange-500 font-medium text-white">SEND</button>
              </p>
            </div>
            <img className="mt-20" width="150%" src="./public/question.png" alt="image" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ContactPage
