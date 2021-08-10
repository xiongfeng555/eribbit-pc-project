<template>
  <div class="xtx-bread">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'XtxBread',
  props: {
    parentName: {
      type: String,
      default: ''
    },
    parentPath: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang='scss'>
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: $xtxColor;
      }
    }
    &:last-child{
        .iconfont{
            display: none;
        }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
