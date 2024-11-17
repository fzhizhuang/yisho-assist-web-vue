import { ref, onMounted, onUnmounted } from 'vue'

export function useCounter(initCount = 60) {
  const count = ref(initCount)
  const text = ref('获取验证码')
  const isSend = ref(false)

  let intervalId: any

  const startCountdown = () => {
    if (isSend.value && count.value > 0) {
      intervalId = setInterval(() => {
        count.value--
        if (count.value > 0) {
          text.value = `${count.value}秒后重新发送`
        } else {
          // 当倒计时小于等于0时的处理
          isSend.value = false
          count.value = initCount
          text.value = '获取验证码'
          clearInterval(intervalId)
        }
      }, 1000)
    }
  }

  const handleCounter = () => {
    isSend.value = true
    startCountdown()
  }

  onMounted(() => {
    startCountdown()
  })

  onUnmounted(() => {
    clearInterval(intervalId)
  })

  return { count, text, handleCounter, isSend }
}
