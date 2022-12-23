import { Notification } from '@entities/notification'

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt ?? undefined,
      scheduledFor: notification.scheduledFor ?? undefined,
      createdAt: notification.createdAt.toISOString()
    }
  }
}
