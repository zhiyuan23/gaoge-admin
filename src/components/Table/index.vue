<script setup lang="ts">
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import type { PropType } from 'vue'
import { computed, ref, watch } from 'vue'

// 列配置类型
export interface ColumnProps<T = any> extends Partial<TableColumnCtx<T>> {
  slot?: string // 插槽名称
}
type TableSize = '' | 'large' | 'default' | 'small'

defineOptions({
  name: 'EsTable',
})

const props = defineProps({
  // 表格列配置
  columns: {
    type: Array as PropType<ColumnProps[]>,
    required: true,
  },
  // 是否显示序号列
  showIndex: {
    type: Boolean,
    default: false,
  },
  // 表格数据
  data: {
    type: Array,
    default: () => [],
  },
  // 是否显示分页
  showPagination: {
    type: Boolean,
    default: true,
  },
  // 总条目数
  total: {
    type: Number,
    default: 0,
  },
  // 当前页码
  page: {
    type: Number,
    default: 1,
  },
  // 每页显示条目数
  pageSize: {
    type: Number,
    default: 20,
  },
  // 每页显示个数选择器的选项设置
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 50, 100],
  },
  // 分页布局
  paginationLayout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
  },
  // 是否为分页按钮添加背景色
  background: {
    type: Boolean,
    default: true,
  },
  // 是否显示边框
  border: {
    type: Boolean,
    default: true,
  },
  // 表格尺寸
  tableSize: {
    type: String as () => TableSize,
    default: '' as TableSize,
    validator: (value: string): value is TableSize => {
      return ['', 'default', 'small', 'large'].includes(value)
    },
  },
  // 表格高度
  tableHeight: {
    type: [String, Number],
    default: '100%',
  },
  // 表格最大高度
  maxHeight: {
    type: [String, Number],
    default: '100%',
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:page', 'update:pageSize', 'paginationChange'])

// 当前页码
const currentPage = ref(props.page)
// 每页条数
const internalPageSize = ref(props.pageSize)

// 最终列配置（加上序号列）
const finalColumns = computed(() => {
  const indexCol: ColumnProps = {
    label: '序号',
    type: 'index',
    width: 70,
    align: 'center',
    fixed: true,
  }

  return props.showIndex ? [indexCol, ...props.columns] : props.columns
})

// 监听外部传入的页码变化
watch(() => props.page, (val) => {
  currentPage.value = val
})

// 监听外部传入的每页条数变化
watch(() => props.pageSize, (val) => {
  internalPageSize.value = val
})

// 每页条数改变
function handleSizeChange(size: number) {
  internalPageSize.value = size
  emit('update:pageSize', size)
  emitPaginationChange()
}

// 当前页改变
function handleCurrentChange(page: number) {
  currentPage.value = page
  emit('update:page', page)
  emitPaginationChange()
}

// 触发分页改变事件
function emitPaginationChange() {
  emit('paginationChange', {
    page: currentPage.value,
    pageSize: internalPageSize.value,
  })
}
</script>

<template>
  <div class="h-full flex-col">
    <!-- 表格区域 -->
    <ElTable
      v-loading="loading"
      :data="data"
      :border="border"
      :height="tableHeight"
      :max-height="maxHeight"
      :size="tableSize"
      stripe
      class="w-full"
      :class="tableSize ? '' : 'table-wrap'"
      v-bind="$attrs"
      color="text-primary"
    >
      <template v-for="col in finalColumns" :key="col.prop">
        <!-- 自定义列插槽 -->
        <ElTableColumn v-if="col.slot" v-bind="col">
          <template #default="scope">
            <slot :name="col.slot" v-bind="scope" />
          </template>
        </ElTableColumn>

        <!-- 普通列 -->
        <ElTableColumn
          v-else v-bind="col"
          show-overflow-tooltip
          color="text-primary"
        />
      </template>
    </ElTable>

    <!-- 分页区域 -->
    <div v-if="showPagination" class="mt-4 flex-center-end">
      <ElPagination
        v-model:current-page="currentPage"
        v-model:page-size="internalPageSize"
        :layout="paginationLayout"
        :page-sizes="pageSizes"
        :total="total"
        :background="background"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.el-table__header th) {
  color: text-primary;
}

:deep(.el-table-fixed-column--right) {
  padding: 0;
}
</style>
