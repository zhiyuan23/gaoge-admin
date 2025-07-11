type ConditionType = 'STRING'
type OperatorType = 'LIKE' | 'EQUAL'

interface ConditionItem {
  field: string
  type: ConditionType
  operator: OperatorType
  value: string
}

interface FieldConfig {
  type?: ConditionType
  operator?: OperatorType
  ignoreEmpty?: boolean
}

export function useConditionConverter(
  formData: Record<string, any>,
  fieldConfigs: Record<string, FieldConfig> = {},
) {
  const defaultConfig: FieldConfig = {
    type: 'STRING',
    operator: 'LIKE',
    ignoreEmpty: true,
  }

  const convertToConditions = (): ConditionItem[] => {
    return Object.entries(formData)
      .filter(([field, value]) => {
        const config = fieldConfigs[field] || defaultConfig
        return !config.ignoreEmpty || (value !== '' && value !== null && value !== undefined)
      })
      .map(([field, value]) => {
        const config = fieldConfigs[field] || defaultConfig
        return {
          field,
          type: config.type || defaultConfig.type!,
          operator: config.operator || defaultConfig.operator!,
          value: String(value),
        }
      })
  }

  return {
    convertToConditions,
  }
}

// 使用方法

// const { convertToConditions } = useConditionConverter(formData)
//
// or
//
// const { convertToConditions } = useConditionConverter(formData, {
//   qymc: { operator: 'EQUAL' },
//   xkzh: { operator: 'EQUAL' },
// })
