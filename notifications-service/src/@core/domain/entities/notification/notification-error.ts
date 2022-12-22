export class InvalidNotificationError extends Error {
  public readonly name = 'InvalidNotificationError'
  constructor(value: string) {
    super('Notification Erro: ' + value)
  }
}
