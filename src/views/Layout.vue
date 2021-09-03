<template>
    <!-- 顶部导航栏 -->
    <AppNav/>
    <!-- 吸顶头部 -->
    <AppHeaderSticky/>
    <!-- 头部组件 -->
   <AppHeader/>
    <!-- 内容容器 -->
    <div class="app-main">
        <router-view></router-view>
    </div>
    <!-- 底部组件 -->
    <AppFooter/>
</template>

<script>
import AppNav from '@/components/app-nav.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
export default {
  name: 'Layout',
  components: {
    AppNav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  }
}
</script>
<style lang="scss" scoped>
  .app-main{
    // min-height: 600px;
    background: #f5f5f5;
  }
</style>
