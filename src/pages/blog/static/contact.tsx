import Footer from 'src/components/footer'
import Header from 'src/components/header/header'

function ContactPage() {
  return (
    <div>
      <Header />
      <div className="min-h-96 flex w-full flex-row justify-between bg-white">
        <div className="ml-60 mt-16 w-1/3">
          <div>
            <p className="text-6xl font-extrabold text-orange-500">Contact Us</p>
            <p className="text-xl font-normal text-orange-500">support team ready to help</p>
          </div>
          <p className="flex flex-col">
            <input className="mb-2 h-10 w-64 rounded-full bg-orange-100 pl-4" placeholder="abc@mail.com" />
            <input
              className="h-10 w-64 rounded-full bg-orange-100 pl-4"
              placeholder="What difficulty are you having?"
            />
            <button className=" mt-4 h-12 w-36 rounded-full bg-orange-500 font-medium text-white">Send Question</button>
          </p>
        </div>
        <img width="150%" src="./public/question.png" alt="image" />
      </div>
      <Footer />
    </div>
  )
}
export default ContactPage
