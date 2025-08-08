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
  yf: '',
  cpwh: '',
  bcscqy: '',
})

watch(
  () => formData.hylx,
  (newVal) => {
    if (newVal === '假兽药') {
      formData.jd = ''
    }
    else {
      formData.yf = ''
    }
  },
)

function resetForm() {
  formData.hylx = '合格'
  formData.nd = ''
  formData.jd = ''
  formData.yf = ''
  formData.cpwh = ''
  formData.bcscqy = ''
}

const { convertToConditions } = useConditionConverter(formData, {
  hylx: { operator: 'EQUAL', ignoreEmpty: true },
  nd: { operator: 'EQUAL', ignoreEmpty: true },
  jd: { operator: 'EQUAL', ignoreEmpty: true },
  yf: { operator: 'EQUAL', ignoreEmpty: true },
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

    <el-form-item v-if="formData.hylx !== '假兽药'" label="季度">
      <el-select
        v-model="formData.jd"
        value-key="label"
        clearable
        placeholder="请选择季度"
      >
        <el-option label="第一季度" value="1" />
        <el-option label="第二季度" value="2" />
        <el-option label="第三季度" value="3" />
        <el-option label="第四季度" value="4" />
      </el-select>
    </el-form-item>

    <el-form-item v-if="formData.hylx === '假兽药'" label="月份">
      <el-select
        v-model="formData.yf"
        value-key="label"
        clearable
        placeholder="请选择月份"
      >
        <el-option label="一月" value="1" />
        <el-option label="二月" value="2" />
        <el-option label="三月" value="3" />
        <el-option label="四月" value="4" />
        <el-option label="五月" value="5" />
        <el-option label="六月" value="6" />
        <el-option label="七月" value="7" />
        <el-option label="八月" value="8" />
        <el-option label="九月" value="9" />
        <el-option label="十月" value="10" />
        <el-option label="十一月" value="11" />
        <el-option label="十二月" value="12" />
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
