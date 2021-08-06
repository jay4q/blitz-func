import { BaseModel } from '../base'

export interface ArticleMenuModel extends BaseModel {
  /**
   * @description 父级菜单 id
   */
  parent_id?: string

  /**
   * @description 排序值
   */
  order: number

  /**
   * @description 菜单标识符；实际就是英文名
   */
  code: string

  /**
   * @description 菜单名称
   */
  title: string
}

export interface ArticleContentModel extends BaseModel {
  /**
   * @description 所属菜单
   */
  menu_id?: string

  /**
   * @description 文章创建者（第一作者）
   */
  writer_id: string

  /**
   * @description 文章协作者（可能有多个）
   */
  collaborator_ids?: string[]

  /**
   * @description 文章发布时间；根据这个进行排序
   */
  publish_at: number

  /**
   * @description 标题
   */
  title: string

  /**
   * @description 封面
   */
  cover?: string
  
  /**
   * @description 内容
   */
  content: string
}