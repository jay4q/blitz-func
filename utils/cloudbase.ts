// 注意这是腾讯云提供的 sdk
import { init, ICloudBaseConfig, CloudBase, Database } from '@cloudbase/node-sdk'
import { TCB_ENVID, TCB_SECRET_ID, TCB_SECRET_KEY, NODE_DEV } from './config'

let _app: CloudBase
let _db: Database.Db

/**
 * 获取云开发应用实例
 * @returns CloudBase
 */
export const getCloudApp = () => {
  if (!_app) {
    let config: ICloudBaseConfig = { env: TCB_ENVID }

    if (NODE_DEV) {
      config = {
        ...config,
        secretId: TCB_SECRET_ID,
        secretKey: TCB_SECRET_KEY,
      }
    }

    _app = init(config)
  }

  return _app
}

/**
 * 获取云开发数据库实例
 * @returns Database
 */
export const getDatabase = () => {
  if (!_db) {
    const app = getCloudApp()
    _db = app.database()
  }

  return _db
}