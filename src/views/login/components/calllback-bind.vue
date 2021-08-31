<template>
  <Form
    class="xtx-form"
    :validation-schema="mySchema"
    autocomplete="off"
    ref="formCom"
    v-slot="{ errors }"
  >
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          class="input"
          type="text"
          placeholder="绑定的手机号"
          name="mobile"
          v-model="form.mobile"
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
          placeholder="短信验证码"
          name="code"
          v-model="form.code"
        />
        <span class="code" @click="send">{{
          time === 0 ? "发送验证码" : `${time}秒后重试`
        }}</span>
      </div>
      <div v-if="errors.mobile" class="error">{{ errors.code }}</div>
    </div>
    <a href="javascript:;" class="submit" @click="submit">立即绑定</a>
  </Form>
</template>

<script>
import QC from 'qc'
import { reactive, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validation-schema'
import { useIntervalFn } from '@vueuse/core'
import { userQQBindCode, userQQBindLogin } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'CallbackBind',
  props: {
    unionId: {
      type: String,
      dafault: ''
    }
  },
  components: {
    Form,
    Field
  },
  setup (props) {
    const avatar = ref(null)
    const nickname = ref(null)
    const formCom = ref(null)
    const router = useRouter()
    const store = useStore()
    if (QC.Login.check()) {
      QC.api('get_user_info').success((res) => {
        console.log(res)
        avatar.value = res.data.figureurl
        nickname.value = res.data.nickname
      })
    }
    const form = reactive({
      mobile: null,
      code: null
    })
    const mySchema = {
      mobile: schema.mobile,
      code: schema.code
    }
    const time = ref(0)
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
    // 点击发十八个
    const send = async () => {
      const valid = schema.mobile(form.mobile)
      if (valid === true) {
        if (time.value === 0) {
          try {
            await userQQBindCode(form.mobile)
            ElMessage.success({
              message: 'QQ登录成功',
              type: 'success'
            })
            time.value = 60
            resume()
            // 调接口
          } catch (error) {
            ElMessage.error(error.response.data.message)
          }
        }
      } else {
        formCom.value.setFieldError('mobile', valid)
      }
    }

    // 绑定
    const submit = () => {
      const valid = formCom.value.validate()
      if (valid) {
        userQQBindLogin({
          unionId: props.unionId,
          ...form
        }).then(data => {
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          store.dispatch('cart/mergeCart').then(() => {
            // 2. 跳转到来源页或者首页
            router.push(store.state.user.redirectUrl)
            // 3. 成功提示
            ElMessage({ type: 'success', text: 'QQ绑定成功' })
          })
        }).catch(e => {
          ElMessage.error(e.response.data.message)
        })
      }
    }
    return {
      avatar,
      nickname,
      mySchema,
      time,
      send,
      form,
      formCom,
      submit
    }
  }
}
</script>

<style scoped lang='scss'>
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
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
