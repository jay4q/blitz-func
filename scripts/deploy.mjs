import { config } from 'dotenv'
import * as path from 'path'

// 将 devDependencies 删除，因为在云端安装云函数，没有使用 npm install --production 的命令（这个需要腾讯云的负责人去解决）
function modifyPackageJson() {
  try {
    const jsonStr = fs.readFileSync('./package.json', 'utf8')
    const jsonFile = JSON.parse(jsonStr)
    delete jsonFile['devDependencies']
    fs.writeFileSync('./dist/package.json', JSON.stringify(jsonFile, null, 2))
  } catch (e) {
    console.log(e)
    return false
  }
}

// 只读取产线环境变量
const ENV_FILE = '.env.prod'

const env = config({
  path: path.resolve(process.cwd(), ENV_FILE)
})

if (!env.error) {
  const envId = env.parsed.TCB_ENVID
  const funcName = env.parsed.TCB_FUNC_NAME

  if (envId && funcName) {
    const targetDir = `functions/${funcName}`

    await $`rm -rf functions && rm -rf dist`
    await $`ttsc -P tsconfig.json`
    modifyPackageJson() // 优化 package.json 文件
    console.log(chalk.green('🎉🎉🎉成功编译代码'))
    await $`mkdir -p ${targetDir}`
    await $`cp -r dist/ ${targetDir}`
    await $`cp index.js .env.prod ${targetDir}`
    console.log(chalk.green('🎉🎉🎉文件结构梳理完毕'))
    await $`tcb fn deploy --mode prod ${funcName} --force`
    console.log(chalk.green('🎉🎉🎉成功部署云函数'))
  } else {
    console.log(chalk.red(`请检查 ${ENV_FILE} 内的变量是否填写完整`))
  }
} else {
  console.log(chalk.red('😭😭😭云函数部署失败'))
}