<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
    </div>
  </div>
</template>
<script>
import SubBread from './components/sub-bread.vue'
export default {
  name: 'sub',
  components: {
    SubBread
  }
}
</script>
