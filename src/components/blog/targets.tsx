import { Dialog, DialogContent, DialogHeader, DialogTrigger } from 'src/components/ui/dialog'
import { Button } from '../ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import { useCallback, useMemo, useRef, useState } from 'react'
import { ReactTags, Tag } from 'react-tag-autocomplete'
import { postAddBookCheckList } from 'src/api/blog/interested'

interface Props {
  tradeDetailsId: string
}
interface Options {
  readonly value: string
  readonly label: string
}

function TargetsTrade({ tradeDetailsId }: Props) {
  const reactTags = useRef(null)
  const [selected, setSelected] = useState<Tag[]>([])
  const [options, setOptions] = useState<Options[]>([])
  const queryClient = useQueryClient()
  const listTags = useMemo(() => {
    if (!selected) return
    else return selected.map((ct) => ct.label)
  }, [selected])

  const onAdd = useCallback(
    (newTag: Tag) => {
      setSelected([...selected, newTag])
    },
    [selected],
  )

  const onDelete = useCallback(
    (tagIndex: number) => {
      setSelected(selected.filter((_, i) => i !== tagIndex))
    },
    [selected],
  )

  const postTarget = useMutation((data: { targets: string[]; tradeDetailsId: string }) => postAddBookCheckList(data), {
    onSuccess: (status) => {
      if (status === 200) {
        console.log('Successful!!!')
        toast({
          title: 'Successful!!!',
          description: 'Add Target Success!',
        })
        queryClient.invalidateQueries()
      } else {
        toast({
          title: 'Invalid Target response',
          description: 'No Target in the response.',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Submitting Target',
        description: error.message,
      })
    },
  })
  const onSubmitTarget = async () => {
    const data = {
      targets: listTags!,
      tradeDetailsId: tradeDetailsId as string,
    }
    postTarget.mutate(data)
  }
  return (
    <Dialog>
      <DialogTrigger className="flex">
        <Button>Targets</Button>
      </DialogTrigger>
      <DialogContent className="h-[12rem] w-[36rem]">
        <DialogHeader className="font-semibold">Add 3 targets that require book review</DialogHeader>
        <ReactTags
          labelText="Add to 3 targets"
          selected={selected}
          suggestions={options}
          onAdd={onAdd}
          onDelete={onDelete}
          noOptionsText="No matching target"
          delimiterKeys={[',', 'Enter']}
          allowNew={true}
          ref={reactTags}
        />
        <div className="flex flex-row justify-between">
          <Button onClick={() => onSubmitTarget()}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default TargetsTrade
