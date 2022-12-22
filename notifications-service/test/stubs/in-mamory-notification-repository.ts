import { NotificationRepository } from '@repositories/notification-repository'
import { Notification } from '../../src/@core/domain/entities/notification'
import { SendNotificationUseCase } from '@application/use-cases/send-notification'

export class InMamoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = []
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId
    )
    if (!notification) {
      return null
    }
    return notification
  }
  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (notification) => notification.id === notification.id
    )

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification
    }
  }
}
