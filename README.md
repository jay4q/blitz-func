# 腾讯云开发云函数｜模版

基于腾讯云开发云函数的模板，支持以下特性：

1. 使用 koa 模拟路由，让单个云函数支持多样的业务
2. 支持使用 typescript 进行开发
3. 封装了一些常用的业务能力，如 管理端用户登录、授权 等
4. 支持一键部署至腾讯云开发环境
   1. 部署云函数
   2. 部署至腾讯云托管
5. 等等

## 准备和开发

1. 复制 [.env.example](./.env.example) 为 `.env.local` 文件，并根据注释添加配置
2. 执行 `yarn` 安装依赖
3. 执行 `yarn dev` 命令开始开发

## 部署

1. 执行 `yarn deploy` 命令部署至线上（全量发布即可）
2. 「选做」进入云开发控制台，点击「访问服务」，可以给云函数触发路径加上鉴权，增加安全性

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
+ [x] 「重要」使用 typescript
+ [x] 「重要」更新部署脚本，上线前需要先编译项目
+ [x] 使用 cloudbaserc 配置部署环境，配置参数相比 cli 更多也还可以自定义 nodejs 版本
+ [x] 支持 mysql（注意这是备选方案，模板首选还是云开发云数据库）
+ [x] 支持云函数和云mysql配置同一子网
+ [ ] 支持使用腾讯云托管进行部署

## 开发要求

+ 建议还是使用 SDK 自带的 `callFunction` 方法请求云函数，不过可以进行一层封装，以便未来兼容 [HTTP 请求调用云函数](https://docs.cloudbase.net/service/access-cloud-function.html#kua-yu-chu-li)
+ 「可选」支持接入关系型数据库，详见 `./utils/mysql.ts` 以及 [serverless-mysql](https://github.com/jeremydaly/serverless-mysql)

## 注意事项

+ 目前仅支持通过 [node-sdk](https://docs.cloudbase.net/api-reference/server/node-sdk/database/database.html) 接入腾讯云开发数据库
  + 如果需要使用微信云开发相关能力，请自行安装 [wx-server-sdk](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/wx-server-sdk.html) 并修改相关依赖
+ 「建议」不要使用 `export default` 而是直接使用 `export` 导出模块
+ 修改环境变量后，需要重新启动

## 依赖

+ [koa-router](https://github.com/koajs/router/blob/master/API.md)
+ [云函数配置](https://docs.cloudbase.net/cli-v1/functions/configs.html)
+ [serverless-mysql](https://github.com/jeremydaly/serverless-mysql)
