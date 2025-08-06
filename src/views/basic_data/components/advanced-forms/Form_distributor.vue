<script lang="ts" setup>
import { useConditionConverter } from '@/utils/composables/useConditionConverter'

const formData = reactive({
  fullName: '',
  jyCode: '',
  location: '',
})

function resetForm() {
  formData.fullName = ''
  formData.jyCode = ''
  formData.location = ''
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
      <el-input v-model="formData.fullName" clearable placeholder="请输入企业名称" />
    </el-form-item>

    <el-form-item label="许可证号">
      <el-input v-model="formData.jyCode" clearable placeholder="请输入许可证号" />
    </el-form-item>

    <el-form-item label="所在地">
      <el-input v-model="formData.location" clearable placeholder="请输所在地" />
    </el-form-item>
  </el-form>
</template>
