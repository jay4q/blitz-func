import { Context, Next } from 'koa'
import { BusinessError } from 'utils/helper'

/**
 * @description 全局中间件：异常处理中间件
 * @param ctx 
 * @param next 
 */
export const errors = async (ctx: Context, next: Next) => {
  try {
    await next()
    if (ctx.status === 404) {
      ctx.body = {
        code: 404,
        message: '找不到相关资源'
      }
    }
  } catch (err: any) {
    // 不通过 HTTP 状态码，而是通过自定义状态码处理异常行为
    ctx.status = 200

    if (err instanceof BusinessError || err.name === 'BusinessError') {
      // 一般的业务异常
      ctx.body = {
        code: err.code,
        data: err.data,
        message: err.message,
      }
    } else {
      console.log('<====== 异常响应日志 =====>')
      console.log('❌ 异常如下')
      console.log(err)
      console.log('<====== 异常响应结束 =====>')

      // 所有未业务化的异常
      ctx.body = {
        code: 500,
        message: err.message || '未知异常，请稍后再试'
      }
    }
  }
}
