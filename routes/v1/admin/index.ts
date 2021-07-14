import Router from '@koa/router'
import user from './user'

const router = new Router({
  prefix: '/admin'
})

router.use(user.routes())

export default router