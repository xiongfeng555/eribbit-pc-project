// 封装插件

import XtxSkeleton from './xtx-skeleton.vue'
import XtxMore from './xtx-more.vue'
import defaultImg from '@/assets/images/200.png'

export default {
  install (app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxMore.name, XtxMore)
    // 定义指令
    defineDirective(app)
  }
}

// 定义指令函数
const defineDirective = (app) => {
  app.directive('lazy', {
    mounted (el, binding) {
      // 创建一个观察对象，观察当前指令的元素
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observer.unobserve(el)

          // 图片加载失败
          el.onerror = () => {
            el.src = defaultImg
          }
          // 将指令上的地址赋给el的src属性
          console.log(binding.value)
          el.src = binding.value
        }
      }, {
        threshold: 0
      })
      // 开启观察
      observer.observe(el)
    }
  })
}
