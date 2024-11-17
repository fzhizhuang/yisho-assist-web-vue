import { defineStore } from 'pinia'
import {
  createNewChat,
  deleteHistory,
  deleteMessage,
  getChatModelList,
  getHistoryList,
  getImageModelList,
  queryAssist,
  queryMessage,
  saveMessage,
  streamCompletion
} from '@/api/openai'
import {
  type AssistQuery,
  type HistoryVO,
  MessageType,
  type MessageVO,
  type ModelVO,
  type PageAssistVO,
  Role,
  type StreamCompletion
} from '@/types/openai'

export const useOpenaiStore = defineStore('openai', {
  state: () => {
    return {
      // 分页查询助手信息
      pageAssist: null as PageAssistVO | null,
      // 历史记录列表
      historyList: [] as HistoryVO[],
      // 对话模型列表
      chatModelList: [] as ModelVO[],
      // 绘图模型列表
      imageModelList: [] as ModelVO[],
      // 当前选中的会话
      selectedSession: '',
      // 当前选中对话模型
      selectChatModel: null as ModelVO | null,
      // 当前选中的绘画模型
      selectImageModel: null as ModelVO | null,
      // 当前选中的历史记录信息
      selectedHistory: null as HistoryVO | null,
      // 当前选中的对话消息
      selectedMessage: [] as MessageVO[]
    }
  },
  actions: {
    // 分页查询助手信息
    async queryAssistPage(assistQuery: AssistQuery) {
      this.pageAssist = await queryAssist(assistQuery)
    },
    // 查询历史信息
    async queryHistoryList() {
      this.historyList = await getHistoryList()
    },
    // 更新当前选中对话模型
    updateSelectChatModel(newChatModel: ModelVO) {
      this.selectChatModel = newChatModel
    },
    // 更新当前选中的绘画模型
    updateSelectImageModel(newImageModel: ModelVO) {
      this.selectImageModel = newImageModel
    },
    // 更新选中的会话
    updateSelectedSession(sessionId: string) {
      this.selectedSession = sessionId
    },
    // 更新选中的历史记录
    updateSelectedHistory(history: HistoryVO | null) {
      this.selectedHistory = history
    },
    // 更新选中的对话消息
    updateSelectedMessage(message: MessageVO[]) {
      this.selectedMessage = message
    },
    // 创建新对话
    async createNewChat() {
      // 保存对话历史
      const historyVO = await createNewChat('1856251703377162240')
      if (historyVO) {
        // 保存对话消息
        await saveMessage({
          sessionId: historyVO.sessionId,
          content: historyVO.greeting
        })
        await this.queryMessageList(historyVO.sessionId)
      }
      // 更新选中的会话
      this.updateSelectedSession(historyVO.sessionId)
      // 查询历史信息
      await this.queryHistoryList()
    },
    // 删除会话
    async deleteChat(sessionId: string) {
      await deleteHistory(sessionId)
      await this.queryHistoryList()
      // 更新选中的会话
      this.updateSelectedSession('')
      // 更新选中的历史记录
      this.updateSelectedHistory(null)
    },
    // 查询对话消息列表
    async queryMessageList(sessionId?: string) {
      this.selectedMessage = await queryMessage(sessionId)
    },
    // 查询对话模型列表
    async queryChatModelList() {
      this.chatModelList = await getChatModelList()
      if (this.chatModelList.length > 0) {
        this.updateSelectChatModel(this.chatModelList[0])
      }
    },
    // 查询绘画模型列表
    async queryImageModelList() {
      this.imageModelList = await getImageModelList()
      if (this.imageModelList.length > 0) {
        this.updateSelectImageModel(this.imageModelList[0])
      }
    },
    // 流式对话
    async streamCompletion(params: StreamCompletion) {
      const response = await streamCompletion(params)
      // 查询对话消息列表
      await this.queryMessageList(params.sessionId)
      // 新增一条消息
      const message = {
        messageId: '',
        type: MessageType.TEXT,
        content: '',
        role: Role.ASSISTANT,
        sendTime: new Date().toISOString(),
        sessionId: params.sessionId
      }
      this.selectedMessage.push(message)
      const body = response.body
      if (body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let content = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const text = decoder.decode(value)
          console.log(text)
          content = content + text
          this.selectedMessage.pop()
          this.updateSelectedMessage(this.selectedMessage)
          this.selectedMessage.push({
            ...message,
            content: content
          })
          this.updateSelectedMessage(this.selectedMessage)
        }
      }
    },
    // 删除消息
    async deleteMessage(messageId: string) {
      await deleteMessage(messageId)
      // 查询对话消息列表
      await this.queryMessageList(this.selectedSession)
    }
  },
  persist: true
})
