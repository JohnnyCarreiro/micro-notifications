import { Notification } from '../../src/@core/domain/entities/notification'
import { NotificationRepository } from '../../src/@core/domain/repositories/notification-repository'

export class InMamoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = []
  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }
}
