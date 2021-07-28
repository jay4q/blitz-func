import { Context, Next } from 'koa'
import { closeConnection as close } from 'utils/sql'

/**
 * 关闭 mysql 连接
 * @description 路由级中间件，务必在每个使用到 mysql 的路由函数后调用
 * @param ctx 
 * @param next 
 */
export const closeConnection = async (ctx: Context, next: Next) => {
  await next()
  close()
}