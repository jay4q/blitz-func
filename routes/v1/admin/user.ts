import Router from '@koa/router'
import jwt from 'jsonwebtoken'
import { Context } from 'koa'
import { adminGuard } from 'middlewares'
import { getDatabase } from 'utils/cloudbase'
import { REQUEST_UID, TCB_TOKEN_SECRET } from 'utils/config'
import { DB_USER_ADMIN } from 'utils/db'
import { isArrayEmpty, respond } from 'utils/helper'

const user = new Router({
  prefix: '/user',
})

// 管理员登录
user.post('/login', async (ctx: Context) => {
  const { username, password } = ctx.request.body as { username: string, password: string }

  if (!username || !password) respond.fail(400, '请填写有效的用户名和密码')

  // 用户名和密码对比
  const resp = await getDatabase()
    .collection(DB_USER_ADMIN)
    .where({
      username,
      password: password, // todo: 需要加密
    })
    .field({
      nickname: true
    })
    .get()

  if (isArrayEmpty(resp.data)) respond.fail(400, '用户名或密码有误')

  const user = resp.data[0]
  // 生成令牌
  const token = jwt.sign({ [REQUEST_UID]: user._id }, TCB_TOKEN_SECRET, {
    expiresIn: '7d'
  })

  respond.ok(ctx, { token, user: resp.data[0] })
})

// 获取用户信息
user.get('/profile', adminGuard, async (ctx) => {
  const resp = await getDatabase()
    .collection(DB_USER_ADMIN)
    .doc(ctx.request[REQUEST_UID])
    .field({
      nickname: true
    })
    .get()

  if (isArrayEmpty(resp.data)) respond.fail(404, '无法获取管理员资料')

  respond.ok(ctx, { user: resp.data[0] })
})

export { user }