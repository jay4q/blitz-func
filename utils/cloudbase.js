// 注意这是腾讯云提供的 sdk
const cloud = require('@cloudbase/node-sdk')
const { isDev } = require('./utils')
const { TCB_ENVID, TCB_SECRET_ID, TCB_SECRET_KEY } = require('./constant')

let _app
let _db

/**
 * 获取云开发应用实例
 * @returns CloudBase
 */
const getCloudApp = () => {
  if (!_app) {
    let config = { env: TCB_ENVID }

    if (isDev()) {
      config = {
        ...config,
        secretId: TCB_SECRET_ID,
        secretKey: TCB_SECRET_KEY,
      }
    }

    _app = cloud.init(config)
  }

  return _app
}

/**
 * 获取云开发数据库实例
 * @returns Database
 */
const getDatabase = () => {
  if (!_db) {
    const app = getCloudApp()
    _db = app.database()
  }

  return _db
}

module.exports = {
  getCloudApp,
  getDatabase,
}