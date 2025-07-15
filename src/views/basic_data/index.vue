<route lang="yaml">
  meta:
  title: 基础数据首页
</route>

<script lang="ts" setup>
import type { DataTypeOption } from '@/constants/modules/basic-data'
import BasicFooter from '@/components/Basic/BasicFooter.vue'
import Copyright from '@/components/Basic/Copyright.vue'
import useBasicDataStore from '@/store/modules/basic-data'
import { Download, Phone, Upload } from '@element-plus/icons-vue'
import SearchBox from './components/SearchBox.vue'

const props = defineProps({
  // 展示高级搜索
  showFooter: {
    type: Boolean,
    default: true,
  },
})

const router = useRouter()
const basicDataStore = useBasicDataStore()

const { dataTypeOptions, dataType, helpList } = storeToRefs(basicDataStore)
const showModal = ref<boolean>(false)
const helpColumns = ref<any>([
  { prop: 'dbName', label: '数据库名称', width: 350 },
  { prop: 'tel', label: '数据更新服务电话' },
])

// 确认搜索
function onSearch() {
  router.push({
    path: '/basic_data/list',
  })
}

// 切换数据类型
function handleSelect(item: DataTypeOption) {
  console.warn('切换数据类型')
  console.warn(item)
  dataType.value = item
}

onMounted(() => {
  basicDataStore.fetchHelpList()
})
</script>

<template>
  <div class="min-h-full w-full flex-col-center-start bg-[url('@/assets/images/bg_main.png')] bg-cover bg-center">
    <!-- LOGO -->
    <img src="@/assets/images/title_logo.png" class="mt-24">

    <!-- 搜索框 -->
    <SearchBox class="mt-24" @confirm="onSearch" />

    <!-- 选择框 -->
    <div class="mb-15 mt-20 rounded-xl bg-background px-6 py-9 shadow-[0_10px_20px_0_rgba(0,50,160,0.35)]">
      <div class="grid grid-cols-3 gap-6">
        <div v-for="item in dataTypeOptions" :key="item.code" class="w-75">
          <el-link
            class="text-left text-4 leading-6"
            :class="item.code === dataType.code ? 'text-primary font-bold' : 'text-textPrimary'"
            @click="handleSelect(item)"
          >
            <el-icon>
              <Upload />
            </el-icon>
            <div class="pl-2">
              {{ item.label }}
            </div>
          </el-link>
        </div>
        <div class="w-75">
          <el-link class="text-left text-4 text-textPrimary leading-6" @click="showModal = true">
            <el-icon>
              <Phone />
            </el-icon>
            <div class="pl-2">
              支持电话
            </div>
          </el-link>
        </div>
        <div class="w-75">
          <el-link class="text-left text-4 text-textPrimary leading-6">
            <el-icon>
              <Download />
            </el-icon>
            <div class="pl-2">
              帮助文档
            </div>
          </el-link>
        </div>
      </div>
    </div>
    <template v-if="props.showFooter">
      <Copyright color="white" />
      <BasicFooter color="white" />
    </template>

    <el-dialog v-model="showModal" width="1000" title="支持电话">
      <Table
        :columns="helpColumns"
        :data="helpList"
        show-index
        table-size="large"
        :show-pagination="false"
      />
    </el-dialog>
  </div>
</template>
