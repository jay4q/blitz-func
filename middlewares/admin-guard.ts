import jwt from 'jsonwebtoken'
import { Context, Next } from 'koa'
import { REQUEST_HEADER_ADMIN_AUTH, REQUEST_ADMIN_UID, TCB_TOKEN_SECRET, REQUEST_ADMIN_ROLES } from 'utils/config'
import { isArrayEmpty, respond } from 'utils/helper'
import { getDatabase } from 'utils/cloudbase'
import { DB } from 'utils/db'
import { UserAdminModel } from 'typings/user/model'

/**
 * @description 路由中间件：检测管理端用户是否登录，如果未登录或过期，则被踢出
 * @param ctx 
 * @param next 
 */
export const adminGuard = async (ctx: Context, next: Next) => {
  const token = ctx.get(REQUEST_HEADER_ADMIN_AUTH)

  if (!token) {
    respond.fail(401, '您尚未登录，请先登录')
  }

  const tokenInfo = jwt.verify(token, TCB_TOKEN_SECRET)
  if (!tokenInfo[REQUEST_ADMIN_UID]) {
    respond.fail(401, '无法获取管理员信息，请重新登录')
  }

  // 查询是否存在管理端用户
  const resp = await getDatabase()
    .collection(DB.user_admin)
    .doc(tokenInfo[REQUEST_ADMIN_UID])
    .field({
      roles: true,
      enabled: true,
    })
    .get()

  if (isArrayEmpty(resp.data) || !(resp.data[0] as UserAdminModel).enabled) {
    respond.fail(401, '管理员不存在或被禁用')
  }

  // 记录管理员信息
  ctx.request[REQUEST_ADMIN_UID] = tokenInfo[REQUEST_ADMIN_UID]
  ctx.request[REQUEST_ADMIN_ROLES] = (resp.data[0] as UserAdminModel).roles

  await next()
}