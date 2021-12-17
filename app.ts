import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { errors, logger, restify } from 'middlewares'
import { NODE_DEV } from 'utils/config'
import { v1 } from 'routes'

const app = new Koa()

app
  .use(logger)
  .use(errors)

if (NODE_DEV) {
  app
    .use(bodyParser())  // 云函数环境下由腾讯云解析即可
    .use(cors({ origin: '*' })) // 本地开发开启跨域访问
}

app
  .use(restify)
  .use(v1.routes())

export { app }