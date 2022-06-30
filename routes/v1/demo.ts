import Router from '@koa/router'
import { Context } from 'koa'
import { TCB_ENVID } from 'utils/config'
import { respond } from 'utils/helper'

const demo = new Router({
  prefix: '/demo',
})

demo.get('/success', async (ctx: Context) => {
  respond.ok(ctx, `🎉 成功，运行在【${TCB_ENVID}】环境`)
})

demo.get('/error', async (ctx: Context) => {
  respond.fail(400, '😭 出错了')
})

demo.post('/post', async (ctx: Context) => {
  respond.ok(ctx, ctx.request.body)
})

export { demo }
