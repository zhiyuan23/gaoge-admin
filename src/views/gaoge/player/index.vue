<route lang="yaml">
meta:
  title: 球员信息
</route>

<script setup lang="ts">
import type { TableColumn } from '@/constants/modules/basic-data/types'
import { ElMessage, ElMessageBox } from 'element-plus'

defineOptions({
  name: 'GaogePlayer',
})

type PlayerStatus = 'active' | 'injured' | 'retired'

interface PlayerItem {
  id: number
  name: string
  team: string
  position: string
  number: number
  age: number
  height: number
  weight: number
  status: PlayerStatus
  updatedAt: string
}

const search = ref({
  keyword: '',
  team: '',
  position: '',
  status: '',
})

const teams = ['高歌一队', '高歌二队', '未来之星']
const positions = ['前锋', '中场', '后卫', '守门员']

const sourceData = ref<PlayerItem[]>([
  {
    id: 1001,
    name: '赵一鸣',
    team: '高歌一队',
    position: '前锋',
    number: 9,
    age: 25,
    height: 183,
    weight: 76,
    status: 'active',
    updatedAt: '2026-03-10 09:12',
  },
  {
    id: 1002,
    name: '林嘉俊',
    team: '高歌一队',
    position: '中场',
    number: 8,
    age: 27,
    height: 178,
    weight: 72,
    status: 'active',
    updatedAt: '2026-03-09 16:45',
  },
  {
    id: 1003,
    name: '陈星泽',
    team: '高歌二队',
    position: '后卫',
    number: 4,
    age: 23,
    height: 185,
    weight: 80,
    status: 'injured',
    updatedAt: '2026-03-08 11:20',
  },
  {
    id: 1004,
    name: '吴奕辰',
    team: '未来之星',
    position: '守门员',
    number: 1,
    age: 21,
    height: 191,
    weight: 86,
    status: 'active',
    updatedAt: '2026-03-11 08:05',
  },
  {
    id: 1005,
    name: '唐亦航',
    team: '高歌二队',
    position: '前锋',
    number: 11,
    age: 29,
    height: 180,
    weight: 74,
    status: 'retired',
    updatedAt: '2026-03-01 10:30',
  },
])

const playerData = ref([...sourceData.value, ...sourceData.value, ...sourceData.value])

const columns = ref<TableColumn[]>([
  { label: '姓名', prop: 'name', width: 120 },
  { label: '球队', prop: 'team', width: 140 },
  { label: '位置', prop: 'position', width: 120 },
  { label: '号码', prop: 'number', width: 80, align: 'center' },
  { label: '年龄', prop: 'age', width: 80, align: 'center' },
  { label: '身高(cm)', prop: 'height', width: 110, align: 'center' },
  { label: '体重(kg)', prop: 'weight', width: 110, align: 'center' },
  { label: '状态', prop: 'status', width: 110, slot: 'status', align: 'center' },
  { label: '更新时间', prop: 'updatedAt', width: 160 },
  { label: '操作', prop: 'actions', width: 160, fixed: 'right', slot: 'actions', align: 'center' },
])

const page = ref(1)
const pageSize = ref(15)

const filteredData = computed(() => {
  const keyword = search.value.keyword.trim()
  return playerData.value.filter((item) => {
    const matchKeyword = !keyword
      || item.name.includes(keyword)
      || item.team.includes(keyword)
      || item.position.includes(keyword)
    const matchTeam = !search.value.team || item.team === search.value.team
    const matchPosition = !search.value.position || item.position === search.value.position
    const matchStatus = !search.value.status || item.status === search.value.status
    return matchKeyword && matchTeam && matchPosition && matchStatus
  })
})

const total = computed(() => filteredData.value.length)

const tableData = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredData.value.slice(start, start + pageSize.value)
})

const dialogVisible = ref(false)
const dialogMode = ref<'create' | 'edit'>('create')
const formRef = ref()
const formModel = ref<PlayerItem>({
  id: 0,
  name: '',
  team: '',
  position: '',
  number: 1,
  age: 18,
  height: 175,
  weight: 70,
  status: 'active',
  updatedAt: '',
})

const formRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  team: [{ required: true, message: '请选择球队', trigger: 'change' }],
  position: [{ required: true, message: '请选择位置', trigger: 'change' }],
  number: [{ required: true, message: '请输入号码', trigger: 'blur' }],
}

function resetPage() {
  page.value = 1
}

function handleSearch() {
  resetPage()
}

function handleReset() {
  search.value = {
    keyword: '',
    team: '',
    position: '',
    status: '',
  }
  resetPage()
}

function handleAdd() {
  dialogMode.value = 'create'
  formModel.value = {
    id: Date.now(),
    name: '',
    team: '',
    position: '',
    number: 1,
    age: 18,
    height: 175,
    weight: 70,
    status: 'active',
    updatedAt: '',
  }
  dialogVisible.value = true
}

function handleEdit(row: PlayerItem) {
  dialogMode.value = 'edit'
  formModel.value = { ...row }
  dialogVisible.value = true
}

async function handleDelete(row: PlayerItem) {
  try {
    await ElMessageBox.confirm(`确定删除球员 ${row.name} 吗？`, '删除确认', {
      type: 'warning',
      confirmButtonText: '删除',
      cancelButtonText: '取消',
    })
    playerData.value = playerData.value.filter(item => item.id !== row.id)
    if (tableData.value.length === 1 && page.value > 1) {
      page.value -= 1
    }
    ElMessage.success('已删除')
  }
  catch {
    // 取消删除
  }
}

