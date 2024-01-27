// import { changePasswordApi } from '@/apis/auth/apis/profile.api'
import { Button } from 'src/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog'
import { Input } from 'src/components/ui/input'
import { useToast } from 'src/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ChangePasswordSchema } from './validation-change-password'

type Props = React.HTMLAttributes<HTMLDivElement>

type FormData = z.infer<typeof ChangePasswordSchema>
function ChangePasswordModal({ children, ...props }: Props) {
  const [open, setOpen] = React.useState(false)
  const { register, handleSubmit, setError, formState } = useForm<FormData>({
    resolver: zodResolver(ChangePasswordSchema),
  })

  const [isLoading, setIsLoading] = React.useState(false)
  const { toast } = useToast()

  //   const handleChangePassword = useCallback(
  //     (oldPassowrd: string, newPassword: string) => {
  //       setIsLoading(true)
  //       changePasswordApi(oldPassowrd, newPassword, (err) => {
  //         if (err) {
  //           setError('password', {
  //             message: 'Old password is not correct',
  //           })
  //           setIsLoading(false)
  //           return
  //         }
  //         setIsLoading(false)

  //         toast({
  //           title: 'Change password success',
  //           variant: 'success',
  //         })

  //         setOpen(false)
  //       })

  //       return
  //     },
  //     [setError, toast],
  //   )

  //   const onSubmit = useCallback(
  //     (data: FormData) => {
  //       if (data.newPassword !== data.confirmPassword) {
  //         setError('confirmPassword', {
  //           message: 'Confirm password must match with new password',
  //         })

  //         return
  //       }

  //       if (data.password === data.newPassword) {
  //         setError('newPassword', {
  //           message: 'New password must be different from old password',
  //         })

  //         return
  //       }
  //       handleChangePassword(data.password, data.newPassword)
  //     },
  //     [handleChangePassword, setError],
  //   )

  return (
    <Dialog open={open} onOpenChange={setOpen} {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form>
          <DialogHeader>
            <DialogTitle>Change password</DialogTitle>
            <DialogDescription>
              Enter your current password and your new password to change your password.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Old Password
              </Label>
              <Input className="col-span-3" type="password" disabled={isLoading} {...register('password')} />
              {formState.errors.password && (
                <p className="col-span-full text-xs text-red-500">{formState.errors.password.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newPassword" className="text-right">
                New password
              </Label>
              <Input className="col-span-3" type="password" disabled={isLoading} {...register('newPassword')} />
              {formState.errors.newPassword && (
                <p className="col-span-full text-xs text-red-500">{formState.errors.newPassword.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirmPassword" className="text-right">
                Confirm new password
              </Label>
              <Input className="col-span-3" type="password" disabled={isLoading} {...register('confirmPassword')} />
              {formState.errors.confirmPassword && (
                <p className="col-span-full text-xs text-red-500">{formState.errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button disabled={isLoading} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePasswordModal
