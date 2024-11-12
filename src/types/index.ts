/**
 * 历史记录
 */
export interface History {
  // 会话id
  chatId?: string
  // 助手名
  assistant?: string
  // 助手头像
  avatar?: string
  // 对话标题
  title?: string
  // 发送时间
  sendTime?: string
}

/**
 * 模型
 */
export interface Model {
  // 模型唯一标识
  mid?: string
  // 模型名称
  name?: string
  // 模型代码
  code?: string
  // 模型描述
  description?: string
  // 模型类型
  type?: number
  // 模型价格
  price?: number
}

/**
 * 消息
 */
export interface OpenaiMessage {
  // 消息ID
  messageId?: string
  // 对话ID
  chatId?: string
  // 昵称
  nickname?: string
  // 头像
  avatar?: string
  // 消息内容
  content?: string
  // 消息类型
  type?: 'text' | 'image'
  // 消息角色
  role?: 'user' | 'assistant'
  // 发送时间
  sendTime?: string
}

export const Regx = {
  password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,12}$/,
  passwordError: '密码必须包含字母和数字,4-12位',
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  emailError: '非法邮箱',
  code: /^[0-9]{4}$/,
  codeError: '验证码必须为4位数字'
}
