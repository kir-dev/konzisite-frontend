export enum AlertType {
  info = 'info',
  warning = 'warning',
  error = 'error',
  success = 'success'
}

export interface AlertModel {
  id: number
  description: string
  type: AlertType
}
