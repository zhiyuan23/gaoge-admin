<script lang="ts" setup>
import { useConditionConverter } from '@/utils/composables/useConditionConverter'

function disabledDate(time: Date) {
  const currentYear = new Date().getFullYear()
  const year = time.getFullYear()
  return year > currentYear || year < currentYear - 5
}

const formData = reactive({
  hylx: '合格',
  nd: '',
  jd: '',
  yf: '',
  cjps: '',
  cpwh: '',
  bcscqy: '',
})

watch(
  () => formData.hylx,
  (newVal) => {
    formData.jd = newVal === '假兽药' ? '' : formData.jd
    formData.yf = newVal !== '假兽药' ? '' : formData.yf
  },
)

// 重置表单
function resetForm() {
  Object.assign(formData, {
    hylx: '合格',
    nd: '',
    jd: '',
    yf: '',
    cjps: '',
    cpwh: '',
    bcscqy: '',
  })
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

// 下拉选项
const quarterOptions = [
  { label: '第一季度', value: '1' },
  { label: '第二季度', value: '2' },
  { label: '第三季度', value: '3' },
  { label: '第四季度', value: '4' },
]

const monthOptions = [
  { label: '一月', value: '1' },
  { label: '二月', value: '2' },
  { label: '三月', value: '3' },
  { label: '四月', value: '4' },
  { label: '五月', value: '5' },
  { label: '六月', value: '6' },
  { label: '七月', value: '7' },
  { label: '八月', value: '8' },
  { label: '九月', value: '9' },
  { label: '十月', value: '10' },
  { label: '十一月', value: '11' },
  { label: '十二月', value: '12' },
]
</script>

<template>
  <el-form :model="formData" size="large" label-width="100px">
    <el-form-item label="结果类型">
      <el-select v-model="formData.hylx" placeholder="请选择结果类型">
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
      <el-select v-model="formData.jd" clearable placeholder="请选择季度">
        <el-option v-for="q in quarterOptions" :key="q.value" :label="q.label" :value="q.value" />
      </el-select>
    </el-form-item>

    <el-form-item v-if="formData.hylx === '假兽药'" label="月份">
      <el-select v-model="formData.yf" clearable placeholder="请选择月份">
        <el-option v-for="m in monthOptions" :key="m.value" :label="m.label" :value="m.value" />
      </el-select>
    </el-form-item>

    <el-form-item v-if="formData.hylx === '假兽药'" label="抽检批次">
      <el-input v-model="formData.cjps" clearable placeholder="请输入抽检批次" />
    </el-form-item>

    <el-form-item v-if="formData.hylx !== '假兽药'" label="批准文号">
      <el-input v-model="formData.cpwh" clearable placeholder="请输入批准文号" />
    </el-form-item>

    <el-form-item v-if="formData.hylx !== '假兽药'" label="标称生产企业">
      <el-input v-model="formData.bcscqy" clearable placeholder="请输入标称生产企业" />
    </el-form-item>
  </el-form>
</template>
