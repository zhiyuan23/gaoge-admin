<route lang="yaml">
  meta:
  title: 基础数据列表
</route>

<script lang="ts" setup>
// import BasicFooter from '@/components/Basic/BasicFooter.vue'
import BasicHeader from '@/components/Basic/BasicHeader.vue'
import Table from '@/components/Table/index.vue'
import useBasicDataStore from '@/store/modules/basic-data'
import { getResourceUrl } from '@/utils/url'
import { toast } from 'vue-sonner'
import AdvancedSearch from './components/AdvancedSearch.vue'
import SearchBox from './components/SearchBox.vue'

const router = useRouter()
const basicDataStore = useBasicDataStore()

const { tablePage, tablePageSize, tableColumns, tableRecords, totalRecords } = storeToRefs(basicDataStore)

const columns = computed(() => [
  ...tableColumns.value,
  // 其他配置
])
const showAdvanced = ref<boolean>(false)

const advancedSearchRef = ref()

// 初始化搜索条件
function resetList() {
  advancedSearchRef.value?.resetForm()
  basicDataStore.updateQueryParams({ conditions: [] })
  getList()
}

// 高级搜索确认
function onConfirm(conditions: any) {
  basicDataStore.updateQueryParams({ conditions })
  getList()
}

// 切换分页
function paginationChange({ page, pageSize }: any) {
  basicDataStore.updateQueryParams({ page, pageSize })
  getList()
}

// 获取列表
function getList() {
  basicDataStore.fetchTableColumns()
  basicDataStore.fetchTableRecords()
}

// 链接点击事件
function linkClick({ linkParams, row }: any) {
  if (linkParams.type === 'list') {
    toList(row, linkParams)
  }
  if (linkParams.type === 'detail') {
    toDetail(row, linkParams)
  }
  if (linkParams.type === 'pdf') {
    openPdf(row, linkParams.name)
  }
}

// 查看列表
function toList(row: any, { name, code }: any) {
  basicDataStore.setDataTypeByCode(code)
  basicDataStore.commonSearch = row[name]
  getList()
}

// 查看详情
function toDetail(row: any, { name }: any) {
  basicDataStore.detailIdName = name
  const id = row[name]

  if (!id) {
    toast.warning('暂无可查看的详情')
    return
  }

  const url = router.resolve({
    name: 'basicDataDetail',
    params: { id },
  }).href

  setTimeout(() => {
    window.open(url, '_blank')
  }, 0)
}

// 查看PDF
function openPdf(row: any, name: string) {
  const fieldName = row[name]
  if (!fieldName) {
    toast.warning('暂无可查看的PDF文件')
    return
  }

  // 新标签页打开
  const baseUrl = getResourceUrl('pdf')
  const pdfUrl = `${baseUrl}${fieldName}`
  window.open(pdfUrl, '_blank')
}

onMounted(() => {
  basicDataStore.fetchTableColumns()
})

onUnmounted(() => {
  basicDataStore.initQueryConditions()
  basicDataStore.closeTips()
})
</script>

<template>
  <BasicHeader />
  <SearchBox
    class="mt-7"
    show-advanced
    @open-advanced="showAdvanced = true"
    @confirm="resetList"
  />
  <div class="h-[calc(100vh-208px)] w-full flex-col px-15 py-7">
    <Table
      :columns="columns"
      :data="tableRecords"
      :total="totalRecords"
      show-index
      :page="tablePage"
      :page-size="tablePageSize"
      :page-sizes="[10, 15, 20, 25, 50]"
      @pagination-change="paginationChange"
      @link-click="linkClick"
    >
      <template #action="{ row, actionParams }">
        <ElButton type="primary" plain size="small" @click="toDetail(row, actionParams)">
          查看
        </ElButton>
      </template>
    </Table>
  </div>
  <!-- <BasicFooter :height-auto="currentPageSize > 10" /> -->

  <!-- 高级搜索 -->
  <AdvancedSearch
    ref="advancedSearchRef"
    v-model="showAdvanced"
    @confirm="onConfirm"
  />
</template>

<style>
.full-width-notification {
  width: auto;
  padding: 12px 10px;
}
</style>
