<route lang="yaml">
  meta:
  title: 基础数据详情
</route>

<script lang="ts" setup>
import BasicHeader from '@/components/Basic/BasicHeader.vue'
import useBasicDataStore from '@/store/modules/basic-data'
import { useRoute } from 'vue-router'

const basicDataStore = useBasicDataStore()
const { detailData, detailListData, detailIdName } = storeToRefs(basicDataStore)

const isProducer = computed(() => detailIdName.value === 'qydm')
const isApproval = computed(() => detailIdName.value === 'pzwhitemid')

function getDetail() {
  const route = useRoute()
  const id = route.params.id

  if (isProducer.value) {
    basicDataStore.fetchDetailByQydm(id)
  }
  if (isApproval.value) {
    basicDataStore.fetchDetailByPzwh(id)
  }
}

function close() {
  window.close()
}

onMounted(() => {
  getDetail()
})
</script>

<template>
  <BasicHeader />
  <div class="px-35 pb-10">
    <!-- 生产企业数据详情 -->
    <template v-if="isProducer">
      <ElDescriptions
        :title="detailListData[0]?.qymc"
        direction="vertical"
        size="large"
        :border="true"
        class="mt-5"
      >
        <ElDescriptionsItem label="生产许可证">
          <div class="detail-list">
            <div>企业名称：{{ detailListData[0]?.qymc }}</div>
            <div>许可证号：{{ detailListData[0]?.xkzh }}</div>
            <div>生产范围：{{ detailListData[0]?.scfw }}</div>
            <div>生产地址：{{ detailListData[0]?.scdz }}</div>
            <div>发证日期：{{ detailListData[0]?.fzrq }}</div>
            <div>有效期至：{{ detailListData[0]?.yxqz }}</div>
          </div>
        </ElDescriptionsItem>
      </ElDescriptions>
      <ElDescriptions
        v-for="item in detailListData"
        :key="item.gmpZsh"
        direction="vertical"
        size="large"
        :border="true"
        class="mt-5"
      >
        <ElDescriptionsItem :label="item.gmpZsh">
          <div class="detail-list">
            <div>企业名称：{{ item.gmpQymc }}</div>
            <div>生产地址：{{ item.gmpScdz }}</div>
            <div>GMP证书号：{{ item.gmpZsh }}</div>
            <div>生产范围：{{ item.gmpYsfw }}</div>
            <div>发证日期：{{ item.gmpGgrq }}</div>
            <div>失效日期：{{ item.gmpSxrq }}</div>
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
      :border="true"
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
