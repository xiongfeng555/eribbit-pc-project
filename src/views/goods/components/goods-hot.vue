<template>
  <div class="goods-hot">
    <h3>{{title}}</h3>
    <div v-if="hotList">
        <GoodsItem v-for="item in hotList" :key="item.id" :goods="item"/>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import GoodsItem from '@/views/category/components/goods-item.vue'
import { findGoodsHot } from '@/api/products.js'
import { useRoute } from 'vue-router'
export default {
  name: 'GoodsHot',
  components: { GoodsItem },
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  setup (props) {
    const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    const title = computed(() => {
      return titleObj[props.type]
    })
    const hotList = ref([])
    const route = useRoute()
    findGoodsHot(route.params.id, 3, props.type).then((data) => {
      hotList.value = data.result
      console.log(data.result)
    })
    return { title, hotList }
  }
}
</script>
<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background-color: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
