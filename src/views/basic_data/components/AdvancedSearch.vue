<script setup lang="ts">
import useBasicDataStore from '@/store/modules/basic-data'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  searchType: {
    type: String,
    default: 'FormTypeA',
  },
})
const emit = defineEmits(['update:modelValue', 'confirm', 'reset'])

const basicDataStore = useBasicDataStore()
const { dataTypeOptions, dataType } = storeToRefs(basicDataStore)

const formModules = import.meta.glob<{ default: Component }>('./advanced-forms/Form*.vue', { eager: true })

const formComponents = Object.fromEntries(
  dataTypeOptions.value.map((item, index) => {
    const componentPath = `./advanced-forms/Form${index + 1}${item.code}.vue`
    const module = formModules[componentPath]
    return [item.code, defineAsyncComponent(() => Promise.resolve(module.default))]
  }),
)

// 当前要用的表单组件
const currentForm = computed(() => formComponents[dataType.value.code] || null)
const formRef = ref<any>(null)

const show = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

// 确认搜索
function handleConfirm() {
  basicDataStore.commonSearch = ''
  emit('confirm', formRef.value.getQueryConditions())
  emit('update:modelValue', false)
}

// 清空搜索
function handleReset() {
  emit('reset')
  // emit('update:modelValue', false)
  formRef.value.resetForm()
}

// 关闭前拦截
function handleClose(done: () => void) {
  handleReset()
  done()
}

defineExpose({
  resetForm: () => {
    formRef.value?.resetForm()
  },
})
</script>

<template>
  <el-drawer
    v-model="show"
    title="高级搜索"
    direction="ltr"
    class="w-125"
    :before-close="handleClose"
  >
    <div class="">
      <!-- 类型选择 -->
      <el-form-item label="相关信息类型" label-width="100px" size="large">
        <el-select
          v-model="dataType"
          value-key="code"
          placeholder="Select"
          size="large"
        >
          <el-option
            v-for="item in dataTypeOptions"
            :key="item.code"
            :label="item.label"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <!-- 表单 -->
      <currentForm ref="formRef" />

      <!-- 操作按钮 -->
      <div class="mt-4 w-full flex-center-end">
        <el-button size="large" class="w-30" @click="handleReset">
          清空
        </el-button>
        <el-button size="large" type="primary" class="w-30" @click="handleConfirm">
          确定
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>
