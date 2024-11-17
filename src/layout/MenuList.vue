<script setup lang="ts">
import Icon from '@/components/BaseIcon.vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useSettingStore } from '@/stores/setting'
import { menuList } from '@/config/menu'

const router = useRouter()
const settingStore = useSettingStore()
const { menu } = storeToRefs(settingStore)

// 路由跳转
function goToTarget(path: string) {
  settingStore.updateMenu(path)
  router.push(path)
}
</script>

<template>
  <div
    class="menu"
    v-for="item in menuList"
    :key="item.path"
    @click="goToTarget(item.path)"
    :class="{ selected: menu === item.path }"
  >
    <div class="menu-icon">
      <Icon :iconName="item.icon" class="menu-icon-item" />
    </div>
    <div class="menu-name">{{ item.name }}</div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  margin: 10px 5px;
  cursor: pointer;

  &:hover {
    border-radius: 8px;
    box-shadow:
      0 4px 8px 0 rgba(0, 0, 0, 0.1),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    background: linear-gradient(270deg, rgb(50, 51, 55) 50%, rgba(70, 79, 111, 0.5) 100%);
  }

  color: white;

  .menu-icon {
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    width: 40px; /* 可以根据需要调整宽度 */
    height: 40px; /* 可以根据需要调整高度 */
    padding-left: 10px;
  }

  .menu-name {
    flex: 1;
    padding-left: 20px;
  }
}

.menu-icon-item {
  width: 32px;
  height: 32px;
}

.selected {
  border-radius: 8px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.1),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  background: linear-gradient(270deg, rgb(50, 51, 55) 50%, rgba(70, 79, 111, 0.5) 100%);
}
</style>
