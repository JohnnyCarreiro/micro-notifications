export class NotificationNotFoundException extends Error {
  public readonly nanme = 'NotificationNotFoundException'
  constructor(message?: string) {
    super(message ?? 'Notification not found.')
  }
}