function handleSubmit() {
  (formRef.value as any).validate((valid: boolean) => {
    if (!valid) {
      return
    }

    const payload = {
      ...formModel.value,
      updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    }

    if (dialogMode.value === 'create') {
      playerData.value = [payload, ...playerData.value]
      ElMessage.success('新增成功')
    }
    else {
      playerData.value = playerData.value.map(item => item.id === payload.id ? payload : item)
      ElMessage.success('更新成功')
    }

    dialogVisible.value = false
  })
}
</script>

<template>
  <div class="absolute-container">
    <FaPageMain class="flex-1 overflow-auto" main-class="flex-1 flex flex-col overflow-auto">
      <FaSearchBar>
        <template #default>
          <ElForm :model="search" label-width="90px">
            <ElRow :gutter="16">
              <ElCol :span="8">
                <ElFormItem label="关键词">
                  <ElInput v-model="search.keyword" placeholder="姓名 / 球队 / 位置" clearable />
                </ElFormItem>
              </ElCol>
              <ElCol :span="5">
                <ElFormItem label="球队">
                  <ElSelect v-model="search.team" placeholder="全部" clearable>
                    <ElOption v-for="item in teams" :key="item" :label="item" :value="item" />
                  </ElSelect>
                </ElFormItem>
              </ElCol>
              <ElCol :span="5">
                <ElFormItem label="位置">
                  <ElSelect v-model="search.position" placeholder="全部" clearable>
                    <ElOption v-for="item in positions" :key="item" :label="item" :value="item" />
                  </ElSelect>
                </ElFormItem>
              </ElCol>
              <ElCol :span="6">
                <ElFormItem label="状态">
                  <ElSelect v-model="search.status" placeholder="全部" clearable>
                    <ElOption label="在队" value="active" />
                    <ElOption label="伤停" value="injured" />
                    <ElOption label="退役" value="retired" />
                  </ElSelect>
                </ElFormItem>
              </ElCol>
            </ElRow>
            <ElFormItem>
              <ElButton type="primary" @click="handleSearch">
                <template #icon>
                  <FaIcon name="i-ep:search" />
                </template>
                查询
              </ElButton>
              <ElButton @click="handleReset">
                重置
              </ElButton>
              <ElButton type="primary" plain @click="handleAdd">
                新增球员
              </ElButton>
            </ElFormItem>
          </ElForm>
        </template>
      </FaSearchBar>

      <div class="table-wrapper">
        <EsTable
          v-model:page="page"
          v-model:page-size="pageSize"
          :columns="columns"
          :data="tableData"
          :total="total"
          :show-index="true"
          table-height="100%"
        >
          <template #status="{ row }">
            <ElTag
              :type="row.status === 'active' ? 'success' : row.status === 'injured' ? 'warning' : 'info'"
              effect="light"
            >
              {{ row.status === 'active' ? '在队' : row.status === 'injured' ? '伤停' : '退役' }}
            </ElTag>
          </template>
          <template #actions="{ row }">
            <div class="flex-center gap-2">
              <ElButton type="primary" link @click="handleEdit(row)">
                编辑
              </ElButton>
              <ElButton type="danger" link @click="handleDelete(row)">
                删除
              </ElButton>
            </div>
          </template>
        </EsTable>
      </div>
    </FaPageMain>

    <ElDialog v-model="dialogVisible" :title="dialogMode === 'create' ? '新增球员' : '编辑球员'" width="520px">
      <ElForm ref="formRef" :model="formModel" :rules="formRules" label-width="90px">
        <ElFormItem label="姓名" prop="name">
          <ElInput v-model="formModel.name" placeholder="请输入姓名" />
        </ElFormItem>
        <ElFormItem label="球队" prop="team">
          <ElSelect v-model="formModel.team" placeholder="请选择球队">
            <ElOption v-for="item in teams" :key="item" :label="item" :value="item" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="位置" prop="position">
          <ElSelect v-model="formModel.position" placeholder="请选择位置">
            <ElOption v-for="item in positions" :key="item" :label="item" :value="item" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="号码" prop="number">
          <ElInputNumber v-model="formModel.number" :min="1" :max="99" class="w-full" />
        </ElFormItem>
        <ElFormItem label="年龄">
          <ElInputNumber v-model="formModel.age" :min="15" :max="50" class="w-full" />
        </ElFormItem>
        <ElFormItem label="身高(cm)">
          <ElInputNumber v-model="formModel.height" :min="150" :max="220" class="w-full" />
        </ElFormItem>
        <ElFormItem label="体重(kg)">
          <ElInputNumber v-model="formModel.weight" :min="45" :max="130" class="w-full" />
        </ElFormItem>
        <ElFormItem label="状态">
          <ElRadioGroup v-model="formModel.status">
            <ElRadioButton label="active">
              在队
            </ElRadioButton>
            <ElRadioButton label="injured">
              伤停
            </ElRadioButton>
            <ElRadioButton label="retired">
              退役
            </ElRadioButton>
          </ElRadioGroup>
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="dialogVisible = false">
          取消
        </ElButton>
        <ElButton type="primary" @click="handleSubmit">
          保存
        </ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<style scoped>
.absolute-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.table-wrapper {
  flex: 1;
  min-height: 0;
  margin-top: 16px;
}
</style>
