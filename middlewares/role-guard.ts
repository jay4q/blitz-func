import { Context, Next } from 'koa'
import { REQUEST_ADMIN_ROLES } from 'utils/config'
import { respond } from 'utils/helper'

/**
 * @description 路由中间件：检查当前用户的权限是否符合条件；注意一定要放在 admin-guard 后使用
 * @param required 需要用到的权限；如果需要超管权限，请用 *
 */
export const roleGuard = (required: string) => {
  return async (ctx: Context, next: Next) => {
    const roles = ctx.request[REQUEST_ADMIN_ROLES] as string[]

    // 拥有的角色不满足要求
    if (!Array.isArray(roles) || !roles.some(role => role === required)) {
      respond.fail(403, '您没有访问该资源的权限')
    }

    await next()
  }
}