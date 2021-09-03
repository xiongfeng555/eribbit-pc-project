// 提供复用逻辑的钩子
import { ref, onUnmounted } from 'vue'

import dayjs from 'dayjs'
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
export const useLazyData = (target, apiFn) => {
  const result = ref([])
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
    //   targetIsVisible.value = isIntersecting
      if (isIntersecting) {
        stop()
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    {
      threshold: 0.000001
    }
  )
  return result
}

export const downMinuteTime = () => {
  const time = ref(0)
  const timeText = ref('')
  const { resume, pause } = useIntervalFn(() => {
    time.value--
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    if (time.value < 0) {
      pause()
    }
  }, 1000, false)
  const start = (countDown) => {
    time.value = countDown
    resume()
  }
  onUnmounted(() => {
    pause()
  })
  return {
    timeText, start
  }
}
