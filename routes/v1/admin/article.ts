import Router from '@koa/router'
import { adminGuard } from 'middlewares'
import { getDatabase } from 'utils/cloudbase'
import { DB } from 'utils/db'
import { respond } from 'utils/helper'

const article = new Router({
  prefix: '/article',
}).use(adminGuard)

article.get('/', async (ctx) => {
  const resp = await getDatabase()
    .collection(DB.article_menu)
    .get()

  if (resp.data) {
    respond.ok(ctx, resp.data)
  } else {
    respond.fail(400, '无法获取菜单')
  }
})

export { article }