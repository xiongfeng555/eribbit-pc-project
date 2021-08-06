<template>
    <!-- 顶部导航栏 -->
    <AppNav/>
    <!-- 头部组件 -->
    <header>头部组件</header>
    <!-- 内容容器 -->
    <div class="main">
        <router-view></router-view>
    </div>
    <!-- 底部组件 -->
    <footer>底部组件</footer>
</template>

<script>
import AppNav from '@/components/app-nav.vue'
export default {
  name: 'Layout',
  components: {
    AppNav
  }
}
</script>
