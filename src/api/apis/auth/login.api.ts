import { AxiosError } from 'axios'
import { LoginSchema } from 'src/pages/(auth)/login/validation'
import { axiosClient } from 'src/lib/axios'
import { IToken, ITokenResponse } from 'src/types/token'
import { z } from 'zod'

type ILoginSchema = z.infer<typeof LoginSchema>
async function loginApi(
  { username: username, password }: ILoginSchema,
  callback: (error: AxiosError | null, result: IToken | null) => void,
) {
  return await axiosClient
    .post<ITokenResponse>(
      '/auth/login',
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
      },
    )
    .then((err) => {
      if (err.status === 200) {
        callback(null, err.data.data)
      }
    })
    .catch((error) => {
      callback(error, null)
    })
}

export { loginApi }
