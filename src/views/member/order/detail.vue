<template>
    <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
    <!-- 步骤条 组件xtx-steps.vue-->
       <!-- 步骤条-->
    <XtxSteps :active='order.orderState===6?0:order.orderState'>
      <XtxStepsItem title="提交订单" :desc="order.createTime" />
      <XtxStepsItem title="付款成功"  :desc="order.payTime?order.payTime:''"/>
      <XtxStepsItem title="商品发货" :desc="order.consignTime?order.consingTime:''" />
      <XtxStepsItem title="确认收货" :desc="order.endTime?order.endTime:''"/>
      <XtxStepsItem title="订单完成" :desc="order.closeTime?order.closeTime:''"/>
    </XtxSteps>
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
