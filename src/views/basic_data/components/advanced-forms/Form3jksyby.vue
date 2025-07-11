<script lang="ts" setup>
import { useConditionConverter } from '@/utils/composables/useConditionConverter'

const formData = reactive({
  dljg: '',
  scqy: '',
  cpmc: '',
  zczsh: '',
  ph: '',
})

function resetForm() {
  formData.dljg = ''
  formData.scqy = ''
  formData.cpmc = ''
  formData.zczsh = ''
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
    <el-form-item label="代理机构">
      <el-input v-model="formData.dljg" clearable placeholder="请输入代理机构" />
    </el-form-item>

    <el-form-item label="生产企业">
      <el-input v-model="formData.scqy" clearable placeholder="请输入生产企业" />
    </el-form-item>

    <el-form-item label="产品">
      <el-input v-model="formData.cpmc" clearable placeholder="请输入产品" />
    </el-form-item>

    <el-form-item label="注册证书号">
      <el-input v-model="formData.zczsh" clearable placeholder="请输入注册证书号" />
    </el-form-item>

    <el-form-item label="生产批号">
      <el-input v-model="formData.ph" clearable placeholder="请输生产批号" />
    </el-form-item>
  </el-form>
</template>
