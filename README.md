# 腾讯云开发云函数｜模版

基于腾讯云开发，同时兼容本地开发和产线部署的云函数的最小化范式，支持以下特性：

1. 使用 koa 模拟路由，让单个云函数支持多样的业务
2. 支持使用 typescript 进行开发
3. 支持接入 mysql 数据库
4. 兼容本地开发，并支持一键部署至腾讯云函数
5. 封装了一些常用的业务能力，如 管理端用户登录态 等
6. 配合 [blitz-admin](https://github.com/jay4q/blitz-admin) 开箱即用
7. 等等

需要注意的是，该云函数模版只是为 web server 提供了基本范式。如果希望服务于微信小程序，并在微信开发者工具中调试，请参考 [blitz-wxapp-func](https://github.com/jay4q/blitz-wxapp-func)

## 开发须知

### 1. 准备工作

1. 建议开通 [按量计费环境](https://cloud.tencent.com/document/product/876/39095) 资源配额较高且有免费环境
2. 复制 [.env.example](./.env.example) 为 `.env.local` 文件，并根据注释配置环境变量
3. 执行 `yarn` 安装依赖

> 个人建议开发环境和产线环境隔离

### 2. 开发

1. 执行 `yarn dev` 开始开发，监听 `7001` 端口

### 3. 部署

1. 确保已新增 `.env.prod` 文件并配置所需的环境变量
2. 确保已安装 [cloudbase-cli](https://docs.cloudbase.net/cli-v1/install.html)
3. 使用 `tcb login` 登录相应的腾讯云账号（如果已登录则可以忽略）
4. 执行 `yarn deploy` 命令部署至线上（默认即全量发布）

### 4. 运维

1. 登录 [腾讯云云开发控制台](https://console.cloud.tencent.com/) 对应云环境
2. 进入当前云函数查看「日志」和「监控」
3. 可以根据前端响应头里的 `x-tencent-scf-request-id` 属性，在日志中定位对应请求，查看输出的结果

## Todo

+ [ ] 门户网站逻辑
  + [ ] 菜单管理
  + [ ] 文章管理
+ [ ] 云环境云数据库初始化脚本

## 开发要求

+ 可选：支持接入关系型数据库，详见 `./utils/mysql.ts` 以及 [serverless-mysql](https://github.com/jeremydaly/serverless-mysql)
+ 建议：如果业务比较复杂或者需要开发小程序，客户端、管理端服务可以分别部署为两个云函数，这样方便管理

### 1. 如何向这个云函数发起请求

1. 开发环境下，前端直接通过常用的 `axios ｜ fetch | umi-request` 向本地 web-server 发起 http 请求即可
2. 产线环境下（部署为云函数后），前端直接通过 [node-sdk](https://docs.cloudbase.net/api-reference/server/node-sdk/database/database.html) 提供的 `callFunction` 发起请求

同样，也可以参考 [blitz-admin](https://github.com/jay4q/blitz-admin) 中的 `tcbRequest` 对两种方法进行封装

不过值得注意的是，由于需要兼容 http 请求，因此需要规范云函数入参，详见 [使用 HTTP 访问云函数](https://docs.cloudbase.net/service/access-cloud-function.html)。下面是如何发起云函数请求的基本范式，以 post 请求为例：

``` ts
const body = typeof data === 'object' ? JSON.stringify(data) : data

const resp = await callFunction({
  parse: true,
  name: 'function-name',
  data: {
    body: data,
    httpMethod: 'POST',
    path: `/path/to/service`,
    headers: {
      ...(headers || {}),
      // 这里还可以放一些鉴权信息
    }
  }
})
```

## 注意事项

+ 目前仅支持通过 [node-sdk](https://docs.cloudbase.net/api-reference/server/node-sdk/database/database.html) 接入腾讯云云开发
+ 不要使用 `export default` 而是直接使用 `export` 导出模块
+ 修改环境变量后，需要重新启动
+ 微信云开发云数据库存在一些 [限制](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference/quota.html) 开发前需要评估

## 依赖

+ [koa-router](https://github.com/koajs/router/blob/master/API.md)
+ [serverless-mysql](https://github.com/jeremydaly/serverless-mysql)
+ [云函数配置](https://docs.cloudbase.net/cli-v1/functions/configs.html)
+ [云函数限制](https://cloud.tencent.com/document/product/876/47177#.E4.BA.91.E5.87.BD.E6.95.B0)
+ [云数据库性能优化](https://developers.weixin.qq.com/community/business/doc/00068218a682088d17ca593c45b40d)
