export interface TableColumn {
  prop?: string
  label: string
  width?: number
  slot?: string
  type?: string
  link?: boolean | ((row: any) => string)
  linkParams?: any
  fixed?: 'left' | 'right' | boolean
  align?: 'left' | 'center' | 'right'
}

export interface DataTypeOption {
  code: string
  label: string
  placeholder?: string
}
