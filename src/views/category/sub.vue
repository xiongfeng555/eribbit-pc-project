<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 帅选区 -->
      <SubFilter/>
    </div>
  </div>
</template>
<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
export default {
  name: 'sub',
  components: {
    SubBread,
    SubFilter
  }
}
</script>
