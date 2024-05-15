import { ITradeDetail } from 'src/api/blog/interested'
import { ITradeStatus } from 'src/pages/blog/submit-trade'
import { ScrollArea } from '../ui/scroll-area'

function CardInfoTrade({ userTrade }: { userTrade: ITradeDetail }) {
  const renderForm = (string: string, name: string) => {
    return (
      <div className="flex flex-row items-center justify-between">
        <div>
          <p className="text-gray-400">{string}</p>
        </div>
        <p>{name ? name : 'null'}</p>
      </div>
    )
  }
  return (
    <div className="my-2 w-full rounded-xl border px-4 pb-2 pt-2">
      <p className="mb-2 text-lg font-semibold">Information</p>
      <ScrollArea className="h-44">
        {renderForm('IsPostOwner', userTrade?.details.isPostOwner ? 'True' : 'False')}
        {renderForm('Status', ITradeStatus[userTrade?.details.status as keyof typeof ITradeStatus])}
        {renderForm('Address', userTrade?.address as string)}
        {renderForm('Phone', userTrade?.details.phone)}
        {renderForm('Note', userTrade?.details.note)}
      </ScrollArea>
    </div>
  )
}
export default CardInfoTrade
