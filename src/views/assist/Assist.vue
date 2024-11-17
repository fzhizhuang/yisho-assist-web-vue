<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import { useOpenaiStore } from '@/stores/openai'
import { storeToRefs } from 'pinia'

const openaiStore = useOpenaiStore()
const { pageAssist } = storeToRefs(openaiStore)
const pageNum = ref(1)
const pageSize = ref(24)

// 更新页码
function updatePageNum(page: number) {
  pageNum.value = page
}

// 查询助手信息
function query(name: string) {
  openaiStore.queryAssistPage({
    name: name,
    pageNum: pageNum.value,
    pageSize: pageSize.value
  })
}

watchEffect(() => {
  // 分页查询助手信息
  openaiStore.queryAssistPage({
    name: '',
    pageNum: pageNum.value,
    pageSize: pageSize.value
  })
})
</script>

<template>
  <div class="assist-search">
    <a-input-search style="width: 320px; height: 42px; padding-right: 10px" placeholder="搜索应用" @search="query" />
  </div>
  <div class="assist-list" v-if="pageAssist?.records">
    <a-grid :cols="4" :row-gap="10" :col-gap="24">
      <a-grid-item class="assist-list-item" v-for="(item, index) in pageAssist?.records" :key="index">
        <div class="assist-item">
          <div class="assist-item-info">
            <a-avatar :shape="'square'" :size="64" :image-url="item.avatar" />
            <div class="assist-item-title">
              <div style="font-size: 16px">{{ item.assistName }}</div>
              <div style="font-size: 14px; color: gray">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </a-grid-item>
    </a-grid>
  </div>
  <div style="display: flex; justify-content: center" v-if="pageAssist?.total">
    <a-pagination :total="pageAssist.total" :current="pageNum" :page-size="pageSize" @change="updatePageNum" />
  </div>
</template>

<style scoped lang="scss">
.assist-search {
  display: flex;
  justify-content: right;
}

.assist-list {
  margin-top: 10px;
  height: calc(100vh - 196px);
  overflow: auto;

  .col {
    cursor: pointer;
  }

  .assist-list-item {
    cursor: pointer;
  }

  .assist-list-item :hover {
    background: #cccccc;
  }

  .assist-item {
    background: #ffffff;
    display: flex;
    align-items: center;
    height: 96px;
    margin-bottom: 10px;
    border-radius: 24px;

    .assist-item-info {
      display: flex;
      padding-left: 20px;
      align-items: center;

      .assist-item-title {
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }
  }
}
</style>
