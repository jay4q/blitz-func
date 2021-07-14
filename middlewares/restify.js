const { isDev, respond } = require('../utils/utils')

/**
 * 云函数专属，将云函数HTTP集成请求，转换为一般的 restful 请求
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports = async (ctx, next) => {
  // 将云函数的 http 集成请求 转换为正常的 http 请求
  // 也就是说，客户端使用 callFunction 时，应当遵守 https://docs.cloudbase.net/service/access-cloud-function.html 集成请求的格式
  if (!isDev()) {
    const event = ctx.req.apiGateway.event

    if (!event) respond.fail({ code: 400, message: '请求内容有误' })

    if (!!event.body) ctx.request.body = JSON.parse(event.body)

    ctx.url = event.path
    ctx.request.method = event.httpMethod
    ctx.request.query = event.queryStringParameters
    ctx.request.header = event.headers
  }

  await next()
}