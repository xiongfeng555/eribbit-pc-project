<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form
      class="form"
      :validation-schema="mySchema"
      autocomplete="off"
      v-slot="{ errors }"
      ref="formCom"
    >
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              v-model="form.account"
              name="account"
              type="text"
              placeholder="请输入用户名或手机号"
              :class="{ error: errors.account }"
            />
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />{{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              v-model="form.password"
              name="password"
              type="password"
              placeholder="请输入密码"
              :class="{ error: errors.password }"
            />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              v-model="form.mobile"
              name="mobile"
              type="text"
              placeholder="请输入手机号"
              :class="{ error: errors.mobile }"
            />
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              v-model="form.code"
              name="code"
              type="text"
              placeholder="请输入验证码"
              :class="{ error: errors.code }"
            />
            <span class="code" @click="send">
                {{time===0?'发送验证码':`${time}s后再尝试`}}
            </span>
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />{{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field name="isAgree" v-model="form.isAgree" as="XtxCheckbox" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning" />{{ errors.isAgree }}
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </Form>
    <div class="action">
      <span id="qqLoginBtn"></span>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watch, onMounted } from 'vue'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validation-schema.js'
import { ElMessage } from 'element-plus'
import { userAccountLogin, userMobileLoginByCode, userMobileLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
import QC from 'qc'
export default {
  components: { Form, Field },
  setup () {
    const isMsgLogin = ref(false)
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    // QQ登录按钮生成
    onMounted(() => {
      // 组件渲染完毕，使用QC生成QQ登录按钮
      QC.Login({
        btnId: 'qqLoginBtn'
      })
    })
    watch(isMsgLogin, () => {
      // 重置数据
      form.isAgree = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
    })
    // 表单数据
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })
    // 校验规则
    const mySchema = {
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree
    }
    const formCom = ref(null)
    const time = ref(0)

    // 设置一个定时器，最后false是不立刻启动
    const { pause, resume } = useIntervalFn(() => {
      time.value--
      if (time.value === 0) {
        // 暂停定时器
        pause()
      }
    }, 1000, false)
    // 发送验证码函数
    const send = () => {
      const valid = schema.mobile(form.mobile)
      if (valid === true) {
        if (time.value === 0) {
          userMobileLoginByCode(form.mobile).then(data => {
            time.value = 60
            // 开始定时器
            resume()
            ElMessage.success({
              message: '发送成功',
              type: 'success'
            })
          }).catch(err => {
            ElMessage.error(err.response.data.message)
          })
        }
      } else {
        console.log('手机号发送失败')
      }
    }

    // 点击登录函数
    const login = async () => {
      const valid = await formCom.value.validate()
      if (valid) {
        const { account, password, mobile, code } = form
        let data = null

        try {
          // 手机号登录
          if (isMsgLogin.value) {
            data = await userMobileLogin({ mobile, code })
          } else {
            // 账户密码登录
            data = await userAccountLogin({ account, password })
          }
        } catch (error) {
          if (error.response.data) {
            ElMessage.error(error.response.data.message)
          }
        }

        if (data) {
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
            ElMessage.success({
              message: '登录成功',
              type: 'success'
            })
            router.push(route.query.redirectUrl || '/')
          })
        }
      }
    }
    return { isMsgLogin, form, mySchema, login, formCom, send, time }
  }
}
</script>
<style lang="scss" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: $xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: $priceColor;
          }
          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
