import { config } from 'dotenv'
import path from 'path'

export const NODE_DEV = process.env.NODE_ENV === 'development'

const env = config({
  path: path.resolve(process.cwd(), NODE_DEV ? '.env.dev' : '.env.prod'),
})?.parsed

// ---
// 腾讯云开发连接配置

export const TCB_ENVID = env?.TCB_ENVID || ''
export const TCB_SECRET_ID = env?.TCB_SECRET_ID || ''
export const TCB_SECRET_KEY = env?.TCB_SECRET_KEY || ''

// ---
// MYSQL连接配置

export const MYSQL_HOST = env?.MYSQL_HOST || ''
export const MYSQL_PORT = Number(env?.MYSQL_PORT) || 3306
export const MYSQL_DB = env?.MYSQL_DB || ''
export const MYSQL_USER = env?.MYSQL_USER || ''
export const MYSQL_PSWD = env?.MYSQL_PSWD || ''
