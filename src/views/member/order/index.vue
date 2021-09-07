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
        <OrderItem
          v-for="item in orderList"
          :key="item.id"
          :order="item"
          @cancel-order="cancel"
          @order-delete="deleteOrder"
          @confirm-order="onConfirmOrder"
          @logistic-order="onLogisticOrder"
        />
      </el-tab-pane>
    </el-tabs>
    <XtxPagination
      v-if="total > 0"
      :currentPage="requestParams.page"
      :pageSize="requestParams.pageSize"
      :total="total"
      @change="change"
    />
  </div>
  <OrderCancel ref="orderCancel" />
  <OrderLogistic ref="logisticDom"/>
</template>
<script>
import { orderStatus } from '@/api/constants'
import { ref, reactive, watch } from 'vue'
import OrderItem from './components/order-item.vue'
import { findOrderList, deleteOrders, confirmOrder } from '@/api/order'
import OrderCancel from './components/order-cancel.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import OrderLogistic from './components/order-logistics.vue'
export const onConfirmOrder = (order) => {
  ElMessageBox.confirm('您确认收到货吗？确认后货款将会打给卖家', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    confirmOrder(order.id).then(() => {
      order.orderState = 4
      ElMessage({
        type: 'success',
        message: '确认收货成功!'
      })
    })
  })
}
export default {
  components: { OrderItem, OrderCancel, OrderLogistic },
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
    const findOrderListFn = () => {
      loading.value = true
      total.value = 0
      findOrderList(requestParams).then((data) => {
        findOrderList(requestParams).then((data) => {
          orderList.value = data.result.items
          loading.value = false
          total.value = data.result.counts
        })
      })
    }
    watch(
      requestParams,
      () => {
        findOrderListFn()
      },
      { immediate: true }
    )
    const handleClick = ({ index }) => {
      requestParams.page = 1
      requestParams.orderState = index
    }
    const change = ($event) => {
      requestParams.page = $event
    }
    const orderCancel = ref(null)
    const cancel = (order) => {
      orderCancel.value.open(order)
    }
    const deleteOrder = (id) => {
      ElMessageBox.confirm('您确认删除该条订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOrders([id]).then(() => {
          findOrderListFn()
          ElMessage({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    }

    const logisticDom = ref(null)
    const onLogisticOrder = (order) => {
      logisticDom.value.open(order)
    }
    return {
      activeName,
      orderStatus,
      orderList,
      handleClick,
      loading,
      total,
      requestParams,
      change,
      orderCancel,
      cancel,
      deleteOrder,
      onConfirmOrder,
      logisticDom,
      onLogisticOrder
    }
  }
}
</script>
<style lang="scss">
.order-member {
  min-height: 600px;
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
    background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif)
      no-repeat center;
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
