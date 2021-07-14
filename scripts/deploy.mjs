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

  if (envId && subpath && funcName) {
    await $`rm -rf dist`
    await $`ttsc -P tsconfig.json`
    await $`cp index.js package.json .env.prod dist/`
    console.log('🎉🎉🎉成功编译代码')
    await $`tcb fn deploy -e ${envId} --path ${subpath} --dir ./dist ${funcName}`
    console.log(chalk.green('🎉🎉🎉成功部署云函数'))
  } else {
    console.log(chalk.red(`请检查 ${ENV_FILE} 内的变量是否填写完整`))
  }
} else {
  console.log(chalk.red('😭😭😭云函数部署失败'))
}