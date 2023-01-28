import { Major } from '../../../api/model/subject.model'

type MajorDictionary = {
  [K in Major]: string
}

export const isMajor = (key: PropertyKey): key is keyof typeof Major => {
  return key in Major
}

export const translateMajor: MajorDictionary = {
  [Major.CE_BSC]: 'Mérnökinfó BSc',
  [Major.EE_BSC]: 'Villany BSc',
  [Major.BPROF]: 'Üzemmérnök',
  [Major.CE_MSC]: 'Mérnökinfó MSc',
  [Major.EE_MSC]: 'Villany MSc',
  [Major.BI_MSC]: 'Gazdinfó MSc',
  [Major.HI_MSC]: 'Egészségügyi mérnök MSc',
  [Major.SE_MSC]: 'Űrmérnök MSc'
}

export const majorColor: MajorDictionary = {
  [Major.CE_BSC]: 'blue',
  [Major.EE_BSC]: 'green',
  [Major.BPROF]: 'purple',
  [Major.CE_MSC]: 'blue',
  [Major.EE_MSC]: 'green',
  [Major.BI_MSC]: 'orange',
  [Major.HI_MSC]: 'red',
  [Major.SE_MSC]: 'yellow'
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

export const MajorArray = [Major.CE_BSC, Major.EE_BSC, Major.BPROF, Major.CE_MSC, Major.EE_MSC, Major.BI_MSC, Major.HI_MSC, Major.SE_MSC]
