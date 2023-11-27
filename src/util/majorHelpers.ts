import { Major } from '../api/model/subject.model'

type MajorDictionary = {
  [K in Major]: string
}

export const isMajor = (key: PropertyKey): key is keyof typeof Major => {
  return key in Major
}

export const majorColor: MajorDictionary = {
  [Major.CE_BSC]: 'blue',
  [Major.EE_BSC]: 'green',
  [Major.BPROF]: 'purple',
  [Major.CE_MSC]: 'blue',
  [Major.EE_MSC]: 'green',
  [Major.BI_MSC]: 'yellow',
  [Major.HI_MSC]: 'red',
  [Major.SE_MSC]: 'gray'
}

export const majorVariant: MajorDictionary = {
  [Major.CE_BSC]: 'subtle',
  [Major.EE_BSC]: 'subtle',
  [Major.BPROF]: 'subtle',
  [Major.CE_MSC]: 'solid',
  [Major.EE_MSC]: 'solid',
  [Major.BI_MSC]: 'solid',
  [Major.HI_MSC]: 'solid',
  [Major.SE_MSC]: 'solid'
}

export const majorColorForIcon: MajorDictionary = {
  [Major.CE_BSC]: 'brand.200',
  [Major.EE_BSC]: 'green.300',
  [Major.BPROF]: 'purple.300',
  [Major.CE_MSC]: 'brand.400',
  [Major.EE_MSC]: 'green.600',
  [Major.BI_MSC]: 'yellow.400',
  [Major.HI_MSC]: 'red.400',
  [Major.SE_MSC]: 'gray.500'
}

export const MajorArray = [Major.CE_BSC, Major.EE_BSC, Major.BPROF, Major.CE_MSC, Major.EE_MSC, Major.BI_MSC, Major.HI_MSC, Major.SE_MSC]
