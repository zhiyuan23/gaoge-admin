<route lang="yaml">
  meta:
  title: 基础数据详情
</route>

<script lang="ts" setup>
import BasicHeader from '@/components/Basic/BasicHeader.vue'
import useBasicDataStore from '@/store/modules/basic-data'
import { useRoute } from 'vue-router'

const basicDataStore = useBasicDataStore()
const { detailTypeCode, detailData } = storeToRefs(basicDataStore)

const isProducer = computed(() => detailTypeCode.value === 'syscqyinfo')
const isApproval = computed(() => detailTypeCode.value === 'sycppzwh')

function close() {
  window.close()
}

onMounted(() => {
  const route = useRoute()
  const id = route.params.id
  const params = {
    [basicDataStore.detailIdName]: id,
  }

  basicDataStore.fetchDetailData(params)
})
</script>

<template>
  <BasicHeader />
  <div class="px-35 pb-10">
    <!-- 生产企业数据详情 -->
    <template v-if="isProducer">
      <ElDescriptions
        :title="detailData.qymc"
        direction="vertical"
        size="large"
        border
        class="mt-5"
      >
        <ElDescriptionsItem label="生产许可证">
          <div class="detail-list">
            <div>企业名称：{{ detailData.qymc }}</div>
            <div>许可证号：{{ detailData.xkzh }}</div>
            <div>生产范围：{{ detailData.scfw }}</div>
            <div>生产地址：{{ detailData.scdz }}</div>
            <div>发证日期：{{ detailData.fzrq }}</div>
            <div>有效期至：{{ detailData.yxqz }}</div>
          </div>
        </ElDescriptionsItem>
      </ElDescriptions>
      <ElDescriptions
        direction="vertical"
        size="large"
        border
        class="mt-5"
      >
        <ElDescriptionsItem :label="detailData.gmpZsh">
          <div class="detail-list">
            <div>企业名称：{{ detailData.gmpQymc }}</div>
            <div>生产地址：{{ detailData.gmpScdz }}</div>
            <div>GMP证书号：{{ detailData.gmpZsh }}</div>
            <div>生产范围：{{ detailData.gmpYsfw }}</div>
            <div>发证日期：{{ detailData.gmpGgrq }}</div>
            <div>失效日期：{{ detailData.gmpSxrq }}</div>
          </div>
        </ElDescriptionsItem>
      </ElDescriptions>
    </template>

    <!-- 批准文号详情 -->
    <ElDescriptions
      v-if="isApproval"
      :title="detailData.qymc"
      direction="vertical"
      size="large"
      border
      class="mt-5"
    >
      <ElDescriptionsItem :label="detailData.pzwh">
        <div class="detail-list">
          <div>企业名称：{{ detailData.qymc }}</div>
          <div>通用名：{{ detailData.tym }}</div>
          <div>规格：{{ detailData.gg }}</div>
          <div>商品名：{{ detailData.spm }}</div>
          <div>批准文号：{{ detailData.pzwh }}</div>
          <div>批准日期：{{ detailData.pzrq }}</div>
          <div>有效期：{{ detailData.yxq }}</div>
          <div>失败原因：{{ detailData.sxyy }}</div>
          <div>变更情况：{{ detailData.bgqk }}</div>
        </div>
      </ElDescriptionsItem>
    </ElDescriptions>
  </div>
  <div class="fixed bottom-0 h-18 w-full flex-center-center border-t bg-background">
    <ElButton type="primary" @click="close">
      关闭
    </ElButton>
  </div>
  <div class="h-18" />
</template>

<style scoped>
.detail-list > div {
  padding: 8px 0;
  line-height: 24px;
}
</style>
