<script setup lang="ts">
import { computed } from 'vue';

// 定义props
const props = defineProps({
  iconName: {
    type: String,
    required: true
  }
});

// 将props中的值提取为响应式数据或计算属性以便在模板中使用更方便
const iconName = computed(() => props.iconName);
</script>

<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${iconName}`"></use>
  </svg>
</template>

<style scoped lang="scss">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
