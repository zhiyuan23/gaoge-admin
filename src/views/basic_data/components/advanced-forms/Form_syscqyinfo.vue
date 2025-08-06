<script lang="ts" setup>
import { useConditionConverter } from '@/utils/composables/useConditionConverter'

const formData = reactive({
  qymc: '',
  xkzh: '',
  gmpZsh: '',
})

function resetForm() {
  formData.qymc = ''
  formData.xkzh = ''
  formData.gmpZsh = ''
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

    <el-form-item label="许可证号">
      <el-input v-model="formData.xkzh" clearable placeholder="请输入许可证号" />
    </el-form-item>

    <el-form-item label="GMP证书号">
      <el-input v-model="formData.gmpZsh" clearable placeholder="请输入GMP证书号" />
    </el-form-item>
  </el-form>
</template>
