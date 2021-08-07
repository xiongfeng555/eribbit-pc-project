<template>
    <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory/>
        <!-- 轮播图 -->
    </div>
</template>
<script>
import HomeCategory from './home-category.vue'
export default {
  components: {
    HomeCategory
  }
}
</script>
<style lang="scss" scoped>
// .container{
//     @include hoverShadow()
// }
</style>
