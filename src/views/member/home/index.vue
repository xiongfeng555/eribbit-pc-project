<template>
  <div class="member-home">
          <!-- 概览 -->
    <HomeOverview />
    <!-- 收藏 -->
    <HomePanel title="我的收藏">
      <GoodsItem v-for="item in collectGoods" :key="item.id" :goods="item"/>
    </HomePanel>
    <!-- 足迹 -->
    <HomePanel title="我的足迹"></HomePanel>
    <!-- 猜你 -->
    <GoodsRelevant />
  </div>
</template>
<script>
import HomeOverview from './components/home-overview'
import HomePanel from './components/home-panel'
import GoodsRelevant from '@/views/goods/components/goods-relevant'
import { ref } from 'vue'
import { findCollect } from '@/api/member.js'
import GoodsItem from '@/views/category/components/goods-item.vue'
export default {
  name: 'MemberHome',
  components: {
    HomeOverview,
    HomePanel,
    GoodsRelevant,
    GoodsItem
  },
  setup () {
    // 调用模拟的接口
    const collectGoods = ref([])
    findCollect({
      page: 1,
      pageSize: 4
    }).then(data => {
      collectGoods.value = data.result.items
      console.log(collectGoods.value)
    })

    return { collectGoods }
  }
}
</script>

<style lang="scss">
  .member-home {
  .el-carousel__arrow{
    &.el-carousel__arrow--left {
    left:4px !important;
  }
  &.el-carousel__arrow--right{
    right: 2px !important;
  }
  }
    .goods-list {
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
  }
  }
</style>
