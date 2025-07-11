<script lang="ts" setup>
import { useConditionConverter } from '@/utils/composables/useConditionConverter'

const formData = reactive({
  qymc: '',
  tym: '',
  spm: '',
  pzwh: '',
})

function resetForm() {
  formData.qymc = ''
  formData.tym = ''
  formData.spm = ''
  formData.pzwh = ''
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
    <el-form-item label="企业名称">
      <el-input v-model="formData.qymc" clearable placeholder="请输入企业名称" />
    </el-form-item>

    <el-form-item label="通用名">
      <el-input v-model="formData.tym" clearable placeholder="请输入通用名" />
    </el-form-item>

    <el-form-item label="商品名">
      <el-input v-model="formData.spm" clearable placeholder="请输入商品名" />
    </el-form-item>

    <el-form-item label="批准文号">
      <el-input v-model="formData.pzwh" clearable placeholder="请输入批准文号" />
    </el-form-item>
  </el-form>
</template>
