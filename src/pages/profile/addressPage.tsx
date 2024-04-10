import { useEffect, useState } from 'react'
import { getAllAddress } from 'src/api/address/get-address'
import MetaData from 'src/components/metadata'
import { Separator } from 'src/components/ui/separator'
import AddNewAddress from 'src/components/user/add-address'
import UpdateAddress from 'src/components/user/update-address'
import { useAuth } from 'src/hooks/useAuth'
import { IAddress } from 'src/types/address'

function AddressPage() {
  const { user } = useAuth()
  const [addresses, setAddresses] = useState<IAddress[]>([])

  useEffect(() => {
    const getAddressById = async () => {
      try {
        const data: IAddress[] = await getAllAddress(user?.userId as string)
        if (data) {
          setAddresses(data)
          console.log('Addresses fetched:', data)
        } else {
          console.log('No address data received.')
        }
      } catch (error) {
        console.error('Error fetching addresses:', error)
      }
    }
    console.log('Fetching addresses...')
    getAddressById()
  }, [user?.userId])

  return (
    <div className="w-[77vw]">
      <MetaData title="Address" />
      <div className="w-full">
        <div className="w-full">
          <div className="flex w-full flex-row items-center justify-between px-8">
            <p className="text-xl font-semibold">
              My Addresses {''}({addresses.length})
            </p>
            <AddNewAddress />
          </div>
          <Separator />
          <div>
            {addresses.map((address, index) => (
              <div key={index} className="ml-8">
                <div className="my-2 flex flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <p>{address.rendezvous}</p>
                    <p>
                      {address.city_Province}, {address.district}, {address.subDistrict}
                    </p>
                    {address.default ? (
                      <p className="border-1 w-24 border border-red-600 px-2 py-1 text-center text-red-600">Default</p>
                    ) : (
                      ''
                    )}
                  </div>
                  <div>
                    <UpdateAddress addressId={address.addressId} />
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default AddressPage
