const Router = require('@koa/router')
const demo = require('./demo')
const user = require('./user')

const v1 = new Router({
  prefix: '/v1',
})

v1.use(demo.routes())
v1.use(user.routes())

module.exports = v1