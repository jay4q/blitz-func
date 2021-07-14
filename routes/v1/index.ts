import Router from '@koa/router'
import demo from './demo'
import admin from './admin'
import client from './client'

const v1 = new Router({
  prefix: '/v1'
})

v1.use(demo.routes())
// 管理端接口
v1.use(admin.routes())
// 客户端接口
v1.use(client.routes())

export default v1