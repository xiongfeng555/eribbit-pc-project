<template>
  <div class="xtx-pagination">
    <a href="javascript:;" v-if="myCurrentPage > 1" @click="changePage(-1)">上一页</a>
    <a href="javascript:;" class="disabled" v-else>上一页</a>
    <span v-if="pager.start > 1">...</span>
    <a
      href="javascript:;"
      :class="{ active: myCurrentPage === i }"
      v-for="i in pager.btnArr"
      :key="i"
      @click="jumpPage(i)"
      >{{ i }}</a
    >
    <span v-if="pager.end < pager.pageCount">...</span>
    <a href="javascript:;" v-if="myCurrentPage < pager.pageCount" @click="changePage(1)">下一页</a>
    <a href="javascript:;" v-else class="disabled">下一页</a>
  </div>
</template>
<script>
import { ref, computed, watch } from 'vue'
export default {
  name: 'XtxPagination',
  props: {
    total: {
      type: Number,
      default: 100
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  setup (props, { emit }) {
    // 总条数
    const myTotal = ref(100)
    // 每页条数
    const myPageSize = ref(10)
    // 当前第几页
    const myCurrentPage = ref(1)
    // 按钮个数
    const btnCount = 5

    watch(props, () => {
      myTotal.value = props.total
      myPageSize.value = props.pageSize
      myCurrentPage.value = props.currentPage
    }, { immediate: true })
    // 重点：根据上述数据得到（总页数，起始页码，结束页码，按钮数组）
    const pager = computed(() => {
      // 计算总页数
      const pageCount = Math.ceil(myTotal.value / myPageSize.value)
      // 计算起始页码和结束页码
      // 1. 理想情况根据当前页码，和按钮个数可得到
      let start = myCurrentPage.value - Math.floor(btnCount / 2)
      let end = start + btnCount - 1
      // 2.1 如果起始页码小于1了，需要重新计算
      if (start < 1) {
        start = 1
        end =
          start + btnCount - 1 > pageCount ? pageCount : start + btnCount - 1
      }
      // 2.2 如果结束页码大于总页数，需要重新计算
      if (end > pageCount) {
        end = pageCount
        start = end - btnCount + 1 < 1 ? 1 : end - btnCount + 1
      }
      // 处理完毕start和end得到按钮数组
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }

      return { pageCount, start, end, btnArr }
    })
    const changePage = (i) => {
      const nowValue = i + myCurrentPage.value
      if (nowValue < 1 || nowValue > pager.value.pageCount) return
      myCurrentPage.value = nowValue
      emit('change', myCurrentPage.value)
    }

    const jumpPage = (i) => {
      myCurrentPage.value = i
      emit('change', myCurrentPage.value)
    }

    return { pager, myCurrentPage, changePage, jumpPage }
  }
}
</script>
<style scoped lang="scss">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: $xtxColor;
    }
    &.active {
      background: $xtxColor;
      color: #fff;
      border-color: $xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
