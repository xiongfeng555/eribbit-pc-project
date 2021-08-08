<template>
  <div class="block">
    <el-carousel trigger="click" :height="height">
      <el-carousel-item v-for="item in images" :key="item.id">
         <router-link :to="item.hrefUrl">
             <img :src="item.imgUrl" class="image">
         </router-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: String,
      default: '500px'
    },
    images: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  width: 100%;
  height: 100%;
  .el-carousel {
    width: 100%;
    height: 100%;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.image{
    width: 100%;
    height: 100%;
}
</style>
