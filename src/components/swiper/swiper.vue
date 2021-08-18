<template>
  <div class="block">
    <el-carousel trigger="click" :height="height" v-if="images.length">
      <el-carousel-item v-for="item in images" :key="item.id">
        <router-link :to="item.hrefUrl" v-if="item.imgUrl">
          <img :src="item.imgUrl" class="image" />
        </router-link>
        <div v-else class="slider">
          <RouterLink
            v-for="goods in item"
            :key="goods.id"
            :to="`/product/${goods.id}`"
          >
            <img :src="goods.picture" alt="" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </RouterLink>
        </div>
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
  .slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 230px!important;
      height: 230px!important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: $priceColor;
      margin-top: 15px;
    }
  }
}
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.image {
  width: 100%;
  height: 100%;
}
</style>
