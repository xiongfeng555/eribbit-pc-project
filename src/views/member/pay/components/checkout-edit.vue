<template>
  <el-dialog title="添加地址" v-model="dialogFormVisible">
          <div class="xtx-form">
      <div class="xtx-form-item">
        <div class="label">收货人：</div>
        <div class="field">
          <input class="input" placeholder="请输入收货人" v-model="formData.receiver"/>
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">手机号：</div>
        <div class="field">
          <input class="input" placeholder="请输入手机号"  v-model="formData.contact"/>
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">地区：</div>
        <div class="field">
          <XtxCity placeholder="请选择所在地区" :fullLocation="formData.fullLocation" @change="changeCity"/>
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">详细地址：</div>
        <div class="field">
          <input class="input" placeholder="请输入详细地址"  v-model="formData.address"/>
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">邮政编码：</div>
        <div class="field">
          <input class="input" placeholder="请输入邮政编码"  v-model="formData.postalCode"/>
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">地址标签：</div>
        <div class="field">
          <input class="input" placeholder="请输入地址标签，逗号分隔"  v-model="formData.addressTags"/>
        </div>
      </div>
    </div>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </template>
</el-dialog>
</template>
<script>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { addAddress } from '@/api/order'
export default {
  name: 'CheckoutEdit',
  setup (props, { emit }) {
    const dialogFormVisible = ref(false)
    const open = () => {
      dialogFormVisible.value = true
      for (const key in formData) {
        if (key === 'isDefault') {
          formData[key] = 0
        } else {
          formData[key] = null
        }
      }
    }
    // 表单数据
    const formData = reactive({
      receiver: '',
      contact: '',
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      address: '',
      postalCode: '',
      addressTags: '',
      isDefault: 0,
      fullLocation: ''
    })
    const changeCity = (result) => {
      console.log(result)
      formData.provinceCode = result.provinceCode
      formData.cityCode = result.cityCode
      formData.countyCode = result.countryCode
      formData.fullLocation = result.fullLocation
    }
    const submit = () => {
      addAddress(formData).then(() => {
        ElMessage.success({ message: '添加成功' })
        dialogFormVisible.value = false
        emit('changeEdit', formData)
      })
    }
    return { dialogFormVisible, open, formData, changeCity, submit }
  }
}
</script>
<style lang="scss" scoped>

  :deep(.wrapper){
    width: 780px;
    .body {
      font-size: 14px;
    }
  }

.xtx-form {
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
.xtx-city {
  width: 320px;
  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  :deep(.option) {
    top: 49px;
  }
}
</style>
