import { TFunction, i18n } from 'i18next'

export const generateDateText = (date: string, i18n: i18n) => new Date(date).toLocaleDateString(i18n.language, { dateStyle: 'short' })

export const generateDaysLeftText = (date: string, t: TFunction) => {
  const beginningOfToday = new Date()
  beginningOfToday.setHours(0, 0, 0, 0)
  const daysLeft = Math.floor((new Date(date).getTime() - beginningOfToday.getTime()) / 1000 / 60 / 60 / 24)
  if (daysLeft > 0) {
    return t('requests.untilDeadline', { count: daysLeft })
  } else {
    return t('requests.sinceDeadline', { count: -daysLeft + 1 })
  }
}

export const generateTimeSpanText = (date1: string, date2: string, i18n: i18n) =>
  new Date(date1).toLocaleTimeString(i18n.language, { timeStyle: 'short' }) +
  ' - ' +
  new Date(date2).toLocaleTimeString(i18n.language, { timeStyle: 'short' })

export const formatDate = (date?: Date) => {
  if (!date) {
    return ''
  }
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()
  const year = date.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

export const formatTime = (date: Date) => {
  let hour = '' + date.getHours()
  let minute = '' + date.getMinutes()

  if (hour.length < 2) hour = '0' + hour
  if (minute.length < 2) minute = '0' + minute

  return [hour, minute].join(':')
}

export const getStartOfSemester = (): Date => {
  const date = new Date()
  // If it's not August yet, the user is probably interested in the fall semester
  if (date.getMonth() < 7) {
    // 1st of September of the previous year
    date.setFullYear(date.getFullYear() - 1)
    date.setMonth(8)
    date.setDate(1)
    date.setHours(0, 0, 0, 0)
  } else {
    // 1st of February of the same year
    date.setMonth(1)
    date.setDate(1)
    date.setHours(0, 0, 0, 0)
  }
  return date
}

export const getEndOfSemester = (): Date => {
  const date = new Date()
  // If it's not August yet, the user is probably interested in the fall semester
  if (date.getMonth() < 7) {
    // 31st of January of the same year
    date.setMonth(0)
    date.setDate(31)
    date.setHours(23, 59, 59, 999)
  } else {
    // 31st of August of the same year
    date.setMonth(7)
    date.setDate(31)
    date.setHours(23, 59, 59, 999)
  }
  return date
}
