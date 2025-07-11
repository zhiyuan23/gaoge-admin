import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  {
    url: '/mock/basic/columns',
    method: 'get',
    response: () => {
      return {
        error: '',
        status: 1,
        data: [
          { prop: 'qymc', label: '企业名称' },
          { prop: 'xkzh', label: '许可证号' },
          { prop: 'gmpZsh', label: 'GMP证书' },
          { prop: 'cym', label: '曾用名' },
        ],
      }
    },
  },
  {
    url: '/mock/basic/list',
    method: 'get',
    response: () => {
      return {
        error: '',
        status: 1,
        data: {
          total: 20,
          rows: [
            { id: 1, orgName: '华康制药有限公司', licenseKey: 'XK-2025001', GMP: 'GMP-001-2025', usedName: '华康医药' },
            { id: 2, orgName: '百信药业股份公司', licenseKey: 'XK-2025002', GMP: 'GMP-002-2025', usedName: '百信药厂' },
            { id: 3, orgName: '中联医药科技公司', licenseKey: 'XK-2025003', GMP: 'GMP-003-2025', usedName: '中联制药' },
            { id: 4, orgName: '康宁药业集团', licenseKey: 'XK-2025004', GMP: 'GMP-004-2025', usedName: '康宁医药' },
            { id: 5, orgName: '盛世医药有限公司', licenseKey: 'XK-2025005', GMP: 'GMP-005-2025', usedName: '盛世制药' },
            { id: 6, orgName: '润达生物制品厂', licenseKey: 'XK-2025006', GMP: 'GMP-006-2025', usedName: '润达制药' },
            { id: 7, orgName: '国科药品公司', licenseKey: 'XK-2025007', GMP: 'GMP-007-2025', usedName: '国科医药' },
            { id: 8, orgName: '绿康制药集团', licenseKey: 'XK-2025008', GMP: 'GMP-008-2025', usedName: '绿康药业' },
            { id: 9, orgName: '欣悦医药有限公司', licenseKey: 'XK-2025009', GMP: 'GMP-009-2025', usedName: '欣悦制药' },
            { id: 10, orgName: '启明生物科技', licenseKey: 'XK-2025010', GMP: 'GMP-010-2025', usedName: '启明制药' },
            { id: 11, orgName: '德康药业股份公司', licenseKey: 'XK-2025011', GMP: 'GMP-011-2025', usedName: '德康药厂' },
            { id: 12, orgName: '博润医药集团', licenseKey: 'XK-2025012', GMP: 'GMP-012-2025', usedName: '博润医药' },
            { id: 13, orgName: '中源药品公司', licenseKey: 'XK-2025013', GMP: 'GMP-013-2025', usedName: '中源制药' },
            { id: 14, orgName: '华盛生物科技', licenseKey: 'XK-2025014', GMP: 'GMP-014-2025', usedName: '华盛医药' },
            { id: 15, orgName: '同德制药有限公司', licenseKey: 'XK-2025015', GMP: 'GMP-015-2025', usedName: '同德药厂' },
            { id: 16, orgName: '恒源药业公司', licenseKey: 'XK-2025016', GMP: 'GMP-016-2025', usedName: '恒源制药' },
            { id: 17, orgName: '金桥医药有限公司', licenseKey: 'XK-2025017', GMP: 'GMP-017-2025', usedName: '金桥药业' },
            { id: 18, orgName: '天诚生物制品厂', licenseKey: 'XK-2025018', GMP: 'GMP-018-2025', usedName: '天诚制药' },
            { id: 19, orgName: '益康制药集团', licenseKey: 'XK-2025019', GMP: 'GMP-019-2025', usedName: '益康医药' },
            { id: 20, orgName: '瑞泰药业公司', licenseKey: 'XK-2025020', GMP: 'GMP-020-2025', usedName: '瑞泰药厂' },
          ],
        },
      }
    },
  },
  {
    url: '/mock/basic/detail',
    method: 'get',
    response: () => {
      return {
        error: '',
        status: 1,
        data: {
          id: '2983000927851538628',
          itemid: 2468017,
          xkzh: '（2022）兽药生产证字31012号',
          qymc: '新疆海研制药有限公司',
          scfw: '中药提取（甘草浸膏）、口服溶液剂（含中药提取）^',
          zcdz: null,
          fddbr: null,
          fddbrzz: null,
          qyfzr: null,
          scdz: '新疆昌吉州呼图壁县工业园轻纺产业园区3号路36院',
          fzrq: '2022/06/30',
          yxqz: '2027/06/29',
          zszt: null,
          bgqk: null,
          shr: null,
          shrq: '2025/07/07',
          zhnd: null,
          qydm: '31012',
          byx: '0',
          gmpItemid: '4436509',
          gmpQymc: '新疆海研制药有限公司',
          gmpScdz: '新疆昌吉州呼图壁县工业园轻纺产业园区3号路36院^',
          gmpYsfw: '中药提取（甘草浸膏）、口服溶液剂（含中药提取）^',
          gmpZsh: '（2022）兽药GMP证字31012号',
          gmpYszt: null,
          gmpGgh: null,
          gmpGgrq: '2022/06/30',
          gmpSxrq: '2027/06/29',
          gmpSf: null,
          gmpQyxz: null,
          gmpZszt: null,
          gmpBgqk: null,
          gmpShr: '系统自动',
          gmpShrq: '2025/07/07',
          gmpQydm: '31012',
          gmpByx: '0',
          cym: null,
        },
      }
    },
  },
])
