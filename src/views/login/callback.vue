<template>
<LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
</section>
   <section class="container" v-else>
    <nav class="tab">
      <a @click="hasAccount=true" :class="{active:hasAccount}" href="javascript:;">
        <i class="iconfont icon-bind" />
 <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount=false" :class="{active:!hasAccount}" href="javascript:;">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind :nickname="nickname" :avatar="avatar" :unionId="unionId"/>
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch :unionId="unionId"/>
    </div>
  </section>
    <LoginFooter/>
</template>
<script>
import LoginHeader from './components/login-header.vue'
import LoginFooter from './components/login-footer.vue'
import CallbackBind from './components/calllback-bind.vue'
import CallbackPatch from './components/callback-patch.vue'
import { userQQLogin } from '@/api/user'
import { ref } from 'vue'
import QC from 'qc'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
export default {
  name: 'LoginBack',
  components: {
    LoginHeader,
    LoginFooter,
    CallbackBind,
    CallbackPatch
  },
  setup () {
    const hasAccount = ref(true)
    const store = useStore()
    const router = useRouter()
    // 默认已经绑定了QQ
    const isBind = ref(true)
    const unionId = ref(null)
    // QQ 登录成功
    if (QC.Login.check()) {
      QC.Login.getMe((openId) => {
        unionId.value = openId
        userQQLogin(openId).then(data => {
          // 已经绑定了QQ
          const { id, avatar, nickname, account, mobile, token } = data.result

          store.commit('user/setUser', {
            id,
            avatar,
            nickname,
            account,
            mobile,
            token
          })

          store.dispatch('cart/mergeCart').then(() => {
            router.push(store.state.user.redirectURL)
            ElMessage.success({
              message: 'QQ登录成功',
              type: 'success'
            })
          })
        }).catch(error => {
          isBind.value = false
          console.log(error)
        })
      })
    }
    return { hasAccount, isBind, unionId }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 25px 0;
   position: relative;
  height: 730px;
    .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center / 100px 100px;
    }
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: $xtxColor;
      border-color: $xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
