import jwt from 'jsonwebtoken'
import { Context, Next } from 'koa'
import { REQUEST_HEADER_ADMIN_AUTH, REQUEST_ADMIN_UID, TCB_TOKEN_SECRET } from 'utils/config'
import { respond } from 'utils/helper'
import { getDatabase } from 'utils/cloudbase'
import { DB } from 'utils/db'

/**
 * 检测管理端用户是否登录，如果未登录或过期，则被踢出
 * @description 不要用作全局中间件，请在需要的地方自行引入
 * @param ctx 
 * @param next 
 */
export const adminGuard = async (ctx: Context, next: Next) => {
  const token = ctx.get(REQUEST_HEADER_ADMIN_AUTH)

  if (!token) respond.fail(401, '您尚未登录，请先登录')

  const tokenInfo = jwt.verify(token, TCB_TOKEN_SECRET)
  if (!tokenInfo[REQUEST_ADMIN_UID]) respond.fail(401, '无法获取管理员信息，请重新登录')

  // 查询是否存在管理端用户
  const user = await getDatabase()
    .collection(DB.user)
    .doc(tokenInfo[REQUEST_ADMIN_UID])
    .get()

  if (!user.data) respond.fail(401, '管理员身份有误，请重新登录')

  // 记录管理员标识符
  ctx.request[REQUEST_ADMIN_UID] = tokenInfo[REQUEST_ADMIN_UID]

  await next()
}