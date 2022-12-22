import { Notification } from '@entities/notification'

export abstract class NotificationRepository {
  abstract findById(notificationId: string): Promise<Notification | null>
  abstract getRecipientNotifications(
    recipientId: string
  ): Promise<Notification[]>
  abstract create(notification: Notification): Promise<void>
  abstract save(notification: Notification): Promise<void>
  abstract countManyByRecipientId(recipientId: string): Promise<number>
}
