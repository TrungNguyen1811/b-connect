function AboutPage() {
  return (
    <div className="mx-64 mt-4">
      <p className="p-4 text-center text-5xl font-bold text-orange-500">About Us</p>
      <p className="mb-4 text-center font-serif text-xl">
        Welcome to BConnect, the ultimate destination for book lovers to connect, exchange, buy, and sell books! We
        believe in the magic of books and the joy of sharing that passion with a vibrant community.
      </p>
      <div className="flex flex-row items-start justify-evenly">
        <div className="w-1/2">
          <p className="mb-4 mt-16 text-3xl font-bold">Our Mission</p>
          <p className="mb-2 font-serif text-xl">
            At BConnect, our mission is to foster a dynamic, supportive, and engaging community where book enthusiasts
            can come together.
          </p>
          <p className="font-serif text-xl">
            Whether you&apos;re looking to discover your next great read, exchange books with fellow readers, or sell
            and buy preloved books, we&apos;re here to make it happen.
          </p>
        </div>
        <img className="h-[75%] w-1/2" src="./public/misson.png" alt="image" />
      </div>
      <div className="flex flex-row items-start justify-evenly">
        <img className="w-1/2" src="./public/join.png" alt="image" />
        <div className="w-1/2">
          <p className="mb-4 mt-16 text-3xl font-bold">Join Us</p>
          <p className="mb-2 font-serif text-xl">
            Become a part of [Your Platform Name] today and immerse yourself in a community that celebrates the love of
            books.
          </p>
          <p className="font-serif text-xl">
            Together, let&apos;s build a place where stories are shared, connections are made, and the love for reading
            thrives.
          </p>
        </div>
      </div>
      <div>
        <div>
          <p className="mb-8 mt-16 text-center text-3xl font-bold">What We Offer</p>
        </div>
        <div className="flex flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Socialize</p>
            <img className="h-72" src="./public/social.png" alt="image" />
            <p className="text-md text-center font-serif text-gray-500">
              Connect with other book lovers, join discussions, and share your thoughts on your favorite reads. Our
              platform offers a variety of forums and groups tailored to different genres and interests.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Exchange</p>
            <img className="h-72" src="./public/exchange.png" alt="image" />
            <p className="text-md text-center font-serif text-gray-500">
              Trade books with other members of the community. Our book exchange program allows you to swap books
              seamlessly and expand your library without spending a dime.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Buy and Sell</p>
            <img className="h-72" src="./public/sell.png" alt="image" />
            <p className="text-md text-center font-serif text-gray-500">
              Find new homes for your books and discover hidden gems from other readers. Our marketplace is designed to
              make buying and selling books easy, secure, and enjoyable.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p className="mb-8 mt-16 text-center text-3xl font-bold">Why Choose Us?</p>
        </div>
        <div className="choose-container flex flex-row justify-between gap-16 text-center">
          <div className="mt-24 w-full pr-32 text-right">
            <p className="mr-8 pb-4 pt-7 text-lg font-bold">Community</p>
            <p className="mr-8 font-serif">
              We are dedicated to building a friendly and inclusive community where everyone can share their love for
              books.
            </p>
          </div>
          <div className="mt-24 w-full pl-32 text-left">
            <p className="ml-6 pb-4 pt-7 text-lg font-bold">User-Friendly</p>
            <p className="text-md ml-6 font-serif">
              Our platform is designed to be intuitive and easy to use, ensuring a smooth experience whether you&apos;re
              socializing, exchanging, buying, or selling.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p className="mb-8 mt-16 text-center font-serif text-3xl font-bold underline">- THANKS -</p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
