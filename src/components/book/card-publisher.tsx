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
              src={
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA0CAMAAADomgtXAAAAn1BMVEX////NAAz+///9/f3LAAAAAADQMTTh4eHIAACvr693d3fo6OjV1dXMzMzIyMhzc3OSkpKmpqb14t739/eZmZmHh4fw8PBqampYWFh+fn701dbtu7z34eLijo/57urUQUPaa2nghIXxxsa/v79MTEw+Pj7lnZ3WT1Hed3jQJSXcb3HXW1rVR0HopqPgjIfPGxvnrqsREREqKiocHBwzMzMlHLkCAAADOUlEQVRIia2V65aiSBCEw6oEihFtEBUFBUUUGbww3b7/s20W6Dh7GhjXsyE/EPjIyEsVwP+oMHwTPGzfBHN6j5NEh+gdMKWB0mC8WsX/hYuOxCEPOSniI1mvXgWZKxilQS2Gk/Q18CeV8Z3SIB+q9F8CTzT5DdK5CftCZ1cUnx4cG5Yb7foF0qcCv51uL5VYrS+JJv9Wo4SOiK8NSRsBKVDpf3Tt5yqiaEKn9Z1UQmCtmvP+OWRTGw6U3sEc4eN8oPqmodLZ5BDhHTxfVBE+OtoXMiE65oqzVI+yDujZmm6Oy0mRKFWJ5wQ81dMSTodWAkdVFm3goRM8MCi5kBfVwg24UV3aEp0gpcRZUYvyTpAXxlGDElFhflPRDa6JKiHZLNv9rqobPPMwi6ek0NGliKKQz3DpzjHl1SBi1YiUjs5XQ6WHRqI8d4K+MoWIJ1qxWddJHMyc94M8KYVQPQsk59rULhFp1wyG6YUoTdMVz2w3x15FnZeQur6x4E19UtAa+l2n7v6zqGrawWHWCcFUuqGiDq1kHxiqWD+lh5yu7M7UC7TuEHWXptbRhOAC6kEp4p90zSmBvrJJ+jnALAVSRbG/4W1Rb1eDnDfWLfUa1ZJFLkMuokDsQ6a1xJFe+RiUeuHp0or78E2u5ks7MiqVMNqMHWMb1duIf9k9cBurcDIJoy2p7V/C7Zw/HwjXua5Msv3zizPk33eNDGs6G7bdqTWfw7MXo5Y71i+MHXwuHO+btbntI/AtF+64DfyCDXzYMPiu+3z1GLZv2HAwG8HqAPnyDxvZFEODQdfecdelbUvsMwZvQ0inDfwcyxqcBZwv5+oFQ4MtYLaDa8wtGPP27K3PzK9B++sOfiAbOUs4HO6Xx2A7B8swdjU4MhrQ/sDSc23MDTjuTYOS47aANzeoQWdvORpky+50MYbP4JBfanDqbqtVx2jA5UxqcHmzptOsBke4LXSO+9Y+fsFwaqu2gdrqDyztxR2cZvpaF5jNatAJcC/OwnI9XZwRhnsETjvIRj0DgYfxfPoAv2AFPGnY6baMpri1gV7mzLLx4mO0hGXtPU43mHERvZ2LYaAHCK63eG1dNvJbT9/XP0cxO2PoWf11AAAAAElFTkSuQmCC'
              }
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
