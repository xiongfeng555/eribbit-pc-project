<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: show }">
      <span class="placeholder" v-if="!fullLocation">请选择配送地址</span>
      <span class="value" v-else>{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="show">
      <div class="loading" v-if="loading"></div>
      <template v-else>
        <span
          class="ellipsis"
          v-for="city in currentList"
          :key="city.code"
          @click="toggleCity(city)"
          >{{ city.name }}</span
        >
      </template>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const show = ref(false)
    const target = ref(null)
    const cityList = ref([]) // 所有城市数据变量
    const loading = ref(false)
    const open = () => {
      loading.value = true
      show.value = true
      cityList.value = []
      getCityData().then((data) => {
        cityList.value = data
        loading.value = false
        console.log(data)
      })
    }
    const close = () => {
      show.value = false
    }
    const toggle = () => {
      show.value ? close() : open()
    }
    // 点击组件外部隐藏操作
    onClickOutside(target, (event) => close())
    const toggleCity = (item) => {
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      if (item.level === 2) {
        changeResult.countryCode = item.code
        changeResult.countryName = item.name
      }
      if (item.areaList) {
        cityList.value = item.areaList
      } else {
        changeResult.fullLocation =
          changeResult.provinceName +
          ' ' +
          changeResult.cityName +
          ' ' +
          changeResult.countryName
        close()
        emit('change', changeResult)
        // props.fullLocation = changeResult.value.fullLocation
      }
    }
    const currentList = computed(() => {
      console.log('computed')
      const list = cityList.value
      //   if(changeResult.value.provinceCode && changeResult.provinceName){
      //       list = list.find(p=>p.code)
      //   }
      return list
    })
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countryCode: '',
      countryName: '',
      fullLocation: ''
    })
    return { show, toggle, target, cityList, toggleCity, currentList, loading }
  }
}
// 获取城市数据
// https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
const getCityData = () => {
  return new Promise((resolve, reject) => {
    // 缓存如果有数据
    if (window.cityData) {
      resolve(window.cityData)
    } else {
      axios
        .get(
          'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
        )
        .then((res) => {
          window.cityData = res.data
          resolve(res.data)
        })
    }
  })
}
</script>

<style scoped lang="scss">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
