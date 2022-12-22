import { Notification as RawNotification } from '@prisma/client'
import { Content, Notification } from '@entities/notification'

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt?.toISOString() ?? null,
      createdAt: notification.createdAt.toISOString()
    }
  }

  static toDomain(raw: RawNotification): Notification {
    const notification = Notification.create(
      {
        recipientId: raw.recipientId,
        content: Content.create(raw.content).value as Content,
        category: raw.category,
        readAt: raw.readAt ? new Date(raw.readAt) : null,
        createdAt: new Date(raw.createdAt)
      },
      raw.id
    )

    if (notification.isLeft()) {
      throw new Error('Unexpected Error While restoring Notification Entity')
    }

    return notification.value as Notification
  }
}
