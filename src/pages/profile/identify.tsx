import { zodResolver } from '@hookform/resolvers/zod'
import { format, isDate, parse } from 'date-fns'
import { Image, Loader2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { postCTCApi } from 'src/api/user/ctc'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Separator } from 'src/components/ui/separator'
import { useAuth } from 'src/hooks/useAuth'
import { ENUM_CITIZEN_ID_TYPE, ICTCBackSide, ICTCFrontSide } from 'src/types'
import { z } from 'zod'

const formCTCSchema = z.object({
  ctcId: z.string(),
  ctcName: z.string(),
  ctcDob: z.date(),
  ctcHome: z.string(),
  ctcAddress: z.string(),
  ctcSex: z.string(),
  ctcNationality: z.string(),
  ctcDoe: z.date(),
  features: z.string(),
  issueDate: z.date(),
  ctcType: z.nativeEnum(ENUM_CITIZEN_ID_TYPE),
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

      form.setValue('ctcId', fs.data[0].id)
      form.setValue('ctcName', fs.data[0].name)
      form.setValue('ctcHome', fs.data[0].home)
      form.setValue('ctcAddress', fs.data[0].address)
      form.setValue('ctcSex', fs.data[0].sex)
      form.setValue('ctcNationality', fs.data[0].nationality)
      form.setValue('ctcDoe', parse(fs.data[0].doe, 'dd/MM/yyyy', new Date()))
      // form.setValue('ctcType', fs.data[0].type_new!);
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
            name="ctcId"
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
            name="ctcName"
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
            name="ctcSex"
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
            name="ctcDob"
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
            name="ctcHome"
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
            name="ctcNationality"
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
            name="ctcDoe"
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

  return (
    <div className="w-[75vw] rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="px-8 py-2">
        <p className="text-xl">Identification Information</p>
        <p className="text-gray-500">Manage your identification information</p>
      </div>
      <Separator />
      {user?.isValidated ? (
        <div>{renderCTC}</div>
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
