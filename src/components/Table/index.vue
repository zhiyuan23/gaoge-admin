<script>
import { ElPagination, ElTable, ElTableColumn } from 'element-plus'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'BaseTable',
  components: {
    ElTable,
    ElTableColumn,
    ElPagination,
  },
  props: {
    // 表格数据
    data: {
      type: Array,
      required: true,
    },
    // 表格列配置
    columns: {
      type: Array,
      required: true,
    },
    // 分页配置
    pagination: {
      type: Object,
      default: null,
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // 分页改变的处理
    const handlePageChange = (page) => {
      if (props.pagination) {
        emit('update:pagination', { ...props.pagination, currentPage: page })
      }
    }

    // 当分页更新时触发
    watch(
      () => props.pagination,
      (newPagination) => {
        if (newPagination) {
          // 触发页面变动事件
          emit('pagination-change', newPagination)
        }
      },
      { immediate: true },
    )

    return {
      handlePageChange,
    }
  },
})
</script>

<template>
  <div>
    <!-- 表格 -->
    <ElTable
      :data="data"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      border
      style="width: 100%"
    >
      <!-- 表格头 -->
      <template v-for="(column, index) in columns" :key="index">
        <ElTableColumn
          v-if="column.visible"
          :label="column.label"
          :prop="column.prop"
          :sortable="column.sortable"
          :formatter="column.formatter"
          :width="column.width"
          :min-width="column.minWidth"
        >
          <!-- 支持自定义列内容 -->
          <template #default="scope">
            <slot :name="column.prop" :scope="scope">
              {{ scope.row[column.prop] }}
            </slot>
          </template>
        </ElTableColumn>
      </template>
    </ElTable>

    <!-- 分页 -->
    <div v-if="pagination" class="pagination">
      <ElPagination
        :page-size="pagination.pageSize"
        :total="pagination.total"
        :current-page="pagination.currentPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

  <style scoped>
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
  </style>
