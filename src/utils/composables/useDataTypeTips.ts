import apiBasicData from '@/api/modules/basic-data'

// sjkbs → 最终 key 的映射表
const KEY_MAP: Record<string, string> = {
  SYSCQY: 'syscqyinfo', // 生产许可证
  GMP: 'syscqyinfo', // GMP证书也并入 syscqyinfo
  SYCPPZWH: 'sycppzwh',
  JKSYBY: 'jksyby',
  SYSWZPPQFGL: 'syswzppqfgl',
  HYJDCJJG: 'hyjdcjjg',
  SYJDCJJG: 'syjdcjjg',
  LCSYSP: 'lcsysp',
  GNXSYZC: 'gnxsyzc',
  JKSYZCXX: 'jksyzc',
  GNSYBQSMS: 'gnsybqsms',
  JKSYBQSMS: 'jksybqsms',
  SYGJBZ: 'sygjbz',
}

// 各库额外提示
const EXTRA_TIPS: Record<string, any> = {
  syscqyinfo: {
    SYSCQY: '如发现数据库中的生产许可证数据的问题，请致电:59193265，62103531',
    GMP: '如发现数据库中的GMP证书数据的问题，请致电:62103531',
  },
  sycppzwh: '如发现数据库中数据的问题，请致电:62103535',
  jksyby: '如发现数据库中数据的问题，请致电：62103581',
  syswzppqfgl: '如发现数据库中数据的问题，请致电：62103581',
  hyjdcjjg: '如发现数据库中数据的问题，请致电：62103520',
  syjdcjjg: '如发现数据库中数据的问题，请致电：62103520',
  lcsysp: '如发现数据库中数据的问题，请致电：59193265',
  gnxsyzc: '如发现数据库中数据的问题，请致电：59193265',
  jksyzc: '如发现数据库中数据的问题，请致电：59193265',
  gnsybqsms: '本库收载的是《中华人民共和国兽药典》(二〇一五年版)<br>中编写的兽药产品说明书范本<br>如发现数据库中数据的问题，请致电:62103547/8<br>如遇到pdf文件不能打开的情况，请换谷歌浏览器',
  jksybqsms: '如发现数据库中数据的问题，请致电：62103557/63<br>如遇到pdf文件不能打开的情况，请换谷歌浏览器',
  sygjbz: '如发现数据库中数据的问题，请致电：62103548<br>如遇到pdf文件不能打开的情况，请换谷歌浏览器',
}

// 构建最终提示对象
function buildFinalTips(arr: any[]) {
  const result: Record<string, string> = {
    syscqyinfo: '',
    sycppzwh: '',
    jksyby: '',
    syswzppqfgl: '',
    hyjdcjjg: '',
    syjdcjjg: '',
    lcsysp: '',
    gnxsyzc: '',
    jksyzc: '',
    gnsybqsms: '',
    jksybqsms: '',
    sygjbz: '',
  }

  arr.forEach((item) => {
    const finalKey = KEY_MAP[item.sjkbs]
    if (!finalKey) {
      return
    }

    const dateTip = `数据更新截止日期:${item.sjrq}`

    if (finalKey === 'syscqyinfo') {
      // syscqyinfo 要把 SYSCQY 和 GMP 的提示合并
      const extra = EXTRA_TIPS[finalKey][item.sjkbs] || ''
      result[finalKey] += `${item.sjkbs === 'GMP' ? 'GMP证书' : '生产许可证'}的数据更新截止日期:${item.sjrq}<br>${extra}<br>`
    }
    else {
      const extra = EXTRA_TIPS[finalKey] || ''
      result[finalKey] = `${dateTip}<br>${extra}`
    }
  })
  return result
}

// composable
export function useDataTypeTips() {
  const tips: Ref<Record<string, string>> = ref({})

  const loadTips = async () => {
    const params = { page: 1, rows: 100, conditionItems: [] }
    const { data: { rows } }: any = await apiBasicData.getTipsList(params)

    tips.value = buildFinalTips(rows)
  }

  return {
    tips,
    loadTips,
  }
}
