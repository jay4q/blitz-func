import { Context } from 'koa'

export class BusinessError extends Error {
  code: number
  data: any

  constructor(body) {
    super(JSON.stringify(body))
    this.name = 'BusinessError'
    this.code = body.code
    this.data = body.data
    this.message = body.message
  }
}

export const respond = {
  ok: (ctx: Context, data: any) => {
    ctx.status = 200
    ctx.body = { data, code: 200, message: 'SUCCESS' }
  },
  fail: (code: number, message: string, data?: any) => {
    throw new BusinessError({ code, message, data })
  }
}

export const getCreateTime = () => {
  const createTime = new Date().getTime()
  return {
    _createTime: createTime,
    _updateTime: createTime,
  }
}

export const isArrayEmpty = arr => !Array.isArray(arr) || arr.length === 0