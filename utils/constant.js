const path = require('path')
const { config } = require('dotenv')
const { isDev } = require('./utils')

const env = config({
  path: path.resolve(process.cwd(), isDev() ? '.env.local' : '.env.prod')
}).parsed || {}

exports.HEADER_AUTH = 'dlj-api-auth'

exports.REQUEST_UID = 'dlj-admin-uid'

exports.TCB_ENVID = env.TCB_ENVID || ''
exports.TCB_SECRET_ID = env.TCB_SECRET_ID || ''
exports.TCB_SECRET_KEY = env.TCB_SECRET_KEY || ''
exports.TCB_TOKEN_SECRET = env.TCB_TOKEN_SECRET || ''