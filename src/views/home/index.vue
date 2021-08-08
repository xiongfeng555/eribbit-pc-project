<template>
<!-- 首页入口 -->
  <div class="home-entry">
    <div class="container home-swiper-nav">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <div class="home-swiper">
          <Swiper height="500px" :images="images"/>
      </div>
    </div>
  </div>
  <!-- 新鲜好物 -->
</template>
<script>
import HomeCategory from './home-category.vue'
import Swiper from '@/components/swiper/swiper.vue'
import { findBanner } from '@/api/home'
import { ref } from 'vue'
export default {
  components: {
    HomeCategory,
    Swiper
  },
  setup () {
    // 过去轮播图组件
    const images = ref([])
    findBanner().then(data => {
      images.value = data.result
      console.log(data.result)
    })
    return { images }
  }
}
</script>
<style lang="scss">
// .container{
//     @include hoverShadow()
// }
.home-entry{
    background: #f5f5f5;
    position: relative;
}
    .home-swiper{
        width: 1240px;
        height: 500px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 98;
        .el-carousel__arrow--left{
                left: 270px !important;
            }
           .el-carousel__indicators--horizontal{
               left: 59% !important;
               bottom: 20px;
           }
    }
</style>
