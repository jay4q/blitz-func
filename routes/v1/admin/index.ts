import Router from '@koa/router'
import { user } from './user'
import { article } from './article'

const admin = new Router({
  prefix: '/admin'
})

// 管理员模块
admin.use(user.routes())
// 文章模块
admin.use(article.routes())

export { admin }