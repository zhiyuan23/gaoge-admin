<script lang="ts" setup>
import { useConditionConverter } from '@/utils/composables/useConditionConverter'

const formData = reactive({
  pjh: '',
  xmmc: '',
  sqdwmc: '',
})

function resetForm() {
  formData.pjh = ''
  formData.xmmc = ''
  formData.sqdwmc = ''
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
    <el-form-item label="批件号">
      <el-input v-model="formData.pjh" clearable placeholder="请输入批件号" />
    </el-form-item>

    <el-form-item label="项目名称">
      <el-input v-model="formData.xmmc" clearable placeholder="请输入产品" />
    </el-form-item>

    <el-form-item label="申请单位名称">
      <el-input v-model="formData.sqdwmc" clearable placeholder="请输入申请单位名称" />
    </el-form-item>
  </el-form>
</template>
