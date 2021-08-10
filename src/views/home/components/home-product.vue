<template>
  <div class="home-product" ref="target">
    <HomePanel :title="item.name" v-for="item in goodList" :key="item.id">
      <template v-slot:right>
        <div class="sub" v-if="item.children">
          <RouterLink to="/category/sub/`${i.id}" v-for="i in item.children" :key="i.id">{{i.name}}</RouterLink>
        </div>
        <XtxMore path="/category/sub/`${item.id}`"/>
      </template>
      <div class="box">
        <RouterLink class="cover" to="/category/sub/`${item.id}`">
          <img :src="item.picture" alt="">
          <strong class="label">
            <span>{{item.saleInfo}}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list" v-if="item.goods">
          <li v-for="good in item.goods" :key="good.id">
            <HomeGoods :good="good"/>
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import { ref } from 'vue'
import HomePanel from './home-panel'
import HomeGoods from './home-goods'
import { findProduct } from '@/api/home'
import { useLazyData } from '@/hooks'
export default {
  name: 'HomeProduct',
  components: { HomePanel, HomeGoods },
  setup () {
    const target = ref(null)
    const result = useLazyData(target, findProduct)
    console.log(result)
    return {
      goodList: result,
      target
    }
  }
}
</script>

<style scoped lang='scss'>
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: $xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 620px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0,-50%,0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0,0,0,.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0,0,0,.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n+4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
