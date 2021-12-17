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

export const sysTime = {
  createdAt: () => {
    const createTime = Math.round(new Date().getTime() / 1000)
    return {
      created_at: createTime,
      updated_at: createTime,
      deleted_at: 0,
    }
  },
  updatedAt: () => {
    return {
      updated_at: Math.round(new Date().getTime() / 1000)
    }
  },
  deletedAt: () => {
    const deleteTime = Math.round(new Date().getTime() / 1000)
    return {
      deleted_at: deleteTime,
      updated_at: deleteTime,
    }
  }
}

export const isArrayEmpty = arr => !Array.isArray(arr) || arr.length === 0