// 助手VO
export interface AssistVO {
  assistId: string
  assistName: string
  greeting: string
  desc: string
  avatar: string
  prompt: string
}

// 分页助手VO
export interface PageAssistVO {
  current: number
  records?: AssistVO[]
  size: number
  total: number
}

// 助手查询参数
export interface AssistQuery {
  pageNum: number
  pageSize: number
  name: string
}

export interface HistoryVO {
  /*会话ID */
  sessionId: string

  /*用户ID */
  userId: string

  /*助手ID */
  assistId: string

  /*助手名 */
  assistName: string

  /*助手描述 */
  assistDesc: string

  /*问候语 */
  greeting: string

  /*prompt */
  prompt: string

  /*历史内容 */
  content: string

  /*头像 */
  avatar: string

  /*发送时间 */
  sendTime: string
}

export interface MessageVO {
  /* 消息ID */
  messageId?: string

  /* 会话ID */
  sessionId?: string

  /* 消息内容 */
  content?: string

  /*可用值:TEXT,URL */
  type?: string

  /*可用值:USER,ASSIST */
  role?: string

  /* 发送时间 */
  sendTime?: string
}

export interface SaveMessage {
  /*会话ID */
  sessionId: string

  /*消息内容 */
  content: string
}

export interface StreamCompletion {
  /*会话id */
  sessionId?: string

  /*助手id */
  assistId?: string

  /*模型 */
  model?: string

  /*对话消息 */
  messages?: {
    /*角色 */
    role?: string

    /*内容 */
    content?: string
  }[]
}

export interface ModelVO {
  /*模型ID */
  modelId: string

  /*模型名称 */
  modelName: string

  /*模型编码 */
  modelCode: string

  /*模型调用额度 */
  modelQuota: number
}

export enum Role {
  USER = 'user',
  ASSISTANT = 'assistant'
}

export enum MessageType {
  TEXT = 'TEXT',
  URL = 'URL'
}
