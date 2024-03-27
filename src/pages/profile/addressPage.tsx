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
            <p>My Addresses</p>
            <AddNewAddress />
          </div>
          <Separator />
          <div>
            <p className="my-2 ml-8">Address</p>
            {addresses.map((address, index) => (
              <div key={index}>
                <div className="flex flex-row items-center justify-between">
                  <div>
                    <p>{address.rendezvous}</p>
                    <p>
                      {address.city_Province}, {address.district}, {address.subDistrict}
                    </p>
                    {address.default ? (
                      <p className="border-1 border border-red-600 px-2 py-1 text-red-600">Default</p>
                    ) : (
                      ''
                    )}
                  </div>
                  <div>
                    <UpdateAddress addressId={address.addressId} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default AddressPage
