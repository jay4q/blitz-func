import Router from '@koa/router'
import { adminGuard, roleGuard } from 'middlewares'
import { UserAdminModel } from 'typings/user/model'
import { getDatabase } from 'utils/cloudbase'
import { DB } from 'utils/db'
import { isArrayEmpty, respond, sysTime } from 'utils/helper'
import md5 from 'md5'
import { isUnique } from './service'

const adminUser = new Router({
  prefix: '/admin-user'
})
  .use(adminGuard)
  .use(roleGuard('*'))

// 获取所有角色信息；不会有很多的
adminUser.get('/roles', async ctx => {
  const resp = await getDatabase()
    .collection(DB.user_admin_role)
    .get()

  respond.ok(ctx, { roles: isArrayEmpty(resp.data) ? [] : resp.data })
})

// 获取所有管理员
adminUser.get('/', async ctx => {
  const resp = await getDatabase()
    .collection(DB.user_admin)
    .limit(100)
    .field({
      password: false
    })
    .get()

  respond.ok(ctx, isArrayEmpty(resp.data) ? [] : resp.data)
})

// 获取单个管理员信息以及可用的角色列表
adminUser.get('/:id', async ctx => {
  const uid = ctx.params['id']

  const userResp = await getDatabase()
    .collection(DB.user_admin)
    .doc(uid)
    .field({
      password: false
    })
    .get()

  if (isArrayEmpty(userResp.data)) {
    respond.fail(404, '找不到该管理员信息')
  }

  const roleResp = await getDatabase()
    .collection(DB.user_admin_role)
    .get()

  respond.ok(ctx, {
    user: userResp.data[0],
    roles: isArrayEmpty(roleResp.data) ? [] : roleResp.data
  })
})

// 新增一个管理员
adminUser.post('/', isUnique, async ctx => {
  const data = ctx.request.body as Partial<UserAdminModel>
  const encodedPassword = md5(data.password)

  const resp = await getDatabase()
    .collection(DB.user_admin)
    .add({
      ...data,
      ...sysTime.createdAt(),
      password: encodedPassword
    })

  if (resp.id) {
    respond.ok(ctx, '管理员创建成功')
  } else {
    respond.fail(400, '管理员创建失败')
  }
})

// 更新一个管理员
// 包括将这个管理员标记为禁用的操作
adminUser.patch('/:uid', isUnique, async ctx => {
  const uid = ctx.params['uid'] as string
  const data = ctx.request.body as Partial<UserAdminModel>
  const passwordObj = data.password ? { password: md5(data.password) } : {}

  const resp = await getDatabase()
    .collection(DB.user_admin)
    .doc(uid)
    .update({
      ...data,
      ...passwordObj,
      ...sysTime.updatedAt(),
    })

  if (resp.updated) {
    respond.ok(ctx, '成功更新管理员')
  } else {
    respond.fail(400, '管理员更新失败')
  }
})

export { adminUser }