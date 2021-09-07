<template>
   <el-dialog title="取消订单" v-model="cancelVisible">
       <!-- 组件内容 -->
    <div class="cancel-info">
        <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
        <p class="tip">请选择取消订单的原因（必选）：</p>
        <div class="btn">
          <a
            @click="curText = item"
            v-for="item in cancelReason"
            :key="item"
            href="javascript:;"
            :class="{ active: curText === item }"
          >
            {{ item }}
          </a>
        </div>
    </div>
  <template #footer>
    <span class="dialog-footer">
     <XtxButton type="gray" @click="cancelVisible=false" style="margin-right:20px">取消</XtxButton>
      <XtxButton type="primary" @click="submit">确认</XtxButton>
    </span>
  </template>
</el-dialog>
</template>

<script>
import { ref } from 'vue'
import { cancelReason } from '@/api/constants'
import { cancelOrder } from '@/api/order'
import { ElMessage } from 'element-plus'
export default {
  name: 'OrderCancel',
  setup () {
    const cancelVisible = ref(false)
    const curText = ref('')
    const currOrder = ref(null)
    const open = (order) => {
      cancelVisible.value = true
      currOrder.value = order
    }
    const submit = () => {
      if (!curText.value) return ElMessage.warning('亲，请选择取消原因')
      cancelOrder(currOrder.value.id, curText.value).then(() => {
        cancelVisible.value = false
        ElMessage.success({ message: '取消订单成功' })
        currOrder.value.orderState = 6
      })
    }
    return { cancelVisible, curText, cancelReason, open, submit }
  }
}
</script>

<style lang="scss">
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n){
        margin-right: 0;
      }
      &:hover,&.active {
        background-color: #e3f9f4;
        border-color: $xtxColor;
      }
    }
  }

}
.el-dialog{
  width: 620px !important;
}
 .el-dialog__footer{
    text-align: center !important;
  }
</style>
