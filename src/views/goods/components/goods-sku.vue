<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            :class="{ selected: val.selected,disabled:val.disabled }"
            @click="changeSku(item, val)"
            v-if="val.picture"
            :src="val.picture"
            alt=""
            :title="val.name"
          />
          <span
            v-else
            :class="{ selected: val.selected,disabled:val.disabled }"
            @click="changeSku(item, val)"
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import PowerSet from '@/vendor/power-set.js'
const spliter = '★'

// 根据skus数据得到路径字典对象
const getPathMap = (skus) => {
  const pathMap = {}
  skus.forEach(sku => {
    if (sku.inventory) {
      const specs = sku.specs.map(item => item.valueName)
      // 使用幂函数获取子集
      const powerSet = PowerSet(specs)
      powerSet.forEach(set => {
        const key = set.join(spliter)
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
// 获取已点击的sku项
const getSelectedAttr = (specs) => {
  const isSelected = []
  specs.forEach(spec => {
    const obj = spec.values.find(val => val.selected)
    isSelected.push(obj ? obj.name : undefined)
  })
  return isSelected
}
// 更新各个按钮的禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((spec, i) => {
    const isSelected = getSelectedAttr(specs)
    spec.values.forEach(val => {
      if (val.name === isSelected[i]) return false
      isSelected[i] = val.name
      const key = isSelected.filter(value => value).join(spliter)
      console.log(key)
      val.disabled = !pathMap[key]
    })
  })
}
// 初始化默认选项
const initDefaultSelected = (goods, skuId) => {
  const skuItem = goods.skus.find(item => item.id === skuId)
  if (skuItem) {
    goods.specs.forEach((item, index) => {
      const value = skuItem.specs[index].valueName
      item.values.forEach(val => {
        val.selected = value === val.name
      })
    })
  }
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 初始化默认选择sku
    initDefaultSelected(props.goods, props.skuId)
    const pathMap = getPathMap(props.goods.skus)
    // 更新禁止状态
    updateDisabledStatus(props.goods.specs, pathMap)

    // 点击按钮更新状态
    const changeSku = (item, val) => {
      if (val.disabled) return
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(i => {
          i.selected = false
        })
        val.selected = true
      }
      updateDisabledStatus(props.goods.specs, pathMap)
      // 把选择的项传给父组件
      const validSelectedAttr = getSelectedAttr(props.goods.specs).filter(v => v)
      const skuIds = pathMap[validSelectedAttr.join(spliter)]
      if (validSelectedAttr.length === props.goods.specs.length) {
        const sku = props.goods.skus.find(val => val.id === skuIds[0])
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs.reduce((p, c) => `${p} ${c.name}:${c.valueName}`, '').trim()
        })
      } else {
        emit('change', {})
      }
    }
    return { changeSku }
  }
}
</script>
<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: $xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        @include sku-state-mixin;
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>
