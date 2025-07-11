<script setup lang="ts">
import useBasicDataStore from '@/store/modules/basic-data'
// import { useFaModal } from '@/ui/components/FaModal'

import { Search } from '@element-plus/icons-vue'
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'SearchBox',
})

const props = defineProps({
  // 展示高级搜索
  showAdvanced: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['change', 'confirm', 'openAdvanced'])

const basicDataStore = useBasicDataStore()
const { dataTypeOptions, dataType, commonSearch } = storeToRefs(basicDataStore)

// 类型切换
function handleChange() {
  basicDataStore.updateQueryParams({ conditions: [] })
  emit('change')
}

// 输入框确认
function handleConfirm() {
  // if (!keyword) {
  //   useFaModal().warning({
  //     title: '温馨提醒',
  //     content: '请输入关键字进行搜索',
  //   })
  //   return
  // }
  basicDataStore.updateQueryParams({ page: 1 })
  emit('confirm')
}

// 打开高级搜索
function handleOpenAdvanced() {
  emit('openAdvanced')
}
</script>

<template>
  <div class="search-input mx-auto flex-center-center">
    <div class="h-12 w-180 flex-center-center rounded bg-background px-1">
      <el-select
        v-model="dataType"
        value-key="code"
        placeholder="Select"
        size="large"
        class="w-100"
        @change="handleChange"
      >
        <el-option
          v-for="item in dataTypeOptions"
          :key="item.code"
          :label="item.label"
          :value="item"
        />
      </el-select>
      <el-input
        v-model="commonSearch"
        :placeholder="dataType.placeholder"
        size="large"
        class="ml-1"
        @keyup.enter="handleConfirm"
      >
        <template #suffix>
          <el-button
            type="primary"
            size="large"
            :icon="Search"
            @click="handleConfirm"
          />
        </template>
      </el-input>
    </div>
    <div
      v-if="props.showAdvanced"
      class="ml-6 flex-center-start cursor-pointer text-primary"
      @click="handleOpenAdvanced"
    >
      <Icon icon="mingcute:list-search-line" class="mr-1" :height="35" />
      高级搜索
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-input {
  &:deep(.el-select__wrapper) {
    min-height: 42px;
  }

  &:deep(.el-input__wrapper) {
    width: 300px;
    padding-right: 0;
  }

  &:deep(.el-icon) {
    font-size: 24px;
  }
}
</style>
