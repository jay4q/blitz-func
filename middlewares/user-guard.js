const jwt = require('jsonwebtoken')
const { respond } = require('../utils/utils')
const { HEADER_AUTH, REQUEST_UID, TCB_TOKEN_SECRET } = require('../utils/constant')
const { getDatabase } = require('../utils/cloudbase')
const { USER_ADMIN } = require('../utils/db')

/**
 * 检测管理端用户是否登录，如果未登录或过期，则被踢出
 * @param {*} ctx 
 * @param {*} next 
 */
module.exports = async (ctx, next) => {
  const token = ctx.get(HEADER_AUTH)

  if (!token) respond.fail({ code: 401, message: '您尚未登录，请先登录' })

  const tokenInfo = jwt.verify(token, TCB_TOKEN_SECRET)
  if (!tokenInfo[REQUEST_UID]) respond.fail({ code: 401, message: '无法获取您的用户信息，请重新登录' })

  // 根据uid获取用户信息
  const user = await getDatabase()
    .collection(USER_ADMIN)
    .doc(tokenInfo[REQUEST_UID])
    .get()

  if (!user.data) respond.fail({ code: 401, message: '用户身份有误，请重新登录' })

  // 用户信息塞入请求
  ctx.request[REQUEST_UID] = tokenInfo[REQUEST_UID]

  await next()
}