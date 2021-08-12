<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const checked = ref(false)
    const changeChecked = () => {
      checked.value = !checked.value

      // 通知父组件
      emit('update:modelValue', checked.value)
      // 让组件支持change事件
      emit('change', checked.value)
    }
    // modelValue,@update:modelValue
    // 监听父组件数据变化
    watch(() => props.modelValue, () => {
      checked.value = props.modelValue
    }, { immediate: true })
    return { checked, changeChecked }
  }
}
</script>
<style scoped lang="scss">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: $xtxColor;
    ~ span {
      color: $xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
