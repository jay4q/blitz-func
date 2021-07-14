const Router = require('@koa/router')
const { respond } = require('../../utils/utils')
const { getDatabase } = require('../../utils/cloudbase')

const router = new Router({
  prefix: '/demo',
})

router.get('/success', async (ctx) => {
  respond.ok(ctx, '成功了🎉🎉🎉')
})

router.get('/error', async (ctx) => {
  respond.fail({ code: 400, message: '出错了😭😭😭' })
})

router.get('/db', async (ctx) => {
  const res = await getDatabase()
    .collection('user_admin')
    .get()

  respond.ok(ctx, res)
})

router.post('/post', async (ctx) => {
  respond.ok(ctx, ctx.request.body)
})

module.exports = router