<script lang="ts" setup>
import { useConditionConverter } from '@/utils/composables/useConditionConverter'

const formData = reactive({
  bzmc: '',
})

function resetForm() {
  formData.bzmc = ''
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
    <el-form-item label="标准名称">
      <el-input v-model="formData.bzmc" clearable placeholder="请输入标准名称" />
    </el-form-item>
  </el-form>
</template>
