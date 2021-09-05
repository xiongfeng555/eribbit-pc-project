<template>
  <div class="order-member">
    <el-tabs v-model="activeName">
      <el-tab-pane
        :label="item.label"
        :name="item.name"
        v-for="item in orderStatus"
        :key="item"
      >
    <OrderItem v-for="item in orderList" :key="item.id" :order="item"/>
      </el-tab-pane>
    </el-tabs>
    <XtxPagination />
  </div>
</template>
<script>
import { orderStatus } from '@/api/constants'
import { ref, reactive } from 'vue'
import OrderItem from './components/order-item.vue'
import { findOrderList } from '@/api/order'
export default {
  components: { OrderItem },
  setup () {
    const activeName = ref('all')
    // 查询订单参数
    const requestParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    // 订单列表
    const orderList = ref([])
    // 查询订单
    findOrderList(requestParams).then(data => {
      orderList.value = data.result.items
      console.log(orderList.value)
    })

    return { activeName, orderStatus, orderList }
  }
}
</script>
<style lang="scss">
.order-member {
  height: 100%;
  background: #fff;
  .el-tabs {
    background: #fff !important;
    .el-tabs__header {
      padding-left: 15px !important ;
    }
  }
  .order-list {
    background: #fff;
    padding: 20px;
  }

}
</style>
