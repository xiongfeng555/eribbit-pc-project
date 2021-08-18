<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{goodsId?`同类商品推荐`:'猜你喜欢'}}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <Swiper :images="goodsList" height="380px"/>
  </div>
</template>

<script>
import { findRelevantGoods } from '@/api/products.js'
import { ref } from 'vue'
import Swiper from '@/components/swiper/swiper.vue'
export default {
  // 同类推荐，猜你喜欢
  name: 'GoodsRelevant',
  props: {
    goodsId: {
      type: String,
      default: ''
    }
  },
  components: {
    Swiper
  },
  setup (props) {
    console.log('1')
    const goodsList = ref([])
    findRelevantGoods(props.goodsId).then(data => {
      const pageSize = 4
      const pageTotal = Math.ceil(data.result.length / pageSize)
      for (let i = 0; i < pageTotal; i++) {
        goodsList.value.push(data.result.slice(pageSize * i, pageSize * i + 4))
      }

      console.log(goodsList.value)
    })
    return { goodsList }
  }
}
</script>

<style  lang='scss'>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid $xtxColor;
      border-right: 4px solid $xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten($xtxColor, 40%);
      }
    }
  }
  .el-carousel__arrow{
    top:30% !important;
  }
  .el-carousel__indicator{
    // background-color: #ccc !important;
    .el-carousel__button{
      background-color: #ccc;
      width: 14px !important;
      height: 14px !important;
     border-radius:50%;
    }
    &:is-active{
      background-color: $xtxColor;
    }
  }
}
</style>
