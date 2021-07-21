# 腾讯云开发云函数｜模版

基于腾讯云开发云函数的模板，支持以下特性：

1. 使用 koa 模拟路由，让单个云函数支持多样的业务
2. 支持使用 typescript 进行开发
3. 支持接入 mysql 数据库
4. 支持一键部署为腾讯云云函数
5. 封装了一些常用的业务能力，如 管理端用户登录态 等
6. 配合 [blitz-admin](https://github.com/jay4q/blitz-admin) 开箱即用
7. 等等

## 准备和开发

1. 复制 [.env.example](./.env.example) 为 `.env.local` 文件，并根据注释配置环境变量
2. 执行 `yarn` 安装依赖
3. 执行 `yarn dev` 开始开发

## 部署

1. 确保已新增 `.env.prod` 文件并配置所需的环境变量
2. 确保已安装 [cloudbase-cli](https://docs.cloudbase.net/cli-v1/install.html)
3. 使用 `tcb login` 登录相应的腾讯云账号（如果已登录则可以忽略）
4. 执行 `yarn deploy` 命令部署至线上（默认即全量发布）
5. 「选做」进入云开发控制台，点击「访问服务」，可以给云函数触发路径加上鉴权，增加安全性（前端默认已开启鉴权）

## 运维

1. 登录腾讯云云开发控制台对应云环境
2. 进入指定云函数查看「日志」和「监控」
3. 可以根据前端响应头里的 `x-tencent-scf-request-id` 属性，在日志中定位对应请求，查看输出的结果

## Todo

+ [ ] 门户网站逻辑
  + [ ] 菜单管理
  + [ ] 文章管理
+ [ ] 云环境云数据库初始化脚本
+ [ ] 若发生 mysql 连接，框架会在请求结束后自行关闭连接

## 开发要求

+ 建议还是使用 SDK 自带的 `callFunction` 方法请求云函数，不过可以进行一层封装，以便未来兼容 [HTTP 请求调用云函数](https://docs.cloudbase.net/service/access-cloud-function.html#kua-yu-chu-li)
+ 「可选」支持接入关系型数据库，详见 `./utils/mysql.ts` 以及 [serverless-mysql](https://github.com/jeremydaly/serverless-mysql)

## 注意事项

+ 目前仅支持通过 [node-sdk](https://docs.cloudbase.net/api-reference/server/node-sdk/database/database.html) 接入腾讯云云开发。如需使用微信云开发相关能力，请自行安装 [wx-server-sdk](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/wx-server-sdk.html) 并修改相关依赖
+ 「建议」不要使用 `export default` 而是直接使用 `export` 导出模块
+ 修改环境变量后，需要重新启动

## 依赖

+ [koa-router](https://github.com/koajs/router/blob/master/API.md)
+ [云函数配置](https://docs.cloudbase.net/cli-v1/functions/configs.html)
+ [serverless-mysql](https://github.com/jeremydaly/serverless-mysql)
