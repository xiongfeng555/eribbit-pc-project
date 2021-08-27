<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem
          :to="`/category/` + goods.categories[1].id"
          v-if="goods && goods.categories"
          >{{ goods.categories[1].name }}</XtxBreadItem
        >
        <XtxBreadItem
          :to="`/category/sub/` + goods.categories[0].id"
          v-if="goods && goods.categories"
          >{{ goods.categories[0].name }}</XtxBreadItem
        >
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
            <GoodsImage :images="goods.mainPictures"/>
            <GoodsSales/>
        </div>
        <div class="spec">
            <GoodsName :goods="goods"/>
            <GoodsSku :goods="goods" skuId="1369155865461919746" @change="changeSku"/>
            <XtxNumbox v-model="count" @update:modelValue="changeNum" :max="goods.inventory"/>
            <XtxButton type="primary" size="large" style="margin-top:20px" @click="addCart">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant v-if="goods" :goodsId="goods.id"/>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTab/>
          <!-- 注意事项 -->
          <div class="goods-warn">
            <GoodsWarn/>
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :type="1"/>
          <GoodsHot :type="2"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import { findGoods } from '@/api/products'
import { nextTick, provide, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import GoodsImage from './components/goods-images.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsTab from './components/goods-tab.vue'
import GoodsHot from './components/goods-hot'
import GoodsWarn from './components/goods-warn.vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName, GoodsSku, GoodsTab, GoodsHot, GoodsWarn },
  setup () {
    // 获取商品数据
    const goods = useGoods()
    const currSku = ref(null)
    const store = useStore()
    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
      currSku.value = sku
    }
    const count = ref(1)
    const changeNum = (newValue) => {
      count.value = newValue
    }
    provide('goods', goods)
    const addCart = () => {
      if (currSku.value && currSku.value.skuId) {
        store.dispatch('cart/addCart', {
          id: goods.value.id,
          skuId: currSku.value.skuId,
          name: goods.value.name,
          picture: goods.value.mainPictures[0],
          price: currSku.value.price,
          nowPrice: currSku.value.price,
          count: count.value,
          attrsText: currSku.value.specsText,
          selected: true,
          isEffective: true,
          stock: currSku.value.inventory
        })
      } else {
        ElMessage.warning({
          message: '请选择规格'
        })
      }
    }
    return { goods, changeSku, count, changeNum, addCart }
  }
}
const useGoods = () => {
  const goods = ref(null)
  const route = useRoute()
  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id).then((data) => {
          goods.value = null
          nextTick(() => {
            goods.value = data.result
          })
        })
      }
    },
    { immediate: true }
  )

  return goods
}
</script>

<style scoped lang='scss'>
.xtx-goods-page {
  background: #f5f5f5;
}
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 580px;
  background: #fff;
  margin: 20px 0;
}
</style>
