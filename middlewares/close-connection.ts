import { Context, Next } from 'koa'
import { closeConnection as close } from 'utils/sql'

/**
 * @description 路由级中间件：关闭 mysql 连接
 * @param ctx 
 * @param next 
 */
export const closeConnection = async (ctx: Context, next: Next) => {
  await next()
  close()
}