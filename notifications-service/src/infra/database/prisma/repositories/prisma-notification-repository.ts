import { Notification } from '@entities/notification'
import { NotificationRepository } from '@repositories/notification-repository'
import { PrismaService } from '../prisma.service'
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper'

export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId }
    })

    if (!notification) {
      return null
    }

    return PrismaNotificationMapper.toDomain(notification)
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { recipientId }
    })

    return notifications.map(PrismaNotificationMapper.toDomain)
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return await this.prisma.notification.count({
      where: { recipientId: recipientId }
    })
  }

  async create(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification)
    })
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)
    await this.prisma.notification.update({
      where: { id: raw.id },
      data: raw
    })
  }
}
