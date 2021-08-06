import Router from '@koa/router'
import jwt from 'jsonwebtoken'
import { adminGuard } from 'middlewares'
import { getDatabase } from 'utils/cloudbase'
import { REQUEST_ADMIN_UID, TCB_TOKEN_SECRET } from 'utils/config'
import { DB } from 'utils/db'
import { isArrayEmpty, respond } from 'utils/helper'
import { UserLoginReq } from 'typings/user/req'
import md5 from 'md5'

const user = new Router({
  prefix: '/user',
})

// 管理员登录
user.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body as UserLoginReq

  if (!username || !password) {
    respond.fail(400, '请填写有效的用户名和密码')
  }

  const encodedPassword = md5(password)
  // 用户名和密码对比
  const resp = await getDatabase()
    .collection(DB.user_admin)
    .where({
      username,
      password: encodedPassword,
    })
    .field({
      nickname: true
    })
    .limit(1)
    .get()

  if (isArrayEmpty(resp.data)) {
    respond.fail(400, '用户名或密码有误')
  }

  const user = resp.data[0]
  // 生成令牌
  const token = jwt.sign({ [REQUEST_ADMIN_UID]: user._id }, TCB_TOKEN_SECRET, {
    expiresIn: '7d'
  })

  respond.ok(ctx, { token, user: resp.data[0] })
})

// 获取用户信息
user.get('/profile', adminGuard, async (ctx) => {
  const resp = await getDatabase()
    .collection(DB.user_admin)
    .doc(ctx.request[REQUEST_ADMIN_UID])
    .field({
      nickname: true
    })
    .get()

  if (isArrayEmpty(resp.data)) respond.fail(404, '无法获取管理员资料')

  respond.ok(ctx, { user: resp.data[0] })
})

export { user }