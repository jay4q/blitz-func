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

    if (
      !Array.isArray(roles) ||
      // 不是超管且权限不匹配
      !roles.some(role => role === '*' || role === required)
    ) {
      throw new Error('403')
    }

    await next()
  }
}