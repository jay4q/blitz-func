import { Context, Next } from 'koa'
import { NODE_DEV } from 'utils/config'

/**
 * @description 全局中间件：输出云函数日志
 * @param ctx 
 * @param next 
 */
export const logger = async (ctx: Context, next: Next) => {
  if (!NODE_DEV) {
    console.log('<====== 云函数入参 =====>')
    console.log((ctx.req as any).apiGateway.event)
    console.log('<=====================>')
  }

  await next()
}