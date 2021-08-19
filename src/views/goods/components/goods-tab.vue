<template>
      <div class="goods-tabs">
    <nav>
      <a :class="{active:changeName === 'goodsDetail'}" @click="changeName = 'goodsDetail'" href="javascript:;">商品详情</a>
      <a :class="{active:changeName === 'goodsComment'}" @click="changeName ='goodsComment'" href="javascript:;">商品评价<span>(500+)</span></a>
    </nav>
    <!-- 切换内容的地方 -->
    <component :is="changeName"></component>
  </div>
</template>
<script>
import { ref } from 'vue'
import GoodsDetail from './goods-detail.vue'
import GoodsComment from './goods-comment.vue'
export default {
  name: 'GoodsTab',
  components: { GoodsDetail, GoodsComment },
  setup () {
    const changeName = ref('goodsDetail')
    return { changeName }
  }
}
</script>
  <style lang="scss" scoped>
  .goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: $xtxColor;
        }
      }
    }
  }
}
  </style>
