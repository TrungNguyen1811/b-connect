import { zodResolver } from '@hookform/resolvers/zod'
import { format, isDate, parse } from 'date-fns'
import { Image, Loader2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { registerAccountValidates, updateNicData } from 'src/api/seller/set-is-account-validated'
import { profileApi } from 'src/api/apis/auth/profile.api'
import { getNICApi, postNICApi } from 'src/api/user/nic'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Separator } from 'src/components/ui/separator'
import { toast } from 'src/components/ui/use-toast'
import { useAuth } from 'src/hooks/useAuth'
import { ICTCBackSide, ICTCFrontSide, INIC } from 'src/types'
import { IToken } from 'src/types/token'
import { z } from 'zod'
import refreshToken from 'src/api/apis/auth/refresh.api'

const formCTCSchema = z.object({
  nicId: z.string(),
  nicName: z.string(),
  nicDob: z.date(),
  nicHome: z.string(),
  nicAddress: z.string(),
  nicSex: z.string(),
  nicNationality: z.string(),
  nicDoe: z.date(),
})

type FormData = z.infer<typeof formCTCSchema>
function IdentificationUser() {
  const { user, login } = useAuth()
  const form = useForm<FormData>({
    resolver: zodResolver(formCTCSchema),
    defaultValues: {},
  })
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [getNic, setNic] = useState<INIC>()
  useEffect(() => {
    const fetchData = async () => {
      const getNic = (await getNICApi()) as INIC
      setNic(getNic)
    }
    fetchData()
  }, [user])

  const [imageFS, setImageFS] = useState<File | null>(null)
  const [imageBS, setImageBS] = useState<File | null>(null)

  const isBothSide = useMemo(() => {
    return imageFS && imageBS
  }, [imageFS, imageBS])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImageFS(acceptedFiles[0])
  }, [])
  const onDropBS = useCallback((acceptedFiles: File[]) => {
    setImageBS(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const {
    getRootProps: getRootPropsBS,
    getInputProps: getInputPropsBS,
    isDragActive: isDragActiveBS,
  } = useDropzone({ onDrop: onDropBS })

  const renderCTCFS = useMemo(() => {
    if (imageFS)
      return (
        <div>
          <div>
            <img src={URL.createObjectURL(imageFS)} />
          </div>
        </div>
      )
    return isDragActive ? (
      <div className="h-32 w-32 border-dashed">Drop the files here ...</div>
    ) : (
      <div className="flex h-32 w-60 items-center justify-center rounded-lg border-2 border-dashed text-center text-xs">
        <div>Upload Front Side</div>
        <Image className="ml-2" />
      </div>
    )
  }, [imageFS, isDragActive])

  const renderCTCBS = useMemo(() => {
    if (imageBS)
      return (
        <div>
          <div>
            <img src={URL.createObjectURL(imageBS)} />
          </div>
        </div>
      )
    return isDragActiveBS ? (
      <div className="h-32 w-32 border-dashed">Drop the files here ...</div>
    ) : (
      <div className="flex h-32 w-60 items-center justify-center rounded-lg border-2 border-dashed text-center text-xs">
        <div>Upload Back Side</div>
        <Image className="ml-2" />
      </div>
    )
  }, [imageBS, isDragActiveBS])

  const postCTC = useCallback(async () => {
    if (imageFS === null || imageBS === null) {
      return // Or return an error, or handle the scenario differently
    }

    const formDataFS = new FormData()
    const formDataBS = new FormData()
    formDataFS.append('image', imageFS)
    formDataBS.append('image', imageBS)

    try {
      const [fs, bs] = await Promise.all([postNICApi<ICTCFrontSide>(formDataFS), postNICApi<ICTCBackSide>(formDataBS)])

      form.setValue('nicId', fs.data[0].id)
      form.setValue('nicName', fs.data[0].name)
      form.setValue('nicHome', fs.data[0].home)
      form.setValue('nicAddress', fs.data[0].address)
      form.setValue('nicSex', fs.data[0].sex)
      form.setValue('nicNationality', fs.data[0].nationality)
      form.setValue('nicDob', parse(fs.data[0].dob, 'dd/MM/yyyy', new Date()))
      form.setValue('nicDoe', parse(fs.data[0].doe, 'dd/MM/yyyy', new Date()))

      // Return a value here if needed
    } catch (error) {
      console.error('Error:', error)
      // Handle the error if needed
    }
  }, [imageFS, imageBS, form])

  useEffect(() => {
    if (!isBothSide) return
    postCTC()
  }, [postCTC, isBothSide])

  const renderCTC = useMemo(() => {
    if (!isBothSide) return null
    return (
      <div className="flex flex-row">
        <div className="mr-8">
          <FormField
            control={form.control}
            name="nicId"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Citizen ID </FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nicName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nicSex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sex</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nicDob"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Date of Birth </FormLabel>
                <FormControl>
                  <Input disabled {...field} value={isDate(field.value) ? format(field.value, 'dd/MM/yyyy') : ''} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="nicHome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nicAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nicNationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nicDoe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of End</FormLabel>
                <FormControl>
                  <Input disabled {...field} value={isDate(field.value) ? format(field.value, 'dd/MM/yyyy') : ''} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    )
  }, [form.control, isBothSide])
  console.log('đâ', user)

  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setIsLoading(true)
    const formData = {
      ...data,
      userId: user?.userId as string,
    }
    let token: IToken
    if (isUpdate === true) {
      await updateNicData(formData, async (err, result) => {
        if (err) {
          toast({
            title: 'Error',
            description: err.message,
            variant: 'destructive',
          })
          return err.message
        }
        toast({
          title: 'Success',
          description: 'Register CTC successfully',
          variant: 'success',
        })
        const data = await refreshToken()
        token = { accessToken: data.accessToken }
        await profileApi(token.accessToken, (err, user) => {
          if (err) {
            toast({
              title: err.message,
              description: err.cause?.message,
              variant: 'destructive',
            })
          } else {
            if (!user) {
              return
            }
            login({
              user,
              token,
            })
          }
        })
        return result
      })
    } else {
      await registerAccountValidates(formData, async (err, result) => {
        if (err) {
          toast({
            title: 'Error',
            description: err.message,
            variant: 'destructive',
          })
          return err.message
        }
        toast({
          title: 'Success',
          description: 'Register CTC successfully',
          variant: 'success',
        })
        const data = await refreshToken()
        token = { accessToken: data.accessToken }
        await profileApi(token.accessToken, (err, user) => {
          if (err) {
            toast({
              title: err.message,
              description: err.cause?.message,
              variant: 'destructive',
            })
          } else {
            if (!user) {
              return
            }
            login({
              user,
              token,
            })
          }
        })
        return result
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    form.formState.errors && console.log(form.formState.errors)
  }, [form.formState.errors])

  const resetForm = () => {
    form.reset()
    setImageFS(null)
    setImageBS(null)
  }

  const Result = () => {
    return (
      <div>
        <div className=" mx-8 flex flex-row items-center justify-between">
          <p className="p-4 text-2xl">Identification Information</p>
          <Button onClick={() => setIsUpdate(true)}>Change NIC</Button>
        </div>
        <div className="flex h-96 flex-row">
          <div className="ml-16">
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
      </div>
    )
  }
  console.log('va', user)
  return (
    <div className="w-[75vw] rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-row items-center justify-between">
        <div className="px-8 py-2">
          <p className="text-xl">Identification Information</p>
          <p className="text-gray-500">Manage your identification information</p>
        </div>
        <Button type="button" onClick={resetForm} className="mr-4 w-32">
          Reset
        </Button>
      </div>
      <Separator />
      {user?.isValidated && isUpdate == false ? (
        <div>
          <Result />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-16 flex flex-col">
            <div className="flex flex-row items-center justify-around">
              <div className="">
                <div className="font-semibold">Upload CTC Front Side</div>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {renderCTCFS}
                </div>
              </div>
              <div>
                <div className="font-semibold">Upload CTC Back Side</div>
                <div {...getRootPropsBS()}>
                  <input {...getInputPropsBS()} />
                  {renderCTCBS}
                </div>
              </div>
              <div className="7/12 caret-lime-200">{renderCTC}</div>
            </div>

            <div className="mr-8 flex flex-row justify-end gap-4">
              <Button onClick={() => setIsUpdate(false)} className="my-6 w-24">
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit" className="my-6 w-24">
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Register
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
export default IdentificationUser
