import { zodResolver } from '@hookform/resolvers/zod'
import { format, isDate, parse } from 'date-fns'
import { Image, Loader2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { postCTCApi } from 'src/api/user/nic'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Separator } from 'src/components/ui/separator'
import { useAuth } from 'src/hooks/useAuth'
import { ENUM_CITIZEN_ID_TYPE, ICTCBackSide, ICTCFrontSide } from 'src/types'
import { z } from 'zod'

const formCTCSchema = z.object({
  nicId: z.string(),
  nicName: z.string(),
  nicDob: z.date(),
  nicHome: z.string(),
  nicAddress: z.string(),
  nicSex: z.string(),
  nicNationality: z.string(),
  nicDoe: z.date(),
  features: z.string(),
  issueDate: z.date(),
  nicType: z.nativeEnum(ENUM_CITIZEN_ID_TYPE),
})

type FormData = z.infer<typeof formCTCSchema>
function IdentificationUser() {
  const { user } = useAuth()
  const form = useForm<FormData>({
    resolver: zodResolver(formCTCSchema),
    defaultValues: {},
  })

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
      const [fs, bs] = await Promise.all([postCTCApi<ICTCFrontSide>(formDataFS), postCTCApi<ICTCBackSide>(formDataBS)])

      form.setValue('nicId', fs.data[0].id)
      form.setValue('nicName', fs.data[0].name)
      form.setValue('nicHome', fs.data[0].home)
      form.setValue('nicAddress', fs.data[0].address)
      form.setValue('nicSex', fs.data[0].sex)
      form.setValue('nicNationality', fs.data[0].nationality)
      form.setValue('nicDoe', parse(fs.data[0].doe, 'dd/MM/yyyy', new Date()))
      // form.setValue('nicType', fs.data[0].type_new!);
      form.setValue('features', bs.data[0].features)
      form.setValue('issueDate', parse(bs.data[0].issue_date, 'dd/MM/yyyy', new Date()))

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

  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    // await signUpApi(data, (err) => {
    //   if (err) {
    //     toast({
    //       title: 'Error',
    //       description: err.response?.data.message,
    //       variant: 'destructive',
    //     })
    //     return
    //   }
    //   toast({
    //     title: 'Success',
    //     description: 'Register successfully',
    //     variant: 'success',
    //   })
    // })
    setIsLoading(false)
  }

  useEffect(() => {
    form.formState.errors && console.log(form.formState.errors)
  }, [form.formState.errors])

  const Result = () => {
    return (
      <div>
        <div className=" flex flex-row items-center justify-between">
          <p className="p-4 text-2xl">Identification Information</p>
        </div>
        <div className="flex h-96 flex-row">
          <div className="ml-8">
            <p>ID: {user?.nicId}</p>
            <p>NAME: {user?.nicName}</p>
            <p>SEX: {user?.nicSex}3</p>
            <p>DATE OF BIRTH: {user?.nicDob}</p>
            <p>ADDRESS{user?.nicAddress}</p>
            <p>HOME: {user?.nicHome}</p>
            <p>NATIONALITY: {user?.nicNationality}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[75vw] rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="px-8 py-2">
        <p className="text-xl">Identification Information</p>
        <p className="text-gray-500">Manage your identification information</p>
      </div>
      <Separator />
      {user?.isValidated ? (
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

            <Button disabled={isLoading} type="submit" className="my-6 ml-[48rem] w-32">
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Register
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}
export default IdentificationUser
