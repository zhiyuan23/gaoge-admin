<script lang="ts" setup>
import { useConditionConverter } from '@/utils/composables/useConditionConverter'

function disabledDate(time: { getFullYear: () => any }) {
  const currentYear = new Date().getFullYear()
  const year = time.getFullYear()
  return year > currentYear || year < currentYear - 5
}

const formData = reactive({
  hylx: '合格',
  nd: '',
  jd: '',
  cpwh: '',
  bcscqy: '',
})

function resetForm() {
  formData.hylx = '合格'
  formData.nd = ''
  formData.jd = ''
  formData.cpwh = ''
  formData.bcscqy = ''
}

const { convertToConditions } = useConditionConverter(formData, {
  hylx: { operator: 'EQUAL', ignoreEmpty: true },
  nd: { operator: 'EQUAL', ignoreEmpty: true },
  jd: { operator: 'EQUAL', ignoreEmpty: true },
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
    <el-form-item label="结果类型">
      <el-select
        v-model="formData.hylx"
        value-key="label"
        placeholder="请选择结果类型"
      >
        <el-option label="合格" value="合格" />
        <el-option label="不合格" value="不合格" />
        <el-option label="假兽药" value="假兽药" />
      </el-select>
    </el-form-item>

    <el-form-item label="年度">
      <el-date-picker
        v-model="formData.nd"
        class="important:w-full"
        type="year"
        value-format="YYYY"
        placeholder="请选择年度"
        :disabled-date="disabledDate"
      />
    </el-form-item>

    <el-form-item label="季度">
      <el-select
        v-model="formData.jd"
        value-key="label"
        clearable
        placeholder="请选择结果类型"
      >
        <el-option label="第一季度" value="1" />
        <el-option label="第二季度" value="2" />
        <el-option label="第三季度" value="3" />
        <el-option label="第四季度" value="4" />
      </el-select>
    </el-form-item>

    <el-form-item label="批准文号">
      <el-input
        v-model="formData.cpwh"
        clearable
        placeholder="请输入批准文号"
      />
    </el-form-item>

    <el-form-item label="标称生产企业">
      <el-input
        v-model="formData.bcscqy"
        clearable
        placeholder="请输入标称生产企业"
      />
    </el-form-item>
  </el-form>
</template>
