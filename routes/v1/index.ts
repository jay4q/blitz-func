import Router from '@koa/router'
import { demo } from './demo'

const v1 = new Router({
  prefix: '/v1'
})

// ! 演示用路由，实际开发时删掉就行
v1.use(demo.routes())

export { v1 }