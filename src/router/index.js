import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

const Layout = () => import('@/views/Layout.vue')
const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/category/index.vue')
const SubCategory = () => import('@/views/category/sub.vue')
const Goods = () => import('@/views/goods/index')
const Login = () => import('@/views/login/index')
const LoginCallback = () => import('@/views/login/callback.vue')
const Cart = () => import('@/views/cart/index')
const CheckOut = () => import('@/views/member/pay/checkout.vue')
const Pay = () => import('@/views/member/pay/index.vue')
const PayCallback = () => import('@/views/member/pay/pay-callback.vue')
const MemberLayout = () => import('@/views/member/Layout')
const MemberHome = () => import('@/views/member/home')

const routes = [
  // 一级路由布局
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/category/:id',
        component: TopCategory
      },
      {
        path: '/category/sub/:id',
        component: SubCategory
      },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart },
      { path: '/member/checkout', component: CheckOut },
      { path: '/member/pay', component: Pay },
      { path: '/pay/callback', component: PayCallback },
      {
        path: '/member',
        component: MemberLayout,
        children: [
          { path: '/member', component: MemberHome }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/login/callback',
    component: LoginCallback
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次路由切换的时候返回到页面顶端
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const { profile } = store.state.user
  if (!profile.token && to.path.startsWith('/member')) {
    return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})

export default router
