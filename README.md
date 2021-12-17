# 腾讯云开发云函数｜模版

基于腾讯云开发的云函数模版，支持以下特性：

1. 🧱 使用 [koa](https://github.com/koajs/koa) 模拟路由，让单个云函数就能支持多样的业务
2. 🔥 使用 typescript 进行开发
3. 📦 支持接入 mysql 数据库
4. 😄 支持本地开发和热更新。并与产线无缝对接
5. 🚀 只需20s，一行命令即可部署至腾讯云开发产线环境
6. 🔐 产线代码加密，交付给甲方无需担心源码泄漏
7. 等等

需要注意的是，该云函数模版只是为 web server 提供了基本范式。如果希望服务于微信小程序，并在微信开发者工具中调试，请参考 [blitz-wxapp-func](https://github.com/jay4q/blitz-wxapp-func)

## 文件结构

+ `scripts`: 部署用的脚本，模板使用者无需关注～
+ `middlewares`: 存放了基础的中间件。业务中间件也可以存放至此处
+ `routes`: 业务路由，业务开发主要在这里面进行。参考常用 restful/mvc 标准即可
+ `utils`: 一些基础的函数库。业务常用函数也可以放于此处
+ `.env.*`: 环境变量配置文件。通过 `dotenv` 读取
+ `app.ts`: Koa 应用启动文件
+ `server.ts`: 本地开发的入口文件
+ `index.js/ts`: 产线运行的入口文件
+ `cloudbaserc.json`: 部署至腾讯云开发云函数的配置文件

## 开发须知

### 1. 准备工作

1. 建议开通 [按量计费环境](https://cloud.tencent.com/document/product/876/39095) 资源配额较高且有免费环境
2. 复制 [.env.example](./.env.example) 为 `.env.local` 文件，并根据注释配置环境变量
3. 同上，复制 [.env.db.example](./.env.db.example) 为 `.env.db.local` 文件，并根据注释配置环境变量
4. 执行 `yarn` 安装依赖

> 个人建议，开发/测试连接的云开发环境和产线的隔离

#### 环境变量说明

> 见 [.env.example](./.env.example)

1. `TCB_SECRET_ID` 和 `TCB_SECRET_KEY` 是为了让用户能够在本地访问云开发资源（产线就不需要配置了）
   1. 可以在 [访问管理->用户列表](https://console.cloud.tencent.com/cam) 中获取
   2. 新建用户时，关联上 **云开发** 关键词的策略名
   3. 创建完成后，点开用户详情->API密钥即可获取
2. `TCB_VPC_ID` 和 `TCB_VPC_SUBNET_ID` 主要服务于使用腾讯云MYSQL的开发者。可以将云函数和云Mysql配置在同一私有网络下，实现内网访问
   1. 如果不需要，这两个环境变量也没必要填
   2. 不需要的话，记得修改下 [cloudbaserc.json](./cloudbaserc.json)，删除 `vpc` 这个配置即可

### 2. 开发

1. 执行 `yarn dev` 开始开发，监听 `7001` 端口
2. 如新增、修改集合，直接在 [db.ts](./utils/db.ts) 中声明即可。这样就可以通过 `yarn deploy:db` 同步更新开发环境的云开发云数据库集合

### 3. 部署

1. 确保已新增 `.env.prod` 文件并配置所需的环境变量
2. 确保已安装 [cloudbase-cli](https://docs.cloudbase.net/cli-v1/install.html)
3. 使用 `tcb login` 登录相应的腾讯云账号（如果已登录则可以忽略）
   1. 建议先在浏览器登录腾讯云，cli登录时会自动通过浏览器腾讯云进行oauth
4. 执行 `yarn deploy` 命令，将云函数部署至产线（默认即全量发布）
5. 可选：执行 `yarn deploy:full` 命令，将云函数(JS)源码部署至产线。区别是，步骤4最终编译出来的，只有一个 `index.js` 文件，极大优化了云函数体积、加快了部署速度并一定程度上做到了加密（对私有化部署很友好）
6. 可选：在已新增 `.env.db.prod` 文件并配置所需环境变量情况下，执行 `yarn deploy:db:prod` 命令，将云数据库集合同步至产线（注意不是数据，是集合同步）

### 4. 运维

1. 登录 [腾讯云云开发控制台](https://console.cloud.tencent.com/) 对应云环境
2. 进入当前云函数查看「日志」和「监控」
3. 可以根据前端响应头里的 `x-tencent-scf-request-id` 属性，在日志中定位对应请求，查看输出的结果

## Todo

+ [ ] 中间件：限制IP频繁访问
+ [ ] 所有新增和更新操作，都需要先验证输入参数是否匹配、是否正确，是否可以考虑使用 [zod](https://github.com/colinhacks/zod) 同时完成定义和检查

## 开发｜注意事项

+ 注意：修改环境变量文件(.env.*)后，需要重新启动
+ 注意：目前仅支持通过 [node-sdk](https://docs.cloudbase.net/api-reference/server/node-sdk/database/database.html) 接入腾讯云云开发
+ 建议：所有云数据库表名，都放在 [此处](./utils/db.ts) 统一管理
+ 建议：通过自定义状态码，覆盖所有业务异常情况。其余异常都通过状态码 500 表示。同样由于前端发起的云函数请求，因此不存在需要判断 HTTP 状态码的情况
+ 建议：不要使用 `export default` 而是直接使用 `export` 导出模块
+ 可选：支持接入关系型数据库，详见 [代码](./utils/sql.ts) 以及 [serverless-mysql](https://github.com/jeremydaly/serverless-mysql)

### 1. 如何向这个云函数发起请求

1. 开发环境下，前端直接通过常用的 `axios ｜ fetch | umi-request` 向本地 web-server 发起请求即可
2. 产线环境下（部署为云函数后），前端直接通过 [node-sdk](https://docs.cloudbase.net/api-reference/server/node-sdk/database/database.html) 提供的 `callFunction` 发起请求

> 也可以参考 [blitz-admin](https://github.com/jay4q/blitz-admin/blob/master/src/utils/tcbRequest.ts) 中的 `tcbRequest` 对两种方法进行封装

❕ 需要注意的是，为了兼容 [使用 HTTP 访问云函数](https://docs.cloudbase.net/service/access-cloud-function)，该模板要求云函数入参匹配 [集成请求](https://docs.cloudbase.net/service/access-cloud-function#%E4%BA%91%E5%87%BD%E6%95%B0%E7%9A%84%E5%85%A5%E5%8F%82)。下面是如何发起云函数请求的基本范式，以 POST 请求为例：

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

## 参考/依赖

+ [koa-router](https://github.com/koajs/router/blob/master/API.md)
+ [serverless-mysql](https://github.com/jeremydaly/serverless-mysql)
+ [云函数配置](https://docs.cloudbase.net/cli-v1/functions/configs.html)
+ [云函数限制](https://cloud.tencent.com/document/product/876/47177#.E4.BA.91.E5.87.BD.E6.95.B0)
+ [云函数索引优化](https://www.infoq.cn/article/mvc0m5ja5vfegfhsc7ks)
+ [云数据库性能优化](https://developers.weixin.qq.com/community/business/doc/00068218a682088d17ca593c45b40d)
+ [ncc将工程最终编译为一个JS文件](https://github.com/vercel/ncc)
