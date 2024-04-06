import { AxiosError } from 'axios'
import { z } from 'zod'
import { axiosClient } from '../../../lib/axios'
import { RegisterSchema } from '../../../pages/(auth)/register/validation'
import { IErrorResponse } from 'src/types/response'
type ISignup = z.infer<typeof RegisterSchema>
async function signUpApi(data: ISignup, callback: (error: AxiosError<IErrorResponse> | null) => void) {
  return await axiosClient
    // .post('http://bconnect-apis.gvhcdxe3bwcehwgv.southeastasia.azurecontainer.io/api/Account/SignUp', {
    .post('/Account/SignUp', {
      ...data,
    })
    .then((err) => {
      if (err.status === 200) {
        callback(null)
      }
    })
    .catch((error) => {
      callback(error)
    })
}

export { signUpApi }
