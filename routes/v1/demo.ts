import Router from '@koa/router'
import { Context } from 'koa'
import { getConnection } from 'utils/sql'
import { respond } from 'utils/helper'
import { closeConnection } from 'middlewares'

const demo = new Router({
  prefix: '/demo',
})

demo.get('/success', async (ctx: Context) => {
  respond.ok(ctx, '成功了🎉🎉🎉')
})

demo.get('/error', async (ctx: Context) => {
  respond.fail(400, '出错了😭😭😭')
})

demo.post('/post', async (ctx: Context) => {
  respond.ok(ctx, ctx.request.body)
})

demo.get('/db', closeConnection, async (ctx: Context) => {
  const resp = await getConnection().query('SELECT username,avatar FROM user')
  respond.ok(ctx, resp)
})

export { demo }