export enum Major {
  CE_BSC = 'CE_BSC',
  EE_BSC = 'EE_BSC',
  BPROF = 'BPROF',
  CE_MSC = 'CE_MSC',
  EE_MSC = 'EE_MSC',
  BI_MSC = 'BI_MSC',
  HI_MSC = 'HI_MSC',
  SE_MSC = 'SE_MSC'
}

export interface SubjectModel {
  id: number
  code: string
  name: string
  englishName: string
  majors: Major[]
}
