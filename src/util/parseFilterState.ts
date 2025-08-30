import { ConsultationFilters } from '../api/hooks/consultationQueryHooks'

export const parseFilterState = (): ConsultationFilters | undefined => {
  const savedStateJson = localStorage.getItem('filterState')
  if (!savedStateJson) return
  const savedState: ConsultationFilters = JSON.parse(savedStateJson)
  return {
    ...savedState,
    startDate: savedState.startDate ? new Date(savedState.startDate) : undefined,
    endDate: savedState.endDate ? new Date(savedState.endDate) : undefined
  }
}
