<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="item in filterData.brands"
          :key="item.id"
          :class="{active:item.id === filterData.brands.selectedBrand}"
          @click="changeBrand(item.id)"
          >{{ item.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}:</div>
      <div class="body">
        <a href="javascript:;" v-for="i in item.properties" :key="i.id" :class="{active:i.id === item.selectedAttr}" @click="changeProp(item,i.id)">{{
          i.name
        }}</a>
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category.js'
export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    const route = useRoute()
    const filterData = ref({})
    const filterLoading = ref(null)
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && `/category/sub/${newVal}` === route.path) {
          filterLoading.value = true
          findSubCategoryFilter(route.params.id).then((data) => {
            data.result.brands.unshift({ id: null, name: '全部' })
            // 给每一组数据加上一个选中的ID
            data.result.brands.selectedBrand = null

            data.result.saleProperties.forEach((item) => {
              item.selectedAttr = null
              item.properties.unshift({ id: null, name: '全部' })
            })
            filterData.value = data.result
            console.log(filterData)
            filterLoading.value = false
          })
        }
      },
      { immediate: true }
    )
    // 获取筛选参数
    const getFilterParams = () => {
      const obj = { brandId: null, attrs: [] }
      obj.brandId = filterData.value.brands.selectedBrand
      // 销售属性
      filterData.value.saleProperties.forEach(item => {
        if (item.selectedAttr) {
          // 找到选择的属性对象
          const prop = item.properties.find(prop => prop.id === item.selectedAttr)
          obj.attrs.push({ groupName: item.name, propertyName: prop.name })
        }
      })
      if (obj.attrs.length === 0) obj.attrs = null
      return obj
    }
    // 记录当前选择的品牌
    const changeBrand = (brandId) => {
      if (filterData.value.brands.selectedBrand === brandId) return
      filterData.value.brands.selectedBrand = brandId
      emit('filter-change', getFilterParams())
    }
    // 记录选择的销售属性
    const changeProp = (item, propId) => {
      if (item.selectedAttr === propId) return
      item.selectedAttr = propId
      emit('filter-change', getFilterParams())
    }
    return { filterData, filterLoading, changeBrand, changeProp, getFilterParams }
  }
}
</script>
<style scoped lang='scss'>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: $xtxColor;
        }
      }
    }
  }
  .xtx-skeleton {
    padding: 10px 0;
  }
}
</style>
