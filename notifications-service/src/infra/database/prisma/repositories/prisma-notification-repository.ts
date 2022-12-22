import { Notification } from '@entities/notification'
import { NotificationRepository } from '@repositories/notification-repository'
import { PrismaService } from '../prisma.service'
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper'

export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(notificationId: string): Promise<Notification | null> {
    throw new Error('Method not implemented.')
  }
  async create(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification)
    })
  }
  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
