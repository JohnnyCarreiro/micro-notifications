import { Notification } from '@entities/notification'
import { NotificationRepository } from '@repositories/notification-repository'
import { PrismaService } from '../prisma.service'

export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const { id, recipientId, content, category, readAt, createdAt } =
      notification
    await this.prisma.notification.create({
      data: {
        id,
        recipientId,
        content: content.value,
        category,
        readAt: readAt?.toISOString() ?? null,
        createdAt: createdAt.toISOString()
      }
    })
  }
}
