<template>
  <div class="order-member">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        :label="item.label"
        :name="item.name"
        v-for="item in orderStatus"
        :key="item"
      >
        <div v-if="loading" class="loading"></div>
        <div class="none" v-if="!loading && orderList.length === 0">
          暂无数据
        </div>
        <OrderItem v-for="item in orderList" :key="item.id" :order="item" />
      </el-tab-pane>
    </el-tabs>
    <XtxPagination v-if="total>0" :currentPage="requestParams.page" :pageSize="requestParams.pageSize" :total ='total' @change="change"/>
  </div>
</template>
<script>
import { orderStatus } from '@/api/constants'
import { ref, reactive, watch } from 'vue'
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
    const loading = ref(false)
    const total = ref(0)
    watch(
      requestParams,
      () => {
        loading.value = true
        total.value = 0
        findOrderList(requestParams).then((data) => {
          orderList.value = data.result.items
          loading.value = false
          total.value = data.result.counts
        })
      },
      { immediate: true }
    )
    const handleClick = ({ index }) => {
      requestParams.page = 1
      requestParams.orderState = index
    }
    const change = ($event) => {
      console.log($event)
      requestParams.page = $event
    }
    return { activeName, orderStatus, orderList, handleClick, loading, total, requestParams, change }
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
  .loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255,255,255,.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
  .order-list {
    background: #fff;
    padding: 20px;
  }
}
</style>
