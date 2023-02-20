import { FaBolt, FaBookMedical, FaBookOpen, FaLandmark, FaLaptopCode, FaRocket } from 'react-icons/fa'
import { Major } from '../../api/model/subject.model'

type Props = {
  majors: Major[]
}

export const MajorIcon = ({ majors }: Props) => {
  if (majors.length > 1) {
    return <FaBookOpen />
  }
  switch (majors[0]) {
    case Major.CE_BSC:
    case Major.CE_MSC:
    case Major.BPROF:
      return <FaLaptopCode />
    case Major.EE_BSC:
    case Major.EE_MSC:
      return <FaBolt />
    case Major.BI_MSC:
      return <FaLandmark />
    case Major.HI_MSC:
      return <FaBookMedical />
    case Major.SE_MSC:
      return <FaRocket />
  }
}
