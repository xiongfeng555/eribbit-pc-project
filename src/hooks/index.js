// 提供复用逻辑的钩子

import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
export const useLazyData = (target, apiFn) => {
  const result = ref([])
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
    //   targetIsVisible.value = isIntersecting
      if (isIntersecting) {
        console.log('进入可视区')
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
