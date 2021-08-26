<template>
  <Form
    class="xtx-form"
    :validation-schema="mySchema"
    autocomplete="off"
    v-slot="{ errors }"
    ref="formCom"
  >
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field
          class="input"
          type="text"
          placeholder="请输入用户名"
          v-model="form.account"
          name="account"
        />
      </div>
      <div v-if="errors.account" class="error">{{ errors.account }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          class="input"
          type="text"
          placeholder="请输入手机号"
          v-model="form.mobile"
          name="mobile"
        />
      </div>
      <div v-if="errors.mobile" class="error">{{ errors.mobile }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field
          class="input"
          type="text"
          placeholder="请输入验证码"
          v-model="form.code"
          name="code"

        />
        <span class="code" @click="send">{{time=== 0 ?"发送验证码":`${time}秒后重试`}}</span>
      </div>
      <div v-if="errors.code" class="error">{{ errors.code }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          class="input"
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
          name="password"
        />
      </div>
      <div v-if="errors.password" class="error">{{ errors.password }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          class="input"
          type="password"
          placeholder="请确认密码"
          v-model="form.rePassword"
          name="rePassword"
        />
      </div>
      <div v-if="errors.rePassword" class="error">{{ errors.rePassword }}</div>
    </div>
    <a href="javascript:;" class="submit" @click="submit">立即提交</a>
  </Form>
</template>

<script>
import { reactive, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validation-schema'
import { useIntervalFn } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { userRegisterCode, userQQPatchLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'CallbackPatch',
  props: {
    unionId: {
      type: String,
      dafault: ''
    }
  },
  components: { Form, Field },
  setup (props) {
    const store = useStore()
    const router = useRouter()
    const form = reactive({
      account: null,
      password: null,
      rePassword: null,
      mobile: null,
      code: null
    })
    const mySchema = {
      account: schema.accountApi,
      password: schema.password,
      rePassword: schema.rePassword,
      mobile: schema.mobile,
      code: schema.code
    }

    const { pause, resume } = useIntervalFn(
      () => {
        time.value--
        if (time.value === 0) {
          pause()
        }
      },
      1000,
      false
    )
    const time = ref(0)
    const formCom = ref(null)
    const send = () => {
      const valid = schema.mobile(form.mobile)
      if (valid === true) {
        if (time.value === 0) {
          userRegisterCode(form.mobile).then((data) => {
            ElMessage.success({
              message: '发送成功',
              type: 'success'
            })
            time.value = 60
            resume()
          }).catch(e => {
            ElMessage.error(e.response.data.message)
          })
        }
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
        formCom.value.setFieldError('mobile', valid)
      }
    }
    const submit = () => {
      const valid = formCom.value.validate()
      if (valid) {
        userQQPatchLogin({
          unionId: props.unionId,
          ...form
        }).then(data => {
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          // 2. 跳转到来源页或者首页
          router.push(store.state.user.redirectUrl)
          // 3. 成功提示
          ElMessage({ type: 'success', text: 'QQ完善信息成功' })
        }).catch(e => {
          ElMessage.error(e.response.data.message)
        })
      }
    }
    return { form, mySchema, send, time, formCom, submit }
  }
}
</script>

<style scoped lang='scss'>
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
