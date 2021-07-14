class BusinessError extends Error {
  constructor(body) {
    super(JSON.stringify(body))
    this.name = 'BusinessError'
    this.code = body.code
    this.data = body.data
    this.message = body.message
  }
}

const respond = {
  ok: (ctx, data) => {
    ctx.status = 200
    ctx.body = { data, code: 200, message: 'SUCCESS' }
  },
  fail: ({ code, message, data }) => {
    throw new BusinessError({ code, message, data })
  }
}

const getCreateTime = () => {
  const createTime = new Date().getTime()
  return {
    _createTime: createTime,
    _updateTime: createTime,
  }
}

const isArrayEmpty = arr => !Array.isArray(arr) || arr.length === 0

const isDev = () => process.env.NODE_ENV === 'development'

module.exports = {
  isDev,
  respond,
  BusinessError,
  getCreateTime,
  isArrayEmpty,
}