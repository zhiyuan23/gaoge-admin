<script lang="ts" setup>
import { useConditionConverter } from '@/utils/composables/useConditionConverter'

const formData = reactive({
  xsymc: '',
  zsh: '',
  lb: '',
})

function resetForm() {
  formData.xsymc = ''
  formData.zsh = ''
  formData.lb = ''
}

const { convertToConditions } = useConditionConverter(formData, {
  lb: { operator: 'EQUAL', ignoreEmpty: true },
})

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
    <el-form-item label="新兽药名称">
      <el-input v-model="formData.xsymc" clearable placeholder="请输入新兽药名称" />
    </el-form-item>

    <el-form-item label="注册证书号">
      <el-input v-model="formData.zsh" clearable placeholder="请输入新兽药注册证书号" />
    </el-form-item>

    <el-form-item label="类别">
      <el-select
        v-model="formData.lb"
        value-key="label"
        clearable
        placeholder="请选择类别"
      >
        <el-option label="一类" value="一类" />
        <el-option label="二类" value="二类" />
        <el-option label="三类" value="三类" />
        <el-option label="四类" value="四类" />
        <el-option label="五类" value="五类" />
      </el-select>
    </el-form-item>
  </el-form>
</template>
