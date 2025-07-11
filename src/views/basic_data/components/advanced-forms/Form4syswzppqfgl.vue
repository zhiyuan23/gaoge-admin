<script lang="ts" setup>
import { useConditionConverter } from '@/utils/composables/useConditionConverter'

const formData = reactive({
  scqy: '',
  cpmc: '',
  ph: '',
})

function resetForm() {
  formData.scqy = ''
  formData.cpmc = ''
  formData.ph = ''
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
    <el-form-item label="生产企业">
      <el-input v-model="formData.scqy" clearable placeholder="请输入生产企业" />
    </el-form-item>

    <el-form-item label="产品">
      <el-input v-model="formData.cpmc" clearable placeholder="请输入产品" />
    </el-form-item>

    <el-form-item label="生产批号">
      <el-input v-model="formData.ph" clearable placeholder="请输入生产批号" />
    </el-form-item>
  </el-form>
</template>
