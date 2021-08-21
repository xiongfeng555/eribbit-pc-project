<template>
  <div class="goods-comment" v-if="commentInfo">
    <div class="head">
      <div class="data">
        <p>
          <span>{{ commentInfo.evaluateCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <!-- <a href="javascript:;" class="active">全部评价（{{commentInfo.salesCount}}）</a> -->
          <a
            href="javascript:;"
            v-for="(item, i) in commentInfo.tags"
            :key="item"
            :class="{ active: currentTagIndex === i }"
            @click="changeIndex(i)"
            >{{ item.title }}（{{ item.tagCount }}）</a
          >
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a
        href="javascript:;"
        :class="{ active: reqParams.sortField === null }"
        @click="reqParams.sortField = null"
        >默认</a
      >
      <a
        href="javascript:;"
        :class="{ active: reqParams.sortField === 'createTime' }"
        @click="reqParams.sortField = 'createTime'"
        >最新</a
      >
      <a
        href="javascript:;"
        :class="{ active: reqParams.sortField === 'praiseCount' }"
        @click="reqParams.sortField = 'praiseCount'"
        >最热</a
      >
    </div>
    <!-- 列表 -->
    <div class="list">
      <div class="item" v-for="item in commentList" :key="item">
        <div class="user">
          <img
            :src="item.member.avatar"
            alt=""
          />
          <span>{{formatNickName(item.member.nickname)}}</span>
        </div>
        <div class="body">
          <div class="score">
            <i class="iconfont icon-wjx01" v-for="i in item.score" :key="i"></i>
            <i class="iconfont icon-wjx02" v-for="i in 5-item.score" :key="i"></i>
            <span class="attr" v-for="val in item.orderInfo.specs" :key="val.nameValue">{{val.name}}: {{val.nameValue}}</span>
          </div>
          <div class="text">
            {{item.content}}
          </div>
          <GoodsCommentImage :pictures="item.pictures" v-if="item.pictures.length"/>
          <div class="time">
            <span>{{item.orderInfo.createTime}}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>{{item.praiseCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <XtxPagination @change="changePage" :total="total" :currentPage="reqParams.page" :pageSize="reqParams.pageSize"/>
  </div>
</template>
<script>
import { inject, ref, reactive, watch } from 'vue'
import { findCommentInfo, findCommentInfoDetail } from '@/api/goods.js'
import GoodsCommentImage from './goods-comment-image.vue'
export default {
  name: 'GoodsComment',
  components: { GoodsCommentImage },
  setup () {
    const commentInfo = ref(null)
    const goods = inject('goods')
    findCommentInfo(goods.value.id).then((data) => {
      data.result.tags.unshift({
        title: '有图',
        tagCount: data.result.hasPictureCount
      })
      data.result.tags.unshift({
        title: '全部评价',
        tagCount: data.result.salesCount
      })

      commentInfo.value = data.result
    })
    const currentTagIndex = ref(0)
    // 点击筛选便签
    const changeIndex = (i) => {
      currentTagIndex.value = i
      const tag = commentInfo.value.tags[i]
      if (tag.title === '全部评价') {
        reqParams.hasPicture = null
        reqParams.tag = null
      } else if (tag.title === '有图') {
        reqParams.hasPicture = true
        reqParams.tag = null
      } else {
        reqParams.hasPicture = null
        reqParams.tag = tag.title
      }
    }

    // 筛选条件准备
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      sortField: null
    })

    // 监听参数获取数据
    const commentList = ref([])
    const total = ref(0)
    watch(reqParams, () => {
      findCommentInfoDetail(goods.value.id, reqParams).then(data => {
        commentList.value = data.result.items
        total.value = data.result.counts
        console.log(commentList.value)
      })
    }, { immediate: true })

    // 格式化nickname
    const formatNickName = (nickname) => {
      return nickname.substr(0, 1) + '****' + nickname.substr(-1)
    }

    const changePage = (pageIndex) => {
      reqParams.page = pageIndex
    }
    return { commentInfo, currentTagIndex, changeIndex, reqParams, commentList, formatNickName, changePage, total }
  }
}
</script>
<style scoped lang="scss">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: $priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: $xtxColor;
            background: lighten($xtxColor, 50%);
            color: $xtxColor;
          }
          &.active {
            border-color: $xtxColor;
            background: $xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: $xtxColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
