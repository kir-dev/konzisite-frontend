export const getStatusString = (text: string = '', maxChar: number): string => `${text?.trim().length || 0} / ${maxChar}`
