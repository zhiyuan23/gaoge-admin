<route lang="yaml">
  meta:
  title: 基础数据详情
</route>

<script lang="ts" setup>
import BasicHeader from '@/components/Basic/BasicHeader.vue'
import useBasicDataStore from '@/store/modules/basic-data'
import { useRoute } from 'vue-router'

const basicDataStore = useBasicDataStore()
const { detailData } = storeToRefs(basicDataStore)

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
    <ElDescriptions
      :title="detailData.qymc"
      direction="vertical"
      size="large"
      border
      class="mt-5"
    >
      <ElDescriptionsItem label="生产许可证">
        <div class="leading-10">
          <div>
            企业名称：{{ detailData.qymc }}
          </div>
          <div>
            许可证号：{{ detailData.xkzh }}
          </div>
          <div>
            生产范围：{{ detailData.scfw }}
          </div>
          <div>
            生产地址：{{ detailData.scdz }}
          </div>
          <div>
            发证日期：{{ detailData.fzrq }}
          </div>
          <div>
            有效期至：{{ detailData.yxqz }}
          </div>
        </div>
      </ElDescriptionsItem>
    </ElDescriptions>
    <ElDescriptions
      direction="vertical"
      border
      class="mt-5"
    >
      <ElDescriptionsItem :label="detailData.gmpZsh">
        <div class="leading-10">
          <div>
            企业名称：{{ detailData.gmpQymc }}
          </div>
          <div>
            生产地址：{{ detailData.gmpScdz }}
          </div>
          <div>
            GMP证书号：{{ detailData.gmpZsh }}
          </div>
          <div>
            生产范围：{{ detailData.gmpYsfw }}
          </div>
          <div>
            发证日期：{{ detailData.gmpGgrq }}
          </div>
          <div>
            失效日期：{{ detailData.gmpSxrq }}
          </div>
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
