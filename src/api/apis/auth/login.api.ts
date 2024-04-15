import { AxiosError } from 'axios'
import { LoginSchema } from 'src/pages/(auth)/login/validation'
import { axiosClient } from 'src/lib/axios'
import { IToken } from 'src/types/token'
import { z } from 'zod'

type ILoginSchema = z.infer<typeof LoginSchema>
async function loginApi(
  { email: email, password }: ILoginSchema,
  callback: (error: AxiosError | null, result: IToken | null) => void,
) {
  return await axiosClient
    .post(
      'Account/SignIn',
      {
        email: email,
        password: password,
      },
      {
        withCredentials: false,
      },
    )
    .then((err) => {
      if (err.status === 200) {
        const token: IToken = {
          accessToken: err.data,
        }
        callback(null, token)
      }
    })
    .catch((error) => {
      callback(error, null)
    })
}

export { loginApi }
