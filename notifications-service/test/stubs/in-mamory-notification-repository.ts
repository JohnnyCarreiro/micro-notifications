import { NotificationRepository } from '@repositories/notification-repository'
import { Notification } from '../../src/@core/domain/entities/notification'

export class InMamoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = []
  async findById(notificationId: string): Promise<Notification | null> {
    throw new Error('Method not implemented.')
  }
  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }
  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
