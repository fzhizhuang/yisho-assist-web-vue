<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// 接收父组件传入的Markdown内容
const props = defineProps({
  markdownContent: {
    type: String,
    required: true
  }
});

// 定义一个ref来获取DOM元素
const markdownContainer = ref(null);

// 渲染Markdown的函数
const renderMarkdown = () => {
  // 设置marked的配置，使其在解析代码块时调用highlight.js进行高亮
  marked.setOptions({
    highlight: function(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }

      return hljs.highlightAuto(code).value;
    }
  });

  markdownContainer.value.innerHTML = marked(props.markdownContent);

  // 对代码块添加highlight.js的类名以应用样式
  const codeBlocks = markdownContainer.value.querySelectorAll('pre code');
  codeBlocks.forEach((block) => {
    hljs.highlightBlock(block);
  });
};

// 在组件挂载后调用渲染函数
onMounted(() => {
  renderMarkdown();
});
</script>

<template>
  <div ref="markdownContainer" class="markdown-container"></div>
</template>

<style scoped lang="scss">
.markdown-container {
  padding: 10px 0;
}
</style>
