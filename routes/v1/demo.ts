import Router from '@koa/router'
import { Context } from 'koa'
import { TCB_ENVID } from 'utils/config'
import { respond } from 'utils/helper'

const demo = new Router({
  prefix: '/demo',
})

demo.get('/success', async (ctx: Context) => {
  respond.ok(ctx, `π ζεοΌθΏθ‘ε¨γ${TCB_ENVID}γη―ε’`)
})

demo.get('/error', async (ctx: Context) => {
  respond.fail(400, 'π­ εΊιδΊ')
})

demo.post('/post', async (ctx: Context) => {
  respond.ok(ctx, ctx.request.body)
})

export { demo }
