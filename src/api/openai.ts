import type {
  AssistQuery,
  HistoryVO,
  MessageVO,
  ModelVO,
  PageAssistVO,
  SaveMessage,
  StreamCompletion
} from '@/types/openai'
import request from '@/http/http'

/**
 * 查询助手
 * @param assistQuery 查询参数
 */
export function queryAssist(assistQuery: AssistQuery): Promise<PageAssistVO> {
  return request.post('/openai/queryAssist', assistQuery)
}

/**
 * 查询历史信息
 * @returns
 */
export function getHistoryList(): Promise<HistoryVO[]> {
  return request.get(`/openai/queryHistory`)
}

/**
 * 创建新对话
 * @param {string} assistId
 * @returns
 */
export function createNewChat(assistId: string): Promise<HistoryVO> {
  return request.get(`/openai/createNewChat?assistId=${assistId}`)
}

/**
 * 删除历史记录
 * @param {string} sessionId
 * @returns
 */
export function deleteHistory(sessionId: string) {
  return request.delete(`/openai/deleteHistory?sessionId=${sessionId}`)
}

/**
 * 查询消息
 * @param {string} sessionId
 * @returns
 */
export function queryMessage(sessionId?: string): Promise<Array<MessageVO>> {
  return request.get(`/openai/queryMessage?sessionId=${sessionId}`)
}

/**
 * 保存消息
 * @param {object} params 保存对话消息command
 * @param {string} params.sessionId 会话ID
 * @param {string} params.content 消息内容
 * @returns
 */
export function saveMessage(params: SaveMessage) {
  return request.post(`/openai/saveChatMessage`, params)
}

/**
 * 获取对话模型列表
 * @returns
 */
export function getChatModelList(): Promise<Array<ModelVO>> {
  return request.get(`/openai/chatModels`)
}

/**
 * 获取绘画模型列表
 * @returns
 */
export function getImageModelList(): Promise<Array<ModelVO>> {
  return request.get(`/openai/imageModels`)
}

/**
 * 流式对话
 * @param {object} params 对话query
 * @param {string} params.sessionId 会话id
 * @param {string} params.assistId 助手id
 * @param {string} params.model 模型
 * @param {array} params.messages 对话消息
 * @returns
 */
export function streamCompletion(params: StreamCompletion) {
  return request.stream(`/openai/completion`, params)
}

/**
 * 删除消息
 * @param {string} messageId
 * @returns
 */
export function deleteMessage(messageId: string) {
  return request.delete(`/openai/deleteMessage?messageId=${messageId}`)
}
