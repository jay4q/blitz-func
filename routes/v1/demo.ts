import Router from '@koa/router'
import { Context } from 'koa'
import { respond } from 'utils/helper'

const router = new Router({
  prefix: '/demo',
})

router.get('/success', async (ctx: Context) => {
  respond.ok(ctx, '成功了🎉🎉🎉')
})

router.get('/error', async (ctx: Context) => {
  respond.fail(400, '出错了😭😭😭')
})

router.post('/post', async (ctx: Context) => {
  respond.ok(ctx, ctx.request.body)
})

export default router