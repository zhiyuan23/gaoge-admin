import type { DataTypeOption, TableColumn } from '@/constants/modules/basic-data'
import apiBasicData from '@/api/modules/basic-data'
import { BASIC_DATA_COLUMNS, DATA_TYPE_OPTIONS } from '@/constants/modules/basic-data'

const useBasicDataStore = defineStore(
  // 唯一ID
  'basic-data',
  () => {
    // 数据类型
    const dataTypeOptions = ref<DataTypeOption[]>(DATA_TYPE_OPTIONS)
    const dataType = ref<DataTypeOption>(dataTypeOptions.value[0])

    // 查询条件
    const commonSearch = ref<string>('')
    const conditionItems = ref<any>([])

    // 列表数据
    const tablePage = ref<number>(1)
    const tablePageSize = ref<number>(20)
    const tableColumns = ref<TableColumn[]>([])
    const tableRecords = ref<any[]>([])
    const totalRecords = ref<number>(0)

    // 详情数据
    const detailData = ref<any>({})

    // 帮助信息
    const helpList = ref<any[]>([])

    // 获取帮助信息
    async function fetchHelpList() {
      const res = await apiBasicData.getHelpListApi()
      helpList.value = res.data
    }

    // 更新查询条件
    async function updateQueryParams(params: {
      conditions?: any[]
      page?: number
      pageSize?: number
    }) {
      if (params.conditions) {
        conditionItems.value = params.conditions
        tablePage.value = 1
      }
      if (params.page !== undefined) {
        tablePage.value = params.page
      }
      if (params.pageSize !== undefined) {
        tablePageSize.value = params.pageSize
      }
    }

    // 获取列配置
    async function fetchTableColumns() {
      tableColumns.value = BASIC_DATA_COLUMNS[dataType.value.code as keyof typeof BASIC_DATA_COLUMNS]
    }
    // 获取表格数据
    async function fetchTableRecords() {
      const baseConditions = []

      if (commonSearch.value) {
        baseConditions.push({
          field: 'commonSearch',
          type: 'STRING',
          operator: 'LIKE',
          value: commonSearch.value,
        })
      }
      const existingConditions = conditionItems.value.filter(
        (item: { field: string }) => item.field !== 'commonSearch',
      )

      conditionItems.value = [
        ...baseConditions,
        ...existingConditions,
      ]

      const params = {
        page: tablePage.value,
        rows: tablePageSize.value,
        conditionItems: conditionItems.value,
      }
      const res = await apiBasicData.getListApi(dataType.value.code, params)

      tableRecords.value = res.data.rows
      totalRecords.value = res.data.total
    }

    // 获取详情数据
    async function fetchDetailData() {
      const res = await apiBasicData.getDetailApi()
      detailData.value = res.data
    }

    return {
      helpList,
      dataTypeOptions,
      dataType,
      commonSearch,
      tablePage,
      tablePageSize,
      tableColumns,
      tableRecords,
      totalRecords,
      detailData,
      fetchHelpList,
      fetchTableColumns,
      fetchTableRecords,
      fetchDetailData,
      updateQueryParams,
    }
  },
)

export default useBasicDataStore
