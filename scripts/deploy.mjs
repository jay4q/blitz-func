import { config } from 'dotenv'
import * as path from 'path'

// 只读取产线环境变量
const ENV_FILE = '.env.prod'

const env = config({
  path: path.resolve(process.cwd(), ENV_FILE)
})

if (!env.error) {
  const envId = env.parsed.TCB_ENVID
  const funcName = env.parsed.TCB_FUNC_NAME
  const subpath = env.parsed.TCB_HTTP_PATH

  // 开始部署流程
  if (envId && subpath && funcName) {
    // tcb fn deploy -e taipu-river-1gg6jtrg176cc182 --path /taipu/admin-api --dir . taipu-admin-api
    await $`tcb fn deploy -e ${envId} --path ${subpath} --dir . ${funcName}`
    console.log(chalk.green('🎉🎉🎉 成功部署'))
  } else {
    console.log(chalk.red(`请检查 ${ENV_FILE} 内的变量是否填写完整`))
  }
} else {
  console.log(chalk.red('😭😭😭云函数部署失败'))
}
