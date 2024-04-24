import { format, parseISO } from 'date-fns'
import { Plus, Star } from 'lucide-react'
import '@smastrom/react-rating/style.css'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import { useForm } from 'react-hook-form'
import { Link, useLoaderData, useLocation } from 'react-router-dom'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/button'
import { Label } from 'src/components/ui/label'
import { Separator } from 'src/components/ui/separator'
import { useToast } from 'src/components/ui/use-toast'
// import { useToast } from 'src/components/ui/use-toast'
import { useOrderCart } from 'src/hooks/useOrderCart'
import { formatPrice } from 'src/lib/utils'
import { IBook, IReplyTest, IReview, IReviewResponse } from 'src/types/books'
import { Textarea } from 'src/components/ui/text-area'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Rating } from '@smastrom/react-rating'
import { postRatingComment } from 'src/api/review/post-rating-review'
import { useAuth } from 'src/hooks/useAuth'
import getAllReviewByBookId from 'src/api/review/get-all-review-by-bookId'
import BookShouldByWith from './BookShouldByWith'
import BookRelevant from './BookRelevant'
import { Carousel, CarouselContent3, CarouselItem, CarouselNext, CarouselPrevious } from 'src/components/ui/carousel'
import { Card, CardContent } from 'src/components/ui/card'
import { IAgency } from 'src/types/agency'
import { getAgencyByAgencyId, getPercentageReplyByAgencyId } from 'src/api/agency/get-agency'
import { UserChatReply } from 'src/types/chat'
import { postChatMessage } from 'src/api/chat/post-chat'

type FormValue = {
  comment: string
  ratingPoint: number
}

