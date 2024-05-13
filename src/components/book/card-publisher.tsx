import { Link } from 'react-router-dom'
import { Card, CardContent } from '../ui/card'
import React from 'react'
import { IAgency } from 'src/types/agency'

type Props = { seller: IAgency }

function Publisher({ seller }: Props) {
  const renderPublisher = React.useMemo(() => {
    return (
      <Link to={`/shop/${seller.agencyId}`} key={seller.agencyId}>
        <Card className="my-0.5 w-36">
          <CardContent className="aspect-[7/7] flex-col overflow-clip rounded-md border border-gray-400 p-0 shadow-md transition-all duration-300 group-hover:shadow-xl">
            <img
              src={seller.logoImg as string}
              alt={seller.agencyName}
              className="m-5 aspect-[7/7] object-contain transition-all duration-300 hover:scale-105"
              width={100}
            />
          </CardContent>
        </Card>
      </Link>
    )
  }, [seller])

  return <div>{renderPublisher}</div>
}

export default Publisher
