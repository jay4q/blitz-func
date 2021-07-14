const Router = require('@koa/router')
const jwt = require('jsonwebtoken')
const { respond, isArrayEmpty } = require('../../utils/utils')
const { userGuard } = require('../../middlewares')
const { REQUEST_UID, TCB_TOKEN_SECRET } = require('../../utils/constant')
const { getDatabase } = require('../../utils/cloudbase')
const { USER_ADMIN } = require('../../utils/db')

const router = new Router({
  prefix: '/user',
})

// 管理员登录
router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body

  if (!username || !password) respond.fail({ code: 400, message: '请填写有效的用户名和密码' })

  // 用户名和密码对比
  const resp = await getDatabase()
    .collection(USER_ADMIN)
    .where({
      username,
      password: password, // todo: 需要加密
    })
    .field({
      nickname: true
    })
    .get()

  if (isArrayEmpty(resp.data)) respond.fail({ code: 400, message: '用户名或密码有误' })

  const user = resp.data[0]
  // 生成令牌
  const token = jwt.sign({ [REQUEST_UID]: user._id }, TCB_TOKEN_SECRET, {
    expiresIn: '7d'
  })

  respond.ok(ctx, { token, user: resp.data[0] })
})

// 获取用户信息
router.get('/profile', userGuard, async (ctx) => {
  const resp = await getDatabase()
    .collection(USER_ADMIN)
    .doc(ctx.request[REQUEST_UID])
    .field({
      nickname: true
    })
    .get()

  if (isArrayEmpty(resp.data)) respond.fail({ code: 404, message: '无法获取用户资料' })

  respond.ok(ctx, { user: resp.data[0] })
})

module.exports = router