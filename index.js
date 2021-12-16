const { app } = require('./app')
const serverless = require('serverless-http')

const handler = serverless(app)

// 云函数入口
exports.main = async (event, context) => {
  try {
    const res = await handler(event, context)
    return JSON.parse(res.body)
  } catch (err) {
    console.log('<====== 无效响应日志 =====>')
    console.log('❕❕注意：这里响应失效一般说明 serverless-http 或 koa 初始化失败了')
    console.log(err)
    console.log('<====== 无效响应结束 =====>')

    return {
      code: 500,
      message: '无法处理的响应',
    }
  }
}