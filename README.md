# 腾讯云开发云函数｜模版

基于腾讯云开发/云函数，使用 Koa 模拟路由，让单个云函数支持多样的业务

## 准备和开发

1. 复制 [.env.example](./.env.example) 为 `.env.local` 文件，并根据注释添加配置
2. 执行 `yarn` 安装依赖
3. 执行 `yarn dev` 命令开始开发

## 部署

1. 执行 `yarn deploy` 命令部署至线上（全量发布即可）

## 运维

1. 登录腾讯云云开发控制台对应云环境
2. 进入指定云函数查看「日志」和「监控」
3. 可以根据前端响应头里的 `x-tencent-scf-request-id` 属性，在日志中定位对应请求，查看输出的结果

## Todo

+ [x] 验证云函数部署
+ [x] 使用 zx 部署项目，这样可以做到统一配置
+ [x] 使用 dotnev 导入需要的环境变量
+ [x] 兼容云函数 http 集成请求格式
+ [x] 使用 token 进行业务鉴权
+ [ ] 「重要」使用 typescript
+ [ ] 「重要」更新部署脚本，上线前需要先编译项目
+ [ ] 「待定」使用 cloudbaserc 配置部署环境，配置参数相比 cli 更多也还可以自定义 nodejs 版本

## 开发要求

+ 建议还是使用 SDK 自带的 `callFunction` 方法请求云函数，不过可以进行一层封装，以便未来兼容 [HTTP 请求调用云函数](https://docs.cloudbase.net/service/access-cloud-function.html#kua-yu-chu-li)

## 注意事项

+ 目前仅支持通过 [node-sdk](https://docs.cloudbase.net/api-reference/server/node-sdk/database/database.html) 介入腾讯云开发数据库。未来可能考虑通过引入 [serverless-mysql](https://github.com/jeremydaly/serverless-mysql#readme) 以支持连接 mysql

## API

+ [koa-router](https://github.com/koajs/router/blob/master/API.md)
+ [cloudbase-functions 配置](https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-function)
