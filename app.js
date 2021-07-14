// 声明并配置 Koa 应用
const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const { errors, restify } = require('./middlewares')
const { v1 } = require('./routes')
const { isDev } = require('./utils/utils')

const app = new Koa()

app.use(errors)

// 云函数环境下由腾讯云解析
if (isDev()) {
  app.use(bodyParser())
}

// 本地开发需要开启跨域访问
if (isDev()) {
  app.use(cors({
    origin: '*',
  }))
}

app.use(restify)

app.use(v1.routes())

module.exports = app