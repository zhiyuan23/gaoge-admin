<script lang="ts" setup>
import { useConditionConverter } from '@/utils/composables/useConditionConverter'

// 省份选项
const provinceOptions = ref([
  '北京市',
  '天津市',
  '河北省',
  '山西省',
  '内蒙古自治区',
  '辽宁省',
  '吉林省',
  '黑龙江省',
  '上海市',
  '江苏省',
  '浙江省',
  '安徽省',
  '福建省',
  '江西省',
  '山东省',
  '河南省',
  '湖北省',
  '湖南省',
  '广东省',
  '广西壮族自治区',
  '海南省',
  '重庆市',
  '四川省',
  '贵州省',
  '云南省',
  '西藏自治区',
  '陕西省',
  '甘肃省',
  '青海省',
  '宁夏回族自治区',
  '新疆维吾尔自治区',
  '香港特别行政区',
  '澳门特别行政区',
  '台湾省',
  '新疆生产建设兵团',
  '境外',
])

// 兽禽选项
const poultryOptions = ref([
  '猪',
  '牛',
  '羊',
  '鸡',
  '鸭',
  '鹅',
  '兔',
  '鸽',
  '鹤鹑',
  '马',
  '驴',
  '骡',
  '骆驼',
  '其他家畜',
  '其他家禽',
  '蜜蜂',
  '水生动物',
  '实验动物',
  '特种畜禽',
  '野生动物',
  '犬',
  '猫',
])

const formData = reactive({
  provinceName: '',
  finalName: '',
  poultryType: '',
})

function resetForm() {
  formData.provinceName = ''
  formData.finalName = ''
  formData.poultryType = ''
}

const { convertToConditions } = useConditionConverter(formData, {
  provinceName: { operator: 'EQUAL', ignoreEmpty: true },
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
    <el-form-item label="省份">
      <el-select
        v-model="formData.provinceName"
        value-key="label"
        clearable
        placeholder="请选择省份"
      >
        <el-option
          v-for="province in provinceOptions"
          :key="province"
          :label="province"
          :value="province"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="养殖场名称">
      <el-input
        v-model="formData.finalName"
        clearable
        placeholder="请输入养殖场名称"
      />
    </el-form-item>

    <el-form-item label="兽禽种类">
      <el-select
        v-model="formData.poultryType"
        value-key="label"
        clearable
        placeholder="请选择兽禽种类"
      >
        <el-option
          v-for="poultry in poultryOptions"
          :key="poultry"
          :label="poultry"
          :value="poultry"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>
