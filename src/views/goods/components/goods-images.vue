<template>
  <div class="goods-image">
    <div
    v-if="show"
      class="large"
      :style="[{ backgroundImage: `url(${images[currIndex]})` }, largePosition]"
    ></div>
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="" />
      <!-- 遮罩层 -->
      <div class="layer" v-if="show" :style="layerPosition"></div>
    </div>
    <ul class="small">
      <li
        v-for="(img, i) in images"
        :key="img"
        :class="{ active: i === currIndex }"
      >
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const currIndex = ref(0)
    const target = ref(null)
    const show = ref(false)
    const layerPosition = reactive({ left: 0, top: 0 })
    const largePosition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0
    })
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    watch([elementX, elementY, isOutside], () => {
      if (elementX.value < 100) {
        layerPosition.left = 0
      } else if (elementX.value > 300) {
        layerPosition.left = 200
      } else {
        layerPosition.left = elementX.value - 100
      }
      if (elementY.value < 100) {
        layerPosition.top = 0
      } else if (elementY.value > 300) {
        layerPosition.top = 200
      } else {
        layerPosition.top = elementY.value - 100
      }
      largePosition.backgroundPositionX = -layerPosition.left * 2 + 'px'
      largePosition.backgroundPositionY = -layerPosition.top * 2 + 'px'
      layerPosition.left = layerPosition.left + 'px'
      layerPosition.top = layerPosition.top + 'px'
      show.value = !isOutside.value
    })
    return { currIndex, target, show, layerPosition, largePosition }
  }
}
</script>
<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
