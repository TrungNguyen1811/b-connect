import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckIcon, SortAscIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getAllRole } from 'src/api/admin/get-role'
import { putUpdateRoleUser } from 'src/api/admin/update-role'
import { Button } from 'src/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from 'src/components/ui/command'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from 'src/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { toast } from 'src/components/ui/use-toast'
import { cn } from 'src/lib/utils'
import { IRole } from 'src/types'

interface UpdateRoleUser {
  userId: string
  roleId: string
}

interface Combobox {
  label: string
  value: string
}

function UpdateRoleUser({ userId }: { userId: string }) {
  const form = useForm<UpdateRoleUser>()
  const [role, setRole] = useState<IRole[]>()

  const roleList = useMemo(() => {
    if (!role) return []
    else
      return role.map<Combobox>((items) => ({
        label: items.roleName as string,
        value: items.roleId as string,
      }))
  }, [role])

  useEffect(() => {
    const fetchData = async () => {
      const roles = await getAllRole()
      setRole(roles)
    }
    fetchData()
  }, [])

  const queryClient = useQueryClient()
  const updateRole = useMutation((formData: IRole) => putUpdateRoleUser(formData), {
    onSuccess(formData) {
      if (formData === 'Successful!') {
        toast({
          title: 'Success',
          description: 'Update User Success!!!',
        })
      } else {
        toast({
          title: 'Failed',
          description: 'Update User Failed!!!',
        })
      }
      queryClient.invalidateQueries()
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Update User',
        description: error.message,
      })
    },
  })

  const onSubmit = (data: UpdateRoleUser) => {
    const formData: UpdateRoleUser = {
      ...data,
      userId: userId,
    }
    updateRole.mutate(formData)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Role</Button>
      </DialogTrigger>
      <DialogContent className="w-[30vw]">
        <DialogHeader>
          <DialogTitle>Update Role</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name={'roleId'}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Role</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn('w-[20vw] justify-between', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? roleList.find((role) => role.value === field.value)?.label : 'Select Role'}
                          <SortAscIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[20vw] p-0">
                      <Command>
                        <CommandInput placeholder="Search framework..." className="h-9" />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {roleList.map((role) => (
                            <CommandItem
                              value={role.label}
                              key={role.value}
                              onSelect={() => {
                                form.setValue('roleId', role.value)
                              }}
                            >
                              {role.label}
                              <CheckIcon
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  role.value === field.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>This is the roles that will be used in the system.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-4" type="submit">
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default UpdateRoleUser
