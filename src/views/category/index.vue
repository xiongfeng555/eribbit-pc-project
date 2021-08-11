<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <transition name="fade-right" mode='out-in'>
        <XtxBreadItem v-if="topCategory" :key="topCategory.id">{{ topCategory.name }}</XtxBreadItem>
        </transition>

      </XtxBread>
      <!-- 轮播图 -->
      <Swiper height="500px" :images="sliders" />
      <!-- 所有二级分类 -->
      <div class="sub-list" v-if="topCategory && topCategory.children">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in topCategory.children" :key="i.id">
            <a href="javascript:;">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <div class="ref-goods" v-for="item in subList.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore :path="`/category/sub/${item.id}`" />
        </div>
        <div class="body">
          <GoodsItem
            v-for="goods in item.goods"
            :key="goods.id"
            :goods="goods"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref, watch } from 'vue'
import { findBanner } from '@/api/home'
import Swiper from '@/components/swiper/swiper.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import GoodsItem from './components/goods-item.vue'
import { findTopCategory } from '@/api/category.js'
export default {
  name: 'TopCategory',
  components: {
    Swiper,
    GoodsItem
  },
  setup () {
    // 轮播图
    const sliders = ref([])
    const router = useRoute()
    const store = useStore()
    const topCategory = computed(() => {
      const id = router.params.id
      const list = store.state.category.list
      const obj = list.find((item) => {
        return item.id === id
      })
      return obj
    })
    // 请求轮播图数据
    findBanner().then((data) => {
      sliders.value = data.result
    })
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(router.params.id).then((data) => {
        subList.value = data.result
      })
    }
    watch(
      () => router.params.id,
      (newValue) => {
        if (newValue && `/category/${newValue}` === router.path) {
          getSubList()
        }
      },
      { immediate: true }
    )
    console.log(subList)
    return { sliders, topCategory, subList }
  }
}
</script>
<style scoped lang="scss">
.top-category {
  background: #f5f5f5;
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
  .fade-right{
    &-leave{
      &-to{
        transform: translateX(20px);
        opacity: 0;
      }
      &-from{
         transform: none;
        opacity:1
      }
      &-active{
        transition:all 0.5s linear
      }
    }
    &-enter{
      &-from{
        transform: translateX(20px);
        opacity: 0;
      }
      &-active{
        transition:all 0.5s linear
      }
       &-to{
         transform: none;
        opacity:1
      }
    }
  }
}
</style>
