<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === null }"
        @click="changeSort(null)"
        >默认排序</a
      >
      <a
        href="javascript:;"
        @click="changeSort('publishTime')"
        :class="{ active: sortParams.sortField === 'publishTime' }"
        >最新商品</a
      >
      <a
        href="javascript:;"
        @click="changeSort('orderNum')"
        :class="{ active: sortParams.sortField === 'orderNum' }"
        >最高人气</a
      >
      <a
        href="javascript:;"
        @click="changeSort('evaluteNum')"
        :class="{ active: sortParams.sortField === 'evaluteNum' }"
        >评论最多</a
      >
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i
          class="arrow up"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'asc',
          }"
        />
        <i
          class="arrow down"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'desc',
          }"
        />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox v-model="sortParams.inventory" @change="ChangeCheck"
        >仅显示有货商品</XtxCheckbox
      >
      <XtxCheckbox v-model="sortParams.onlyDiscount" @change="ChangeCheck"
        >仅显示特惠商品</XtxCheckbox
      >
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  name: 'SubSort',
  setup (props, { emit }) {
    // 1. 根据后台需要的参数定义数据对象
    // 2. 根据数据对象，绑定组件（复选框，排序按钮）
    // 3. 在操作排序组件的时候，需要反馈给数据对象
    // sortField====>publishTime,orderNum,price,evaluateNum
    // sortMethod====>asc为正序 desc为倒序
    const sortParams = reactive({
      inventory: false,
      onlyDiscount: false,
      sortField: null,
      sortMethod: null
    })

    const changeSort = (sortField) => {
      if (sortField === 'price') {
        sortParams.sortField = sortField
        // 处理排序
        // 处理第一次点击价格排序
        if (sortParams.sortMethod === null) {
          sortParams.sortMethod = 'desc'
        } else {
          sortParams.sortMethod =
            sortParams.sortMethod === 'asc' ? 'desc' : 'asc'
        }
      } else {
        // 重复点击失效
        if (sortParams.sortField === sortField) return
        sortParams.sortField = sortField
        sortParams.sortMethod = null
      }
      emit('sort-change', sortParams)
    }
    const ChangeCheck = () => {
      emit('sort-change', sortParams)
    }
    return {
      sortParams,
      changeSort,
      ChangeCheck
    }
  }
}
</script>
<style scoped lang='scss'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: $xtxColor;
        border-color: $xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: $xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: $xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
