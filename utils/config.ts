import path from 'path'
import { config } from 'dotenv'

export const NODE_DEV = process.env.NODE_ENV === 'development'

export const REQUEST_HEADER_AUTH = 'dlj-api-auth'
export const REQUEST_UID = 'dlj-admin-uid'

const env = config({
  path: path.resolve(process.cwd(), NODE_DEV ? '.env.local' : '.env.prod')
})?.parsed

export const TCB_ENVID = env?.TCB_ENVID || ''
export const TCB_SECRET_ID = env?.TCB_SECRET_ID || ''
export const TCB_SECRET_KEY = env?.TCB_SECRET_KEY || ''
export const TCB_TOKEN_SECRET = env?.TCB_TOKEN_SECRET || ''
