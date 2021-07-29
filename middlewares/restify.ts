import { Context, Next } from 'koa'
import { NODE_DEV } from 'utils/config'
import { respond } from 'utils/helper'

/**
 * 全局中间件：将云函数的 http 集成请求 转换为正常的 http 请求
 * 因此在客户端使用 callFunction 时，应当遵守 https://docs.cloudbase.net/service/access-cloud-function.html 集成请求的格式
 * @param ctx 
 * @param next 
 */
export const restify = async (ctx: Context, next: Next) => {
  if (!NODE_DEV) {
    const event = (ctx.req as any).apiGateway.event

    if (!event) respond.fail(400, '请求内容有误')

    if (!!event.body) ctx.request.body = JSON.parse(event.body)

    ctx.url = event.path
    ctx.request.method = event.httpMethod
    ctx.request.query = event.queryStringParameters
    ctx.request.header = event.headers
  }

  await next()
}