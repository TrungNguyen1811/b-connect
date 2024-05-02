import { Link } from 'react-router-dom'
import { Card, CardContent } from '../ui/card'
import { User } from 'src/types/user'
import React from 'react'

type Props = { user: User }

function Publisher({ user }: Props) {
  const renderPublisher = React.useMemo(() => {
    // if (user?.roles === 'Seller') {
    return (
      <Link to={'/'} key={user.userId}>
        <Card className="my-0.5 w-36">
          <CardContent className="aspect-[7/7] flex-col overflow-clip rounded-md border border-gray-200 p-0 shadow-md transition-all duration-300 group-hover:shadow-xl">
            <img
              src={user.agencies?.[0].logoUrl}
              alt={user.username}
              className="m-5 aspect-[7/7] object-contain transition-all duration-300 hover:scale-105"
              width={100}
            />
          </CardContent>
        </Card>
      </Link>
    )
    // } else {
    //   return null // You need to provide a return value for the case where user.role !== 'SELLER'
    // }
  }, [user.userId, user.username])

  return <div>{renderPublisher}</div>
}

export default Publisher
