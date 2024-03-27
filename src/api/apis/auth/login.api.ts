import { AxiosError } from 'axios'
import { LoginSchema } from 'src/pages/(auth)/login/validation'
import { axiosClient } from 'src/lib/axios'
import { ITokenResponse } from 'src/types/token'
import { z } from 'zod'

type ILoginSchema = z.infer<typeof LoginSchema>
async function loginApi(
  { email: email, password }: ILoginSchema,
  callback: (error: AxiosError | null, result: string | null) => void,
) {
  return await axiosClient
    .post<ITokenResponse>(
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
        callback(null, err.data)
      }
    })
    .catch((error) => {
      callback(error, null)
    })
}

export { loginApi }
