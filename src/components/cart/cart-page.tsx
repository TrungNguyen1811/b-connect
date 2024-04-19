import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useOrderCart } from 'src/hooks/useOrderCart'
import React, { useEffect, useState } from 'react'
import { IBook } from 'src/types/books'
import { getBookById } from 'src/api/books/get-book'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { DeleteIcon } from 'lucide-react'
import { getAgencyByAgencyId } from 'src/api/agency/get-agency'
import { IAgency } from 'src/types/agency'

function CartPage() {
  const { cartItems, addToCart, decreaseToCart, removeFromCart, clearCart } = useOrderCart()

  const handleAddToCart = (productId: string) => {
    addToCart(productId)
  }
  const handleDecreaseToCart = (productId: string) => {
    decreaseToCart(productId)
  }
  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId)
  }
  const handleClearCart = () => {
    clearCart()
  }

  // map bookDetail
  const [bookData, setBookData] = useState<IBook[]>([])
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const promises = cartItems
        .filter((cart) => typeof cart.productId === 'string')
        .map((cart) => getBookById(cart.productId as string)) // Cast to string

      Promise.all(promises)
        .then((bookDataArray) => {
          setBookData(bookDataArray)
        })
        .catch((error) => {
          console.error('Error fetching book data:', error)
        })
    }
  }, [cartItems])

  interface GroupedByStore {
    [key: string]: { book: IBook; quantity: number; agencyName: string }[] // Mảng của đối tượng chứa thông tin sách và số lượng trong giỏ hàng
  }

  const [cartItemsByStore, setCartItemsByStore] = useState<GroupedByStore>({})

  useEffect(() => {
    const groupedByStore: GroupedByStore = {}

    // const processBookData = async (book: IBook) => {
    //   try {
    //     if (book && book.productId) {
    //       if (!groupedByStore[book.agencyId]) {
    //         groupedByStore[book.agencyId] = []
    //       }
    //       groupedByStore[book.agencyId].push({
    //         book: book,
    //         quantity: cartItems.find((item) => item.productId === book.productId)?.quantity || 0,
    //         agencyName: book.agencyName,
    //       })
    //     }
    //   } catch (error) {
    //     console.error('Error processing book data:', error)
    //   }
    // }

    const processAllBooksData = async () => {
      try {
        for (const book of bookData) {
          if (book && book.agencyId) {
            if (!groupedByStore[book.agencyId]) {
              groupedByStore[book.agencyId] = []
            }
            groupedByStore[book.agencyId].push({
              book: book,
              quantity: cartItems.find((item) => item.productId === book.productId)?.quantity || 0,
              agencyName: book.agencyName as string,
            })
          }
        }
        setCartItemsByStore(groupedByStore)
      } catch (error) {
        console.error('Error processing all books data:', error)
      }
    }

    processAllBooksData()
  }, [bookData, cartItems])

  // State để lưu trữ các sản phẩm đã chọn để xóa
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleItemCheckboxChange = (productId: string) => {
    const newSelectedItems = selectedItems.includes(productId)
      ? selectedItems.filter((id) => id !== productId)
      : [...selectedItems, productId]
    setSelectedItems(newSelectedItems)
  }

  // Hàm kiểm tra xem tất cả các sản phẩm của một cửa hàng đã được chọn chưa
  const isStoreSelected = (agencyId: string) => {
    const storeItems = cartItemsByStore[agencyId] || []
    return storeItems.every((item) => selectedItems.includes(item.book.productId as string))
  }

  // Hàm cập nhật danh sách sản phẩm đã chọn dựa trên cửa hàng
  const handleStoreCheckboxChange = (agencyId: string) => {
    const storeItems = cartItemsByStore[agencyId] || []
    const newSelectedItems = [...selectedItems]
    if (isStoreSelected(agencyId)) {
      storeItems.forEach((item) => {
        const index = newSelectedItems.indexOf(item.book.productId as string)
        if (index !== -1) {
          newSelectedItems.splice(index, 1)
        }
      })
    } else {
      storeItems.forEach((item) => {
        if (!newSelectedItems.includes(item.book.productId as string)) {
          newSelectedItems.push(item.book.productId as string)
        }
      })
    }
    setSelectedItems(newSelectedItems)
  }

  // Hàm xóa các sản phẩm đã chọn
  const handleRemoveSelected = () => {
    selectedItems.forEach((productId) => removeFromCart(productId))
    setSelectedItems([]) // Xóa danh sách sản phẩm đã chọn sau khi xóa
  }

  // Khai báo state cho checkbox "Select all"
  const [selectAll, setSelectAll] = useState(false)

  // Hàm xử lý khi checkbox "Select all" được nhấp vào
  const handleSelectAllChange = () => {
    // Đảo ngược trạng thái của checkbox "Select all"
    setSelectAll(!selectAll)

    // Cập nhật danh sách sản phẩm đã chọn để xóa
    const newSelectedItems: React.SetStateAction<string[]> = []
    Object.keys(cartItemsByStore).forEach((agencyId) => {
      cartItemsByStore[agencyId].forEach((item) => {
        newSelectedItems.push(item.book.productId as string)
      })
    })
    setSelectedItems(!selectAll ? newSelectedItems : [])
  }

  // Kiểm tra nếu có sản phẩm không được chọn thì tắt "Select all"
  useEffect(() => {
    const allItemsSelected = Object.keys(cartItemsByStore).every((agencyId) => isStoreSelected(agencyId))
    setSelectAll(allItemsSelected)
  }, [selectedItems])

  const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.productId as string))
  const navigate = useNavigate()
  const handleCheckout = async () => {
    const selectedCartItemsEncoded = btoa(JSON.stringify(selectedCartItems))
    navigate(`/checkout/${selectedCartItemsEncoded}`)
  }

  const AgencyName: React.FC<{ agencyId: string }> = ({ agencyId }) => {
    const [agencyName, setAgencyName] = useState<string>('')

    useEffect(() => {
      const fetchAgencyName = async () => {
        try {
          const name: IAgency | null = await getAgencyByAgencyId(agencyId)
          setAgencyName(name?.agencyName as string)
        } catch (error) {
          console.error('Error fetching agency name:', error)
        }
      }

      fetchAgencyName()
    }, [agencyId])

    return <span>{agencyName}</span>
  }
  return (
    <div className="p-4">
      <div className="rounded-lg border border-gray-200 p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>
                <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} />
              </TableCell>{' '}
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems && bookData && bookData.length > 0 ? (
              Object.keys(cartItemsByStore).map((agencyId, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={isStoreSelected(agencyId)}
                        onChange={() => handleStoreCheckboxChange(agencyId)}
                      />
                    </TableCell>
                    <TableCell colSpan={4} className="font-bold">
                      Store <AgencyName agencyId={agencyId} />
                    </TableCell>
                  </TableRow>
                  {cartItemsByStore[agencyId].map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.book.productId as string)}
                          onChange={() => handleItemCheckboxChange(item.book.productId as string)}
                        />
                      </TableCell>
                      <TableCell>{item.book.name}</TableCell>
                      <TableCell>${item.book.price}</TableCell>
                      <TableCell className="flex flex-row">
                        <Button
                          size="sm"
                          variant={'outline'}
                          onClick={() => handleDecreaseToCart(item.book.productId as string)}
                        >
                          -
                        </Button>{' '}
                        <p className="p-2">{item.quantity}</p>
                        <Button
                          size="sm"
                          variant={'outline'}
                          onClick={() => handleAddToCart(item.book.productId as string)}
                        >
                          +
                        </Button>
                      </TableCell>
                      <TableCell>
                        <DeleteIcon onClick={() => handleRemoveFromCart(item.book.productId as string)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No items in the cart</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {selectedItems.length > 0 && (
          <div className="mt-4">
            <Button onClick={handleRemoveSelected}>Remove Selected ({selectedItems.length})</Button>
          </div>
        )}
      </div>
      <div className="mt-8 flex flex-row items-center">
        {
          <div className="mr-4">
            <Button onClick={handleCheckout}>Check Out</Button>
          </div>
        }
        <Button onClick={handleClearCart}>Clear Cart</Button>
      </div>
    </div>
  )
}

export default CartPage
