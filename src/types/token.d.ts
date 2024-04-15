import { IResponse } from '@/types'

export type IToken = {
  tokenType?: string
  expiresIn?: number
  accessToken: string
  refreshToken?: string | undefined
}

export interface refreshTokenData {
  refreshToken: string
  expires: Date
  path: string
}

export type ITokenResponse = IResponse<IToken>
