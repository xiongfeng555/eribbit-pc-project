<template>
    <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
    <!-- 步骤条 组件xtx-steps.vue-->
    <!-- 物流栏 -->
    <!-- 订单商品信息 -->
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import DetailAction from './components/order-action.vue'
import { findOrder } from '@/api/order'
import { ref } from 'vue'
export default {
  components: {
    DetailAction
  },
  setup () {
    const route = useRoute()
    const order = ref(null)
    findOrder(route.params.id).then(data => {
      order.value = data.result
    })

    return { order }
  }
}
</script>
