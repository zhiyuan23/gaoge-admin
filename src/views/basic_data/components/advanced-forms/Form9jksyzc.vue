<script lang="ts" setup>
import { useConditionConverter } from '@/utils/composables/useConditionConverter'

const formData = reactive({
  symc: '',
  scqymc: '',
  sccmc: '',
  zsh: '',
})

function resetForm() {
  formData.symc = ''
  formData.scqymc = ''
  formData.sccmc = ''
  formData.zsh = ''
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
    <el-form-item label="兽药名称">
      <el-input v-model="formData.symc" clearable placeholder="请输入兽药名称" />
    </el-form-item>

    <el-form-item label="生产企业名称">
      <el-input v-model="formData.scqymc" clearable placeholder="请输入生产企业名称" />
    </el-form-item>

    <el-form-item label="生产厂名称">
      <el-input v-model="formData.sccmc" clearable placeholder="请输入生产厂名称" />
    </el-form-item>

    <el-form-item label="证书号">
      <el-input v-model="formData.zsh" clearable placeholder="请输入证书号" />
    </el-form-item>
  </el-form>
</template>