function BookDetailPage() {
  const data = useLoaderData() as { book: IBook }
  const [book, setBook] = React.useState<IBook | null>(data.book)
  const { user } = useAuth()
  const { toast } = useToast()
  useEffect(() => {
    setBook(data.book)
  }, [data])

  const [agency, setAgency] = useState<IAgency>()
  useEffect(() => {
    const fetchData = async () => {
      const agency = (await getAgencyByAgencyId(book?.agencyId as string)) as IAgency
      setAgency(agency)
    }
    if (book?.productId) {
      fetchData()
    }
  }, [book?.agencyId])

  const percent = getPercentageReplyByAgencyId(book?.agencyId as string)

  const [bookReview, setBookReview] = useState<IReviewResponse[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const review: IReviewResponse[] = await getAllReviewByBookId(book?.productId as string)
      setBookReview(review)
    }
    if (book?.productId) {
      fetchData()
    }
  }, [book?.productId])

  const queryClient = useQueryClient()
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
      addToCart(book.productId as string)
    }
  }

  const bookInCartAmount = useMemo(() => {
    if (!book) return 0
    const bookInCart = cartItems.find((item) => item.productId === book.productId)
    return bookInCart?.quantity || 0
  }, [book, cartItems])

  const addReview = useCallback(
    (review: IReviewResponse) => {
      if (!bookReview) {
        return
      }
      const updatedBookReview: IReviewResponse[] = [...bookReview, review]
      setBookReview(updatedBookReview)
    },
    [bookReview],
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
        label: book?.name ?? '',
      },
    ]
  }, [book, pathname])

  const renderReviewRating = useCallback((rating: number) => {
    switch (rating) {
      case 5:
        return <p className=" text-orange-500">Excellent</p>
      case 4:
        return <p className=" text-orange-500">Great</p>
      case 3:
        return <p className=" text-orange-500">Good</p>
      case 2:
        return <p className=" text-orange-500">Bad</p>
      case 1:
        return <p className=" text-orange-500">No worth</p>
      default:
        return <p></p>
    }
  }, [])

  const renderReviewer = React.useCallback(
    ({ email, username, ratingPoint, avatarDir, createdDate }: IReviewResponse) => (
      <div className="flex w-full items-center gap-3">
        <Avatar>
          <AvatarImage width={'50rem'} src={avatarDir} alt={`${username}`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 justify-between gap-4">
          <div>
            <div className="text-lg font-medium">{username}</div>
            <div className="text-slate-400">{email}</div>
          </div>
          <div className="flex flex-col items-end justify-end">
            <div className="flex gap-2">
              <h5 className="flex w-fit items-center text-lg font-medium">
                {ratingPoint}&nbsp;
                <Star className={'text-yellow-500'} size={16} />
              </h5>
              {renderReviewRating(ratingPoint)}
            </div>
            <p className="text-right text-xs text-slate-300">
              {createdDate ? `Reviewed at ${format(parseISO(createdDate), 'dd/MM/yyyy')}` : 'Review date not available'}
            </p>
          </div>
        </div>
      </div>
    ),
    [],
  )

  const renderReply = React.useCallback(
    ({ replyId, replyText, userId, createdDate, email, username, avatarDir }: IReplyTest) => (
      <div className="ml-16 bg-gray-100 p-5">
        <div className="flex w-full flex-row items-center justify-between  gap-3 ">
          <div className="text-md">{username} Response:</div>
          <p className="text-right text-xs text-slate-300">
            {createdDate ? `Replied at ${format(parseISO(createdDate), 'dd/MM/yyyy')}` : 'Reply date not available'}
          </p>
        </div>
        <p className="ml-8 py-2 text-gray-500">{replyText}</p>
      </div>
    ),
    [],
  )

  const { mutateAsync, isLoading: isAddReview } = useMutation<IReviewResponse, Error, IReview>(postRatingComment, {
    onSuccess: (data: IReviewResponse) => {
      if (!book) return
      queryClient.invalidateQueries()
      addReview(data)
    },
  })

  const renderReviews = React.useMemo(() => {
    if (!Array.isArray(bookReview)) return null // Check if bookReview is an array
    return bookReview.map((reviewer) => (
      <div key={reviewer.reviewerId} className="mb-2 w-full">
        <div>
          {renderReviewer(reviewer)}
          <p className="ml-8 mt-2 w-3/4">{reviewer.comment}</p>
        </div>
        <div>{reviewer.reply && renderReply(reviewer.reply)}</div>
      </div>
    ))
  }, [bookReview, renderReviewer, renderReply])

  const { setValue, watch, reset, register, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      comment: '',
      ratingPoint: 5,
    },
  })

  console.log(book)
  const handleReviewSubmit = useCallback(
    ({ ratingPoint, comment }: FormValue) => {
      const payload = {
        ratingId: book?.ratingId as string,
        userId: user?.userId as string,
        comment: comment,
        ratingPoint: ratingPoint.toString(),
      }
      mutateAsync(payload)
        .then(() => {
          toast({
            type: 'foreground',
            title: 'Post a comment successfully',
            description: 'Your comment have been recorded',
          })
          reset()
        })
        .catch((e) => {
          toast({
            type: 'foreground',
            title: 'Error',
            description: JSON.stringify(e),
          })
        })
    },
    [book?.productId, reset, toast],
  )

  const carouselImages = book?.bookImg as string
  const arrayImages = carouselImages.split(',')
  const [selectedImage, setSelectedImage] = useState(arrayImages[0])
  const handleCarouselItemClick = (imageURL: React.SetStateAction<string>) => {
    setSelectedImage(imageURL as string)
  }

  const query = useQueryClient()
  const { mutate: postMessage } = useMutation({
    mutationFn: (formData: UserChatReply) => {
      return postChatMessage(formData)
    },
    onSuccess: (newMessage) => {
      query.invalidateQueries()
    },
  })

  const onSubmit = () => {
    console.log('bbbok', book?.agencyId)
    const formData: UserChatReply = {
      receiverId: book?.agencyId as string,
      messageText: 'hi',
    }
    postMessage(formData)
  }

  return (
    <div className="mx-auto min-h-screen w-full bg-orange-100">
      <MetaData title={book ? book.name.slice(0, 10) + '...' : ''} />
      {book && <Breadcrumb items={breadcrumb} className="mx-auto max-w-7xl py-4" />}
      <div className="mx-auto max-w-6xl bg-orange-50 px-2 sm:px-4 lg:px-6">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          {book && (
            <section
              key={'main.book'}
              className="grid w-full grid-cols-1 place-items-start gap-4 py-2 md:grid-cols-3 md:gap-6"
            >
              <article className="ml-7 flex flex-col">
                <img src={selectedImage} alt="Selected Image" className="h-96 rounded-sm object-cover shadow-md" />

                <div className="flex flex-row">
                  {/* Carousel */}
                  <Carousel className="h-[120px] w-[25rem] p-2">
                    <CarouselContent3>
                      {/* Render các carousel item */}
                      {Array.isArray(arrayImages) &&
                        arrayImages.map((image, index) => (
                          <CarouselItem key={index} className="basis-9/9">
                            <Card>
                              <CardContent
                                className="hover: flex aspect-square h-full w-[6rem] items-center justify-center rounded-md p-0 hover:border hover:border-red-500"
                                onClick={() => handleCarouselItemClick(image)}
                                onMouseEnter={() => handleCarouselItemClick(image)}
                              >
                                <img className="rounded-sm" src={image} />
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

              <article className="col-span-2 ml-32 space-y-4 rounded-lg">
                <div className="space-y-4">
                  <h3 className="text-3xl font-medium tracking-wide">
                    {book.name}
                    <span className="ml-2 text-sm text-gray-500">
                      <p>{book.type}</p>
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
                  <h1 className="text-2xl text-red-500">
                    <span className="font-bold">{formatPrice(book.price)}</span>
                  </h1>
                </div>

                <div className="space-y-2 px-6">
                  <span>Shipping</span>
                </div>
                <div className="space-y-2 px-6">
                  <span className="mr-2">Type:</span>
                  <span>{book.type}</span>
                </div>
                <div className="flex flex-row items-center space-y-2 px-6">
                  <span className="mr-6 mt-2">Stock:</span>
                  <span className="">{book.stock}</span>
                </div>

                <div className="flex px-6 pt-8">
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

      <Separator className="mt-6" />

      <div className="mx-auto my-2 max-w-6xl bg-orange-50 px-2 sm:my-4 sm:px-4 lg:my-6 lg:px-6">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <div className="col-span-full space-y-2">
            <h1 className="text-lg font-bold">About the book</h1>
            <div className="ml-4">
              <p className="text-md font-bold">Book Specifications:</p>
              {/* <p className="text-base text-slate-500">{book?.category}</p> */}
              <p className="text-base text-slate-500">Author: {book?.author}</p>
              <p className="text-base text-slate-500">Type: {book?.type}</p>
              <p className="text-base text-slate-500">Category: {book?.category?.join(',')}</p>
            </div>
            <div className="ml-4">
              <p className="text-md font-bold">Book Description:</p>
              <p className="text-base text-slate-500">{book?.description}</p>
            </div>
            {/* <ul className="flex gap-1">{renderGenres}</ul> */}
          </div>
        </div>
      </div>

      <div className="mx-auto my-2 flex max-w-6xl flex-row items-center justify-between  bg-orange-50 p-4 px-2 sm:my-4 sm:px-4 lg:my-6 lg:px-6">
        <div className="flex flex-row">
          <Avatar className="mr-1 h-16 w-16">
            {/* <AvatarImage src={agency?.logoImg as string} /> */}
            <AvatarImage src="https://scontent.fdad7-1.fna.fbcdn.net/v/t45.1600-4/408957050_120208360688070402_8892427179558757879_n.png?stp=cp0_dst-jpg_p296x100_q90_spS444&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ISv-9zSdGvAAb68O3WA&_nc_ht=scontent.fdad7-1.fna&oh=00_AfCrQV1nJeHjnsNTY_l2EJj-N6CEP3RgWlSnj2G6cCTVJw&oe=662C06B3" />
          </Avatar>
          <div>
            <p className="ml-2 text-base font-semibold">{agency?.agencyName}</p>
            <p>
              <Link
                className="ml-2 rounded-sm border px-2 py-1 text-xs text-gray-500 hover:bg-orange-400 hover:text-white"
                to={`/shop/${book?.agencyId}`}
              >
                View Shop
              </Link>
              <button
                onClick={() => onSubmit()}
                className="ml-2 rounded-sm border px-2 py-1 text-xs text-gray-500 hover:bg-orange-400 hover:text-white"
              >
                Chat Now
              </button>
            </p>
          </div>
        </div>
        <div className="mx-16 flex flex-row gap-16 text-gray-500">
          <p>Rating: 5</p>
          <p>Product: 13</p>
          <p>Response: 0%</p>
          <p>Join: 2024/02/22</p>
        </div>
      </div>

      <div className="mx-auto my-2 max-w-6xl bg-orange-50 px-2 sm:my-4 sm:px-4 lg:my-6 lg:px-6">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <section key={'main.reviews'} className="w-full py-10">
            <h3 className="mb-8 text-3xl font-medium">Reviewers ({book ? bookReview?.length : 0})</h3>
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
                    value={watch('ratingPoint')}
                    onChange={(value: number) => setValue('ratingPoint', value)}
                    isDisabled={isAddReview}
                  />
                  {renderReviewRating(watch('ratingPoint'))}
                </div>
              </div>
              <div>
                <Label htmlFor="comment">Your review</Label>
                <Textarea
                  placeholder={''}
                  {...register('comment', {
                    minLength: 2,
                    maxLength: 255,
                  })}
                  disabled={isAddReview}
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </section>
        </div>
      </div>

      <div className="mx-auto my-2 max-w-6xl bg-orange-50 px-2 sm:my-4 sm:px-4 lg:my-6 lg:px-6">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <section key={'main.buywith'} className="w-full py-10 ">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-medium">Usually buy with</h3>
            </div>
            <div>
              <BookShouldByWith book={book} />
            </div>
          </section>
        </div>
      </div>

      {/* <div className="mx-auto my-2 max-w-6xl bg-orange-50 px-2 sm:my-4 sm:px-4 lg:my-6 lg:px-6">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <section key={'main.buywith'} className="w-full py-10 ">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-medium">From the same shop</h3>
            </div>
            <div>
              <BookShop book={book} />
            </div>
          </section>
        </div>
      </div> */}

      <div className="mx-auto my-2 max-w-6xl bg-orange-50 px-2 sm:my-4 sm:px-4 lg:my-6 lg:px-6">
        <div className="mx-auto max-w-2xl py-1 sm:py-2 lg:max-w-none lg:py-4">
          <section key={'main.suggest'} className="min-h-[70vh] w-full py-10">
            <h3 className="text-3xl font-medium">You might also like</h3>
            <div className="h-30 flex gap-3 py-4">
              <BookRelevant book={book} />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
export default BookDetailPage
