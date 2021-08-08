import Router from '@koa/router'
import { user } from './user'
import { article } from './article'
import { adminUser } from './admin-user'

const admin = new Router({
  prefix: '/admin'
})

// 管理员模块
admin.use(user.routes())
// 管理管理员模块
admin.use(adminUser.routes())
// 文章模块
admin.use(article.routes())

export { admin }