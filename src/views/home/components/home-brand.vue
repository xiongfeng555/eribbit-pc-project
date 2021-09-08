<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a
        @click="toggle(-1)"
        :class="{ disabled: index === 0 }"
        href="javascript:;"
        class="iconfont icon-angle-left prev"
      ></a>
      <a
        @click="toggle(1)"
        :class="{ disabled: index === 1 }"
        href="javascript:;"
        class="iconfont icon-angle-right next"
      ></a>
    </template>
    <div class="box" ref="target">

        <ul
          class="list"
          :style="{ transform: `translate(${-index * 1240}px)` }"
          v-if="goods.length"
        >
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          <XtxSkeleton
            class="item"
            v-for="i in 5"
            :key="i"
            animated
            bg="#e4e4e4"
            width="240px"
            height="305px"
          />
        </div>

    </div>
  </HomePanel>
</template>

<script>
import { ref } from 'vue'
import HomePanel from './home-panel'
import { findBrand } from '@/api/home'
import { useLazyData } from '@/hooks'
export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup () {
    // 获取商品数据
    // const goods = ref([])
    // findBrand(10).then((data) => {
    //   goods.value = data.result
    // })

    // 实现数据懒加载
    const target = ref(null)
    const result = useLazyData(target, () => findBrand(10))

    // 实现翻页效果
    const index = ref(0)

    const toggle = (step) => {
      const toIndex = index.value + step // 准备走的页码
      if (toIndex < 0 || toIndex > 1) return // 只有0 和 1 两页
      index.value = toIndex
    }
    return { goods: result, toggle, index, target }
  }
}
</script>

<style scoped lang='scss'>
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: $xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      @include hoverShadow;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
  .skeleton {
    width: 100%;
    display: flex;
    .item {
      margin-right: 10px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
