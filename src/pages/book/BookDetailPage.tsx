import { format, parseISO } from 'date-fns'
import { Plus, Star } from 'lucide-react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import React, { useCallback, useEffect, useId, useMemo } from 'react'
import { useForm } from 'react-hook-form'
// import { useForm } from 'react-hook-form'
import { useLoaderData, useLocation } from 'react-router-dom'
import BookGridLoading from 'src/components/book/book-grid-loading'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import Book from 'src/components/landing/card-book'
import MetaData from 'src/components/metadata'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/button'
import { Card, CardContent } from 'src/components/ui/card'
import { Carousel, CarouselContent3, CarouselItem, CarouselNext, CarouselPrevious } from 'src/components/ui/carousel'
import { Label } from 'src/components/ui/label'
import { Separator } from 'src/components/ui/separator'
import { useToast } from 'src/components/ui/use-toast'
// import { useToast } from 'src/components/ui/use-toast'
import useGetManyBooks from 'src/hooks/useGetManyBooks'
import { useOrderCart } from 'src/hooks/useOrderCart'
import { formatPrice } from 'src/lib/utils'
import { IBook, IReview } from 'src/types/books'
import { Textarea } from 'src/components/ui/text-area'

type FormValue = {
  review: string
  rating: number
}
function BookDetailPage() {
  const data = useLoaderData() as { book: IBook }
  const [book, setBook] = React.useState<IBook | null>(data.book)

  const { toast } = useToast()
  useEffect(() => {
    setBook(data.book)
  }, [data])

  const { data: relatedBooks, isLoading } = useGetManyBooks(
    {
      category: book?.category?.length && book.category.length > 0 ? book.category[0]._id : '',
    },
    {
      enabled: !!book?.category,
    },
  )

  const { pathname } = useLocation()
  // const user = useAuth()
  // const navigate = useNavigate()
  const { addToCart, cartItems } = useOrderCart()

  const handleAddToCart = () => {
    // if (!user.user) {
    //   navigate('/login')
    //   return
    // }
    if (book) {
      addToCart(book._id as string)
    }
  }

  const renderRelatedBooks = React.useMemo(() => {
    if (isLoading) return <BookGridLoading pageSize={4} />

    if (!relatedBooks?.data) return null

    const _relatedBooks =
      relatedBooks?.data.slice(0, relatedBooks?.data.length > 4 ? 4 : relatedBooks?.data.length) || []

    return _relatedBooks?.map((book) => <Book key={book._id} book={book} />)
  }, [isLoading, relatedBooks?.data])

  const bookInCartAmount = useMemo(() => {
    if (!book) return 0
    const bookInCart = cartItems.find((item) => item.productId === book._id)
    return bookInCart?.quantity || 0
  }, [book, cartItems])

  const addReview = useCallback(
    (review: IReview) => {
      if (!book?.reviews) {
        return
      }

      const updatedBook: IBook = {
        ...book,
        reviews: [...book.reviews, review],
      }

      setBook(updatedBook)
    },
    [book],
  )

  const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
    const paths = pathname.split('/')
    const genre = paths[1]
    return [
      {
        label: 'Home',
        key: 'home',
        href: '/',
        icon: 'home',
      },
      {
        key: 'books',
        label: genre,
        icon: 'book',
        href: `/books?genre=${genre}`,
      },
      {
        key: 'book',
        label: book?.name ?? '', // Handle book.name when book is null
      },
    ]
  }, [book, pathname])

  // const renderReviewRating = useCallback((rating: number) => {
  //   switch (rating) {
  //     case 5:
  //       return <p className=" text-orange-500">Excellent</p>
  //     case 4:
  //       return <p className=" text-orange-500">Greate</p>
  //     case 3:
  //       return <p className=" text-orange-500">Good</p>
  //     case 2:
  //       return <p className=" text-orange-500">Bad</p>
  //     case 1:
  //       return <p className=" text-orange-500">No worth</p>
  //   }
  // }, [])

  const renderReviewer = React.useCallback(
    ({ user_id, rating, updatedAt }: IReview) => (
      <div className="flex w-full items-center gap-3">
        <Avatar>
          <AvatarImage width={'50rem'} src={user_id.avatar} alt={`${user_id.email}`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 justify-between gap-4">
          <div>
            <div className="text-lg font-medium">{user_id.fullName}</div>
            <div className="text-slate-400">{user_id.email}</div>
          </div>
          <div className="flex flex-col items-end justify-end">
            <div className="flex gap-2">
              <h5 className="flex w-fit items-center text-lg font-medium">
                {rating}&nbsp;
                <Star className={'text-yellow-500'} size={16} />
              </h5>
              {/* {renderReviewRating(rating)} */}
            </div>
            <p className="text-right text-xs text-slate-300">
              {' '}
              {updatedAt ? `Reviewed at ${format(parseISO(updatedAt), 'dd/MM/yyyy')}` : 'Review date not available'}
            </p>
          </div>
        </div>
      </div>
    ),
    [],
  )

  const id = useId()

  // const { mutateAsync, isLoading: isAddReview } = useMutation({
  // mutationFn: postBookReview,
  //   onSuccess: (_, { data: { comment, rating } }) => {
  //     if (!book) return

  //     addReview({
  //       _id: id,
  //       user_id: {
  //         _id: '',
  //         email: '',
  //         fullName: '',
  //         avatar: '',
  //         ...user.user,
  //       },
  //       details,
  //       rating,
  //       createdAt: new Date().toISOString(),
  //       updatedAt: new Date().toISOString(),
  //     })
  //   },
  // })

  const renderReviews = React.useMemo(() => {
    return book?.reviews?.map((reviewer) => (
      <div key={reviewer._id} className="mb-2 w-full">
        {renderReviewer(reviewer)}
        <p className="mt-2 w-3/4">{reviewer.details}</p>
      </div>
    ))
  }, [book?.reviews, renderReviewer])

  const { setValue, watch, reset, register, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      review: '',
      rating: 5,
    },
  })

  // const renderGenres = React.useMemo(() => {
  //   return book?.genres?.map((genre) => (
  //     <Link to={`/books?genres=${genre}`} key={genre}>
  //       <p isPressable colors={'secondary'}>
  //         {genre}
  //       </p>
  //     </Link>
  //   ))
  // }, [book?.genres])

  const handleReviewSubmit = useCallback(
    ({ rating, review }: FormValue) => {
      const payload = {
        comment: review,
        rating,
      }

      // mutateAsync({
      //   book_Id: book?._id || '',
      //   data: payload,
      // })
      //   .then(() => {
      //     toast({
      //       type: 'foreground',
      //       title: 'Post a comment successfully',
      //       description: 'Your comment have been recorded',
      //     })

      //     reset()
      //   })
      //   .catch((e) => {
      //     toast({
      //       type: 'foreground',
      //       title: 'Error',
      //       description: JSON.stringify(e),
      //     })
      //   })
    },
    [book?._id, reset, toast],
  )

  return (
    <div className="mx-auto min-h-screen w-full bg-gray-200">
      <MetaData title={book ? book.name.slice(0, 10) + '...' : ''} />
      {book && <Breadcrumb items={breadcrumb} className="mx-auto max-w-7xl py-4" />}
      <div className="mx-auto max-w-6xl bg-white px-2 sm:px-4 lg:px-6">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          {book && (
            <section
              key={'main.book'}
              className="grid w-full grid-cols-1 place-items-start gap-4 py-2 md:grid-cols-3 md:gap-6"
            >
              <article className="ml-7 flex flex-col">
                <img
                  src={book.image}
                  alt={book.name}
                  className="rounded-sm object-cover shadow-md"
                  height={450}
                  width={450}
                />
                <div className="flex flex-row">
                  <Carousel className="h-[120px] w-[25rem] p-2">
                    <CarouselContent3>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className=" basis-9/9">
                          <Card>
                            <CardContent className=" flex aspect-square h-[100px] w-[100px] items-center justify-center p-6">
                              <span className="text-4xl font-semibold">{index + 1}</span>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent3>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </article>

              <article className="col-span-2 ml-24 space-y-8 rounded-lg">
                <div className="space-y-4">
                  <h3 className="text-3xl font-medium tracking-wide">
                    {book.name}
                    <span className="ml-2 text-sm text-gray-500">
                      <p>{book.status}</p>
                    </span>
                  </h3>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                      <p className="nav-link mr-4 pr-2">4.8 *****</p>
                      <p className="nav-link mr-4 pr-2">1.5 sold</p>
                      <p className="nav-link mr-4 pr-2">1.2k rating</p>
                    </div>
                    <div>
                      <p className="pr-10">Report</p>
                    </div>
                  </div>
                  <p>By&nbsp;{book.author}</p>
                </div>

                <div className="space-y-6 px-6">
                  <h1 className="text-xl">
                    <span className="font-bold">{formatPrice(book.price)}</span>
                  </h1>
                </div>

                <div className="space-y-2 px-6">
                  <span>Shipping</span>
                </div>
                <div className="space-y-2 px-6">
                  <span>Size</span>
                </div>
                <div className="space-y-2 px-6">
                  <span>Quantity</span>
                </div>

                <div className="flex px-6">
                  <Button disabled={book.isAvailable} onClick={handleAddToCart}>
                    <Plus className="mr-2" />
                    {bookInCartAmount > 0 ? `Add 1 (Have ${bookInCartAmount} in cart)` : 'Add to Cart'}
                  </Button>
                  <Button className="ml-2" disabled={book.isAvailable}>
                    Buy now
                    {/* {bookInCartAmount > 0 ? `Add 1 (Have ${bookInCartAmount} in cart)` : 'Add to Cart'} */}
                  </Button>
                </div>
              </article>
            </section>
          )}
        </div>
      </div>

      <Separator />
      <div className="mx-auto my-2 max-w-6xl bg-white px-2 sm:my-4 sm:px-4 lg:my-6 lg:px-6">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <div className="col-span-full space-y-2">
            <h1 className="text-lg font-bold">About the book</h1>
            <div className="ml-4">
              <p className="text-md font-bold">Book Specifications:</p>
              {/* <p className="text-base text-slate-500">{book?.category}</p> */}
              <p className="text-base text-slate-500">{book?.author}</p>
              <p className="text-base text-slate-500">{book?.status}</p>
            </div>
            <div className="ml-4">
              <p className="text-md font-bold">Book Description:</p>
              <p className="text-base text-slate-500">{book?.description}</p>
            </div>
            {/* <ul className="flex gap-1">{renderGenres}</ul> */}
          </div>
        </div>
      </div>

      <div className="mx-auto my-2 max-w-6xl bg-white px-2 sm:my-4 sm:px-4 lg:my-6 lg:px-6">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <section key={'main.reviews'} className="w-full py-10">
            <h3 className="mb-8 text-3xl font-medium">Reviewers ({book ? book.reviews?.length : 0})</h3>
            <div className="my-4 space-y-8">{renderReviews}</div>
          </section>
          <Separator />
          <section key={'main.myurevbiew'} className="w-full py-10">
            <form onSubmit={handleSubmit(handleReviewSubmit)} className="space-y-2">
              <div>
                <Label>Rating</Label>
                <div className="flex items-center gap-2">
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={watch('rating')}
                    onChange={(value: number) => setValue('rating', value)}
                    // isDisabled={isAddReview}
                  />
                  {/* {renderReviewRating(watch('rating'))} */}
                </div>
              </div>
              <div>
                <Label htmlFor="review">Your review</Label>
                <Textarea
                  placeholder={''}
                  {...register('review', {
                    minLength: 2,
                    maxLength: 255,
                  })}
                  // disabled={isAddReview}
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </section>
        </div>
      </div>

      <div className="mx-auto my-2 max-w-6xl bg-white px-2 sm:my-4 sm:px-4 lg:my-6 lg:px-6">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <section key={'main.buywith'} className="w-full py-10 ">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-medium">Usually buy with</h3>
            </div>
            {/* <div>
              <BookShouldByWith book={book} />
            </div> */}
          </section>
        </div>
      </div>

      <div className="mx-auto my-2 max-w-6xl bg-white px-2 sm:my-4 sm:px-4 lg:my-6 lg:px-6">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <section key={'main.buywith'} className="w-full py-10 ">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-medium">From the same shop</h3>
            </div>
            {/* <div>
              <BookShop book={book} />
            </div> */}
          </section>
        </div>
      </div>

      <div className="mx-auto my-2 max-w-6xl bg-white px-2 sm:my-4 sm:px-4 lg:my-6 lg:px-6">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <section key={'main.suggest'} className="min-h-[70vh] w-full py-10">
            <h3 className="text-3xl font-medium">You might also like</h3>
            <div className="h-30 flex gap-3 py-4">{renderRelatedBooks}</div>
          </section>
        </div>
      </div>
    </div>
  )
}
export default BookDetailPage
