import { ConsultationFilters } from '../api/hooks/consultationQueryHooks'

export const parseFilterState = (): ConsultationFilters | undefined => {
  const savedStateJson = localStorage.getItem('filterState')
  if (!savedStateJson) return
  let savedState: ConsultationFilters
  try {
    savedState = JSON.parse(savedStateJson)
  } catch {
    return
  }
  return {
    ...savedState,
    startDate: savedState.startDate ? new Date(savedState.startDate) : undefined,
    endDate: savedState.endDate ? new Date(savedState.endDate) : undefined
  }
}
