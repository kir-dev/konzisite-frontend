export const generateDateText = (date: string) => new Date(date).toLocaleString('hu-HU', { dateStyle: 'short' })

export const generateTimeSpanText = (date1: string, date2: string) =>
  new Date(date1).toLocaleString('hu-HU', { timeStyle: 'short' }) + ' - ' + new Date(date2).toLocaleString('hu-HU', { timeStyle: 'short' })
