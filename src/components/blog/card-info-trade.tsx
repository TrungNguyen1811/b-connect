import { ITradeDetail } from 'src/api/blog/interested'
import { ScrollArea } from '../ui/scroll-area'
import { ITradeStatus } from 'src/pages/blog/SubmitTradePage'
import { useEffect, useState } from 'react'
import { getAddressByAddressId } from 'src/api/address/get-address'
import { IAddress } from 'src/types/address'

function CardInfoTrade({ userTrade }: { userTrade: ITradeDetail }) {
  const renderForm = (string: string, name: string) => {
    return (
      <div className="flex flex-row items-start justify-between">
        <div>
          <p className="text-gray-400">{string}</p>
        </div>
        <p className="w-96 text-right">{name ? name : 'null'}</p>
      </div>
    )
  }
  const [address, setAddress] = useState<IAddress>()
  const addressUser =
    address?.city_Province + ', ' + address?.district + ', ' + address?.subDistrict + ', ' + address?.rendezvous + '.'
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const address = await getAddressByAddressId(userTrade.details.addressId as string)
        setAddress(address)
      } catch (error: any) {
        console.error('Error fetching trade details:', error.response.data)
      }
    }
    fetchAddress()
  }, [userTrade.details.addressId])

  return (
    <div className="my-2 w-full rounded-xl border px-4 pb-2 pt-2">
      <p className="mb-2 text-lg font-semibold">Information</p>
      <ScrollArea className="h-44">
        {renderForm('Is Post Owner', userTrade?.details.isPostOwner ? 'True' : 'False')}
        {renderForm('Status', ITradeStatus[userTrade?.details.status as keyof typeof ITradeStatus])}
        {renderForm('Address', addressUser as string)}
        {renderForm('Phone', userTrade?.details.phone)}
        {renderForm('Note', userTrade?.details.note)}
      </ScrollArea>
    </div>
  )
}
export default CardInfoTrade
