<template>
  <div class="cart-sku" @click="toggle" ref="target">
    <div class="attrs">
      <span class="ellipsis">{{attrsText}}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visiable">
      <div class="loading" v-if="loading"></div>
      <GoodsSku :goods="goods" :skuId="skuId" v-else/>
      <XtxButton v-if="goods" size="mini" type="primary" @click="submit()" style="margin-left:60px">确认</XtxButton>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { getGoodsSku } from '@/api/cart.js'
import GoodsSku from '@/views/goods/components/goods-sku.vue'
export default {
  name: 'CartSku',
  components: { GoodsSku },
  props: {
    attrsText: {
      type: String,
      default: ''
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const visiable = ref(false)
    const target = ref(null)
    const goods = ref(null)
    const loading = ref(true)

    const open = () => {
      loading.value = true
      visiable.value = true
      getGoodsSku(props.skuId).then(data => {
        goods.value = data.result
        loading.value = false
      })
    }
    const close = () => {
      visiable.value = false
    }
    const toggle = () => {
      visiable.value ? close() : open()
    }
    onClickOutside(target, () => {
      close()
    })
    return { visiable, toggle, target, goods, loading }
  }
}
</script>
<style scoped lang="scss">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display:inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid $xtxColor;
    box-shadow: 2px 2px 4px lighten($xtxColor,50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid $xtxColor;
      border-top: 1px solid $xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(.8,1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
