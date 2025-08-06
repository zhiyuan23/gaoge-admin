<script lang="ts" setup>
import { useConditionConverter } from '@/utils/composables/useConditionConverter'

const formData = reactive({
  tym: '',
})

function resetForm() {
  formData.tym = ''
}

const { convertToConditions } = useConditionConverter(formData)

function getQueryConditions() {
  return convertToConditions()
}

defineExpose({
  formData,
  resetForm,
  getQueryConditions,
})
</script>

<template>
  <el-form :model="formData" size="large" label-width="100px">
    <el-form-item label="通用名">
      <el-input v-model="formData.tym" clearable placeholder="请输入通用名" />
    </el-form-item>
  </el-form>
</template>
