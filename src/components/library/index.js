// 封装插件

import XtxSkeleton from './xtx-skeleton.vue'
import XtxMore from './xtx-more.vue'

export default {
  install (app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxMore.name, XtxMore)
  }
}
