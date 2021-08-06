<template>
<div class="app-nav">
   <div class="container">
    <el-menu
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#333"
  text-color="#CDCDCD">
  <template v-if="profile.token">
      <el-menu-item index="1">
      <span class="iconfont icon-touxiang"></span>
      <!-- {{profile.account}} -->
      <span>wogaf</span>
  </el-menu-item>
  <span class="line">|</span>
   <el-menu-item index="2">退出登录</el-menu-item>
   <span class="line">|</span>
  </template>
  <template v-else>

    <el-menu-item index="1">请先登录</el-menu-item>
    <span class="line">|</span>
     <el-menu-item index="2">免费注册</el-menu-item>
     <span class="line">|</span>

  </template>

    <el-menu-item index="3">我的订单</el-menu-item>
    <span class="line">|</span>
  <el-menu-item index="4">会员中心</el-menu-item>
  <span class="line">|</span>
  <el-menu-item index="5">帮助中心</el-menu-item>
  <span class="line">|</span>
  <el-menu-item index="6">关于我们</el-menu-item>
  <span class="line">|</span>
  <el-menu-item index="7">
      <span class="iconfont icon-shouji"></span>
      <span>手机版</span>
  </el-menu-item>
 </el-menu>
   </div>
</div>
</template>

<script>
import { useStore } from 'vuex'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const activeIndex = ref('1')
    const activeIndex2 = ref('3')
    const store = useStore()
    const profile = computed(() => {
      return store.state.user.profile
    })
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      activeIndex,
      activeIndex2,
      handleSelect,
      profile
    }
  }
})
</script>
<style lang="scss" scoped>
    .app-nav{
        width: 100%;
        height: 53px;
        background: #333;
        .container{
            width: 1240px;
            margin: 0 auto;
            .el-menu{
                display: flex;
                height: 53px;
                justify-content: flex-end;
                align-content: center;
            }
        }
    }
    .el-menu-demo{
        height: 53px;
        .el-menu-item{
            height: 53px;
            line-height: 53px;
            color:#CDCDCD;
            padding:0px 15px ;
            &:hover{
                color: #27BA9B !important;
            }

        }
    }
    .el-menu--horizontal>.el-menu-item.is-active,.el-menu.el-menu--horizontal{
        border-bottom: 0;
    }

    .line{
        color: #5c5d5c;
        line-height: 53px;
    }
    // .icon-touxiang{
    //    vertical-align: middle;
    // }\
    .icon-touxiang,.icon-shouji{
        width: 14px;
        height: 14px;
        line-height: 53px;
        font-size: 14px;
        color: #fff;
    }
    span{
        vertical-align:middle;
        line-height:14px
    }

</style>
