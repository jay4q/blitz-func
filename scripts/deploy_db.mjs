import { config } from 'dotenv'
import * as path from 'path'
import tcb from '@cloudbase/manager-node'
import { DB } from '../utils/db.js'

console.log(chalk.blue('正在同步云数据库集合...'))

// 选择合适的环境变量文件夹
const [envName] = process.argv.slice(3)
const ENV_FILE = `.env.db.${envName === 'prod' ? 'prod' : 'local'}`

const env = config({
  path: path.resolve(process.cwd(), ENV_FILE)
})

if (env.error) {
  console.log(chalk.red('😭😭😭 云函数部署失败'))
  process.exit(0)
}

const envId = env.parsed.TCB_ENVID
const secretId = env.parsed.TCB_SECRET_ID
const secretKey = env.parsed.TCB_SECRET_KEY

if (!envId || !secretId || !secretKey) {
  console.log(chalk.yellow(`⚠️⚠️⚠️ 请在${ENV_FILE}中提供产线需要的 TCB_ENVID & TCB_SECRET_ID & TCB_SECRET_KEY 变量`))
  process.exit(0)
}

const app = tcb.init({
  envId,
  secretId,
  secretKey,
})

const { database } = app

let exist = 0, success = 0, error = 0
let error_list = []

await Promise.all(
  Object.keys(DB).map(key => {
    const dbName = DB[key]
    return (async () => {
      try {
        const res = await database.createCollectionIfNotExists(dbName)
        if (res.IsCreated) {
          success++
        } else if (res.ExistsResult.Exists) {
          exist++
        } else {
          throw new Error('')
        }
      } catch (e) {
        error++
        error_list.push(dbName)
      }
    })()
  })
)

console.log(chalk.green(`🎉🎉🎉 云数据库集合同步完成：${exist}个已存在；${success}个成功；${error}个失败`))

if (error_list.length > 0) {
  console.log(chalk.red(`😭😭😭 同步失败的集合有：${error_list.length}`))
}