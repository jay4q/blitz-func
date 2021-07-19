import mysql from 'serverless-mysql'
import { MYSQL_HOST, MYSQL_PORT, MYSQL_DB, MYSQL_USER, MYSQL_PSWD } from './config'

let connection = mysql({
  config: {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DB,
    user: MYSQL_USER,
    password: MYSQL_PSWD,
  }
})

/**
 * 获取数据库连接
 */
export const getConnection = () => {
  return connection
}

/**
 * 关闭数据库连接
 * @description 有必要在每次云函数请求结束后关闭
 */
export const closeConnection = async () => {
  await connection.end()
}