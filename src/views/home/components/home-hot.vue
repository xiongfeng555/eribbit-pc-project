<template>
  <div class="home-hot" ref="target">
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
      <transition name="fade">
        <ul ref="pannel" class="goods-list" v-if="list.length">
          <li v-for="item in list" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </transition>
    </HomePanel>
  </div>
</template>
<script>
import { ref } from 'vue'
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
import { findHot } from '@/api/home'
import { useLazyData } from '@/hooks'
export default {
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    // const list = ref([])
    const target = ref(null)
    // findHot().then((data) => {
    //   list.value = data.result
    // })

    // 懒加载
    const result = useLazyData(target, findHot)

    return {
      list: result,
      target
    }
  }
}
</script>
<style lang="scss" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    @include hoverShadow;
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
