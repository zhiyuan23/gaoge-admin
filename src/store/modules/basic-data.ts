import type { DataTypeOption, TableColumn } from '@/constants/modules/basic-data'
import apiBasicData from '@/api/modules/basic-data'
import { BASIC_DATA_COLUMNS, DATA_TYPE_OPTIONS } from '@/constants/modules/basic-data'

import { ElNotification } from 'element-plus'

const useBasicDataStore = defineStore(
  // 唯一ID
  'basic-data',
  () => {
    // 弹窗实例
    let notificationInstance: ReturnType<typeof ElNotification> | null = null
    let lastTipTitle: string | null = null

    // 数据类型
    const dataTypeOptions = ref<DataTypeOption[]>(DATA_TYPE_OPTIONS)
    const dataTypeTips = ref<any>({})
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
    const detailListData = ref<any>([])
    const detailIdName = ref<string>('id')

    // 帮助信息
    const helpList = ref<any[]>([])

    // 获取帮助信息
    async function fetchHelpList() {
      const res = await apiBasicData.getHelpListApi()
      helpList.value = res.data
    }

    // 下载帮助文档
    async function fetchHelpDoc() {
      await apiBasicData.getHelpFile()
    }

    // 设置数据类型选项
    function setDataTypeByCode(code: any) {
      const foundItem = dataTypeOptions.value.find(item => item.code === code)
      if (foundItem) {
        dataType.value = foundItem
        return true
      }
      return false
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

    // 初始化查询条件
    function initQueryConditions() {
      commonSearch.value = ''
      updateQueryParams({ conditions: [] })
    }

    // 获取查询条件值
    function getQueryConditionsValue() {
      const hylxPathMap: Record<string, string> = {
        合格: '',
        不合格: 'bhg',
        假兽药: 'jsy',
      }
      const hylxCondition = conditionItems.value.find((item: any) => item.field === 'hylx')
      const value = hylxCondition ? hylxPathMap[hylxCondition.value] ?? '' : ''

      return value
    }

    // 获取列配置
    async function fetchTableColumns() {
      const code = dataType.value.code as keyof typeof BASIC_DATA_COLUMNS
      tableColumns.value = [...BASIC_DATA_COLUMNS[code]]

      initTableColumns(code)
    }

    // 初始化表格列
    async function initTableColumns(code: string) {
      const hylxValue = getQueryConditionsValue()
      const visibilityMap: Record<string, boolean> = {}

      // 设置 不符合规定项目 可见性
      if (code === 'hyjdcjjg' || code === 'syjdcjjg') {
        visibilityMap.bhgxm = hylxValue === 'bhg'
      }

      // 设置 季度/月读 可见性
      if (code === 'hyjdcjjg') {
        visibilityMap.jd = hylxValue !== 'jsy'
        visibilityMap.yf = hylxValue === 'jsy'
      }

      // 设置 抽检批次 可见性
      if (code === 'hyjdcjjg') {
        visibilityMap.cjps = hylxValue === 'jsy'
      }

      tableColumns.value.forEach((col) => {
        if (col.prop! in visibilityMap) {
          col.visible = visibilityMap[col.prop!]
        }
      })
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

      // 经营企业只查询启用状态
      if (dataType.value.code === 'distributor') {
        baseConditions.push({
          field: 'enable',
          type: 'STRING',
          operator: 'EQUAL',
          value: '1',
        })
      }

      // 合并过滤后的条件
      const mergedConditions = [
        ...baseConditions,
        ...conditionItems.value.filter((item: any) => item.field !== 'commonSearch'),
      ]

      // 获取子路径
      const childPath = getQueryConditionsValue()

      // 拼接请求参数
      const params = {
        page: tablePage.value,
        rows: tablePageSize.value,
        conditionItems: mergedConditions,
      }

      const path = dataType.value.code + childPath

      // 更新提示（根据条件变更）
      showTips()

      const res = await apiBasicData.getListApi(path, params)
      tableRecords.value = res.data.rows
      totalRecords.value = res.data.total
    }

    // 获取详情数据-通过企业代码
    async function fetchDetailByQydm(id: any) {
      const params = {
        qydm: id,
      }
      const res = await apiBasicData.getDetailByQydmApi(params)
      detailListData.value = res.data
    }

    // 获取详情数据-通过批准文号
    async function fetchDetailByPzwh(id: any) {
      const res = await apiBasicData.getDetailByPzwhApi({ id })
      detailData.value = res.data
    }

    // 显示友情提示提示
    function showTips() {
      const message = dataTypeTips.value[dataType.value.code]
      const title = `${dataType.value.label}库友情提示`

      if (title === lastTipTitle) {
        return
      }

      closeTips()

      if (!message) {
        return
      }

      lastTipTitle = title

      notificationInstance = ElNotification({
        title,
        dangerouslyUseHTMLString: true,
        message,
        duration: 0,
        customClass: 'full-width-notification',
      })
    }

    // 关闭友情提示
    function closeTips() {
      if (notificationInstance) {
        notificationInstance.close()
        notificationInstance = null
      }
    }

    return {
      helpList,
      dataTypeOptions,
      dataTypeTips,
      dataType,
      commonSearch,
      tablePage,
      tablePageSize,
      tableColumns,
      tableRecords,
      totalRecords,
      detailData,
      detailListData,
      detailIdName,
      fetchHelpList,
      fetchHelpDoc,
      fetchTableColumns,
      fetchTableRecords,
      fetchDetailByQydm,
      fetchDetailByPzwh,
      setDataTypeByCode,
      updateQueryParams,
      initQueryConditions,
      showTips,
      closeTips,
    }
  },
  {
    persist: [
      {
        pick: [
          'dataType',
          'dataTypeOptions',
          'detailIdName',
        ],
        storage: sessionStorage,
      },
    ],
  },
)

export default useBasicDataStore
