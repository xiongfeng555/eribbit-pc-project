<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 帅选区 -->
      <SubFilter />
      <!-- 商品面板 -->
      <div class="goods-list">
        <SubSort @sort-change="sortChange"/>
        <!-- 商品区 -->
        <ul>
          <li v-for="item in goodsList" :key="item.id">
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <XtxInfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item'
import { useRoute } from 'vue-router'
import { findSubCategoryGoods } from '@/api/category'
export default {
  name: 'sub',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup () {
    const isAllChecked = ref(true)
    // 1. 基础布局
    // 2. 无限加载组件
    // 3. 动态加载数据且渲染
    // 4. 任何筛选条件变化需要更新列表
    const route = useRoute()

    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    // 查询参数
    const reqParams = {
      page: 1,
      pageSize: 20
    }
    // 获取数据函数
    const getData = () => {
      loading.value = true
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          // 加载完毕
          finished.value = true
        }
        // 请求结束
        loading.value = false
      })
    }
    // 切换二级分类重新加载
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && route.path === '/category/sub/' + newVal) {
          goodsList.value = []
          reqParams.value = {
            page: 1,
            pageSize: 20
          }
          finished.value = false
        }
      }
    )
    // 更改排序组件的筛选数据，重新请求
    const sortChange = (sortParams) => {
      finished.value = false
      // 合并参数，保留之前参数
      reqParams.value = { ...reqParams, ...sortParams }
      reqParams.value.page = 1
      goodsList.value = []
    }

    return { isAllChecked, loading, finished, goodsList, getData, sortChange }
  }
}
</script>
<style lang="scss" scoped>
.top-category {
  background: #f5f5f5;
}
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
