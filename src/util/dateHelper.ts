export const generateDateText = (date: string) => new Date(date).toLocaleString('hu-HU', { dateStyle: 'short' })

export const generateDaysLeftText = (date: string) => {
  const daysLeft = Math.floor((new Date(date).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24)
  if (daysLeft > 0) {
    return `${daysLeft} nap van hátra`
  } else if (daysLeft === 0) {
    return 'Ma jár le'
  } else {
    return `${-daysLeft} napja járt le`
  }
}

export const generateTimeSpanText = (date1: string, date2: string) =>
  new Date(date1).toLocaleString('hu-HU', { timeStyle: 'short' }) + ' - ' + new Date(date2).toLocaleString('hu-HU', { timeStyle: 'short' })

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
