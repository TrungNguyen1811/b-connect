import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNICApi } from 'src/api/user/nic'
import { Separator } from 'src/components/ui/separator'
import { INIC } from 'src/types/user'

function IdentificationProfile() {
  const [getNic, setNic] = useState<INIC>()
  useEffect(() => {
    const fetchData = async () => {
      const getNic = (await getNICApi()) as INIC
      setNic(getNic)
    }
    fetchData()
  }, [])

  const Result = () => {
    return (
      <div className="flex flex-row">
        <div className="mr-8">
          <div className="flex flex-row">
            <p className="w-36">ID:</p>
            <p>{getNic?.id}</p>
          </div>
          <div className="flex flex-row">
            <p className="w-36">NAME: </p>
            <p>{getNic?.name}</p>
          </div>
          <div className="flex flex-row">
            <p className="w-36">SEX: </p>
            <p>{getNic?.sex}</p>
          </div>
          <div className="flex flex-row">
            <p className="w-36">DATE OF BIRTH: </p>
            <p>{getNic?.doB}</p>
          </div>
          <div className="flex flex-row">
            <p className="w-36">ADDRESS: </p>
            <p>{getNic?.address}</p>
          </div>
          <div className="flex flex-row">
            <p className="w-36">HOME: </p>
            <p>{getNic?.home}</p>
          </div>
          <div className="flex flex-row">
            <p className="w-36">NATIONALITY: </p>
            <p>{getNic?.nationality}</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="mx-24 my-12 ">
      <div className="rounded-md border-2">
        <div className="flex flex-col items-start p-4">
          <p className="text-2xl font-bold">Profile Shop</p>
          <p className="text-sm font-light">View Shop status and update your Shop profile</p>
        </div>
        <div className="flex flex-row">
          <Link to={'/seller/profile'}>
            <div className="py-4 pb-0  font-semibold">
              <p className="ml-8 pb-0">Information</p>
            </div>
          </Link>
          <Link to={'/seller/profile/identity-information'}>
            <div className="p-4 pb-0 font-semibold  text-orange-400">
              <p className="underline-animation h-10 px-4 pb-0 ">Identification Information</p>
            </div>
          </Link>
        </div>
        <Separator className="mt-0 p-0" />
        <div className="mb-8 w-[61rem]">
          <div className=" flex flex-row items-center justify-between">
            <p className="p-4 text-2xl">Identification Information</p>
          </div>
          <div className="ml-16 flex flex-col">
            <div>
              <Result />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default IdentificationProfile
