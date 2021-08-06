<template>
    <!-- 顶部导航栏 -->
    <AppNav/>
    <!-- 头部组件 -->
   <AppHeader/>
    <!-- 内容容器 -->
    <div class="main">
        <router-view></router-view>
    </div>
    <!-- 底部组件 -->
    <AppFooter/>
</template>

<script>
import AppNav from '@/components/app-nav.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
export default {
  name: 'Layout',
  components: {
    AppNav,
    AppHeader,
    AppFooter
  }
}
</script>
