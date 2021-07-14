import Router from '@koa/router'
import { user } from './user'

const admin = new Router({
  prefix: '/admin'
})

admin.use(user.routes())

export { admin }