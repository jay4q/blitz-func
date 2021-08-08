import { BaseModel } from '../base'

export interface UserAdminRoleModel extends BaseModel {
  /**
   * @description 角色标识符
   */
  code: string

  /**
   * @description 角色名称
   */
  name: string
}

export interface UserAdminModel extends BaseModel {
  /**
   * @description 关联的权限标识符；其中 * 表示所有权限
   */
  roles: string[]

  /**
   * @description 是否可用
   */
  enabled: boolean

  /**
   * @description 登录用的账号名
   */
  username: string

  /**
   * @description 登录用的密码
   */
  password: string

  /**
   * @description 用户昵称
   */
  nickname: string
}