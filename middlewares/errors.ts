import { TokenExpiredError } from 'jsonwebtoken'
import { Context, Next } from 'koa'
import { BusinessError } from 'utils/helper'

/**
 * 统一的异常处理中间件
 * @param ctx 
 * @param next 
 */
export const errors = async (ctx: Context, next: Next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof BusinessError || err.name === 'BusinessError') {
      // 业务异常处理
      ctx.status = typeof err.code === 'number'
        ? (err.code >= 600 || err.code < 200 ? err.code : 200) : 200

      ctx.body = {
        code: err.code,
        data: err.data,
        message: err.message,
      }
    } else if (err instanceof TokenExpiredError) {
      // 令牌过期，告知前端重新登录
      ctx.status = 200
      ctx.body = {
        code: 401,
        message: '登录已失效，请重新登录'
      }
    } else {
      console.error('<====== 异常响应日志 =====>')
      console.error(ctx.request)
      console.error(err)
      console.error('<====== 异常响应结束 =====>')

      // 所有未业务化的异常
      ctx.status = 200
      ctx.body = {
        code: 500,
        message: err.message || '未知异常，请稍后再试'
      }
    }
  }
}
