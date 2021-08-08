import { Context, Next } from 'koa'
import { getDatabase } from 'utils/cloudbase'
import { DB } from 'utils/db'
import { respond } from 'utils/helper'

/**
 * @description 新增/修改前，检查账号名是否唯一
 * @param ctx 
 * @param next 
 */
export const isUnique = async (ctx: Context, next: Next) => {
  const uid = ctx.params['uid'] as string
  const username = ctx.request.body['username'] as string

  if (username) {
    const where: object = { username }

    if (!!uid) {
      const _ = getDatabase().command
      where['_id'] = _.neq(uid)
    }

    const resp = await getDatabase()
      .collection(DB.user_admin)
      .where(where)
      .count()

    if ((resp.total || 0) > 0) {
      respond.fail(400, `已存在重名账号 ${username}`)
    }
  }

  await next()
}