import { Truck } from 'lucide-react'
import React, { useCallback, useEffect, useId } from 'react'
import { useForm } from 'react-hook-form'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { Separator } from 'src/components/ui/separator'
import { useToast } from 'src/components/ui/use-toast'
import { useAuth } from 'src/hooks/useAuth'
import { formatPrice } from 'src/lib/utils'
import { IBook, IReview } from 'src/types/books'

type FormValue = {
  review: string
  rating: number
}
export default function BookDetailPage() {
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
  const user = useAuth()
  const navigate = useNavigate()
  const { addToCart, cartItems } = useOrderCart()

  const handleAddToCart = () => {
    if (!user.user) {
      navigate('/login')
      return
    }
    if (book) {
      addToCart(book._id as string)
    }
  }

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

  const id = useId()
  const { setValue, watch, reset, register, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      review: '',
      rating: 5,
    },
  })

  return (
    <div className="container mx-auto">
      {book && (
        <section
          key={'main.book'}
          className="grid w-full grid-cols-1 place-items-start gap-4 py-10 md:grid-cols-2 md:gap-6"
        >
          <img
            src={book.image}
            alt={book.name}
            className="rounded-sm object-cover shadow-md"
            height={700}
            width={500}
          />

          <article className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-medium tracking-wide">{book.name}</h3>
              <p>By&nbsp;{book.author}</p>
            </div>

            <div className="space-y-8">
              <h1 className="text-xl ">
                Rent now for <span className="font-bold">{formatPrice(book.price)}</span>/ day
              </h1>
              <p className="line-clamp-3">{book.description}</p>
            </div>
          </article>

          <div className="hover-bg-orange-100/90 col-span-full mx-auto flex w-1/2 cursor-default items-center gap-8 rounded-md border border-border bg-orange-100/50 px-8 py-4 transition-opacity">
            <Truck className="hidden h-16 w-16 text-orange-800 sm:block" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Free shipping !</h3>
              <p className="text-xs">
                We offer free shipping for all orders over 100$. This offer is valid for all orders in the US/VN/FR. For
                other countries, please contact us for more information.
              </p>
            </div>
          </div>

          <div className="col-span-full space-y-2">
            <h1 className="text-lg font-bold">About the book</h1>
            <div className="ml-4">
              <p className="text-md font-bold">Description:</p>
              <p className="text-base text-slate-500">{book.description}</p>
            </div>
            <div className="ml-4">
              <p className="text-md font-bold">Status Description:</p>

              <p className="text-base text-slate-500">{book.description}</p>
            </div>
          </div>
        </section>
      )}

      <Separator />

      <section key={'main.suggest'} className="min-h-[70vh] w-full py-10">
        <h3 className="text-3xl font-medium">You might also like</h3>
      </section>

      <section key={'main.buywith'} className="w-full py-10 ">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-medium">Usually buy with</h3>
        </div>
      </section>

      <Separator />

      <section key={'main.reviews'} className="w-full py-10">
        <h3 className="mb-8 text-3xl font-medium">Reviewers ({book ? book.reviews?.length : 0})</h3>
      </section>
      <Separator />
    </div>
  )
}
function useGetManyBooks(
  arg0: { category: string | undefined },
  arg1: { enabled: boolean },
): { data: any; isLoading: any } {
  throw new Error('Function not implemented.')
}
function useOrderCart(): { addToCart: any; cartItems: any } {
  throw new Error('Function not implemented.')
}
