import path from 'path'
import { config } from 'dotenv'

export const NODE_DEV = process.env.NODE_ENV === 'development'

export const REQUEST_HEADER_ADMIN_AUTH = 'blitz-api-admin-auth'
export const REQUEST_ADMIN_UID = 'blitz-admin-uid'
export const REQUEST_ADMIN_ROLES = 'blitz-admin-roles'

const env = config({
  path: path.resolve(process.cwd(), NODE_DEV ? '.env.local' : '.env.prod')
})?.parsed

export const TCB_ENVID = env?.TCB_ENVID || ''
export const TCB_SECRET_ID = env?.TCB_SECRET_ID || ''
export const TCB_SECRET_KEY = env?.TCB_SECRET_KEY || ''
export const TCB_TOKEN_SECRET = env?.TCB_TOKEN_SECRET || ''

export const MYSQL_HOST = env?.MYSQL_HOST || ''
export const MYSQL_PORT = Number(env?.MYSQL_PORT) || 3306
export const MYSQL_DB = env?.MYSQL_DB || ''
export const MYSQL_USER = env?.MYSQL_USER || ''
export const MYSQL_PSWD = env?.MYSQL_PSWD || ''