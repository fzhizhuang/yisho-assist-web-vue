<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

// 接收父组件传入的Markdown内容
const { markdownContent } = defineProps<{
  markdownContent: string
}>()

// 定义一个ref来获取DOM元素
const markdownContainer = ref(null)

// 渲染Markdown的函数
const renderMarkdown = () => {
  // 设置marked的配置，使其在解析代码块时调用highlight.js进行高亮
  marked.setOptions({
    highlight: function (code: any, lang: any) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value
      }
      return hljs.highlightAuto(code).value
    }
  })
  markdownContainer.value.innerHTML = marked(markdownContent)
  const codeBlocks = markdownContainer.value.querySelectorAll('pre code')
  codeBlocks.forEach((block: any) => {
    hljs.highlightElement(block)

    // 获取代码块的语言类型（如JavaScript等）
    const lang = block
      .getAttribute('class')
      ?.split(' ')
      .find((cls: any) => cls.startsWith('language-'))
    const language = lang ? lang.replace('language-', '') : '未知'

    // 为每个代码块添加包含代码类型的标题元素
    const codeTitle = document.createElement('div')
    codeTitle.textContent = `${language}代码`
    codeTitle.classList.add('code-title')

    // 将代码类型标题添加到代码块顶部
    const codeBlockWrapper = block.parentNode
    codeBlockWrapper.insertBefore(codeTitle, codeBlockWrapper.firstChild)

    // 为每个代码块添加复制按钮
    const copyButton = document.createElement('button')
    copyButton.textContent = '复制'
    copyButton.classList.add('copy-button')

    // 设置复制按钮初始状态为可点击
    copyButton.setAttribute('data-status', 'copy')

    // 将复制按钮添加到代码块顶部，位于代码类型标题之后
    codeBlockWrapper.insertBefore(copyButton, codeBlockWrapper.children[1])

    // 使用flex布局设置代码类型和复制按钮的排列方式
    const codeBlockTopWrapper = document.createElement('div')
    codeBlockTopWrapper.classList.add('code-block-top-wrapper')
    codeBlockTopWrapper.appendChild(codeTitle)
    codeBlockTopWrapper.appendChild(copyButton)

    codeBlockWrapper.insertBefore(codeBlockTopWrapper, codeBlockWrapper.firstChild)

    // 绑定复制按钮的点击事件
    copyButton.addEventListener('click', async () => {
      const codeText = block.textContent
      await navigator.clipboard.writeText(codeText)

      // 点击后将按钮文本改为已复制
      copyButton.textContent = '已复制'
      copyButton.setAttribute('data-status', 'copied')

      // 1秒后恢复按钮文本为复制
      setTimeout(() => {
        if (copyButton.getAttribute('data-status') === 'copied') {
          copyButton.textContent = '复制'
          copyButton.setAttribute('data-status', 'copy')
        }
      }, 2000)
    })
  })
}

// 在组件挂载后调用渲染函数
onMounted(() => {
  renderMarkdown()
})
</script>

<template>
  <div ref="markdownContainer" class="markdown-container"></div>
</template>

<style lang="scss">
.markdown-container {
  padding: 10px 10px;
  margin: 0;
  font-size: 16px;
  border-radius: 12px;
}

.code-title {
  background-color: #373e48;
  color: white;
  padding: 5px 10px;
  font-size: 16px;
  margin: 0;
}

.copy-button {
  background-color: #ffa39e;
  color: white;
  border: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

.code-block-top-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f0f0f0;
}
</style>
