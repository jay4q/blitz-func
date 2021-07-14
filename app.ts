import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { errors, restify } from 'middlewares'
import { NODE_DEV } from 'utils/config'
import v1 from 'routes'

const app = new Koa()

app.use(errors)

// 云函数环境下由腾讯云解析即可
if (NODE_DEV) {
  app.use(bodyParser())
}

// 本地开发需要开启跨域访问
if (NODE_DEV) {
  app.use(cors({
    origin: '*',
  }))
}

app.use(restify)

// 使用路由
app.use(v1.routes())

export { app }