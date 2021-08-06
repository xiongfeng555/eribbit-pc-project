import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout.vue')
const Home = () => import('@/views/home')

const routes = [
  // 一级路由布局
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/', component: Home
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
