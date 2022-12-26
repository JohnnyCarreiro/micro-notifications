import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { NotificationsController } from './controllers/notifications.controller'
import { NotificationRepository } from '@repositories/notification-repository'
import { PrismaNotificationRepository } from '../database/prisma/repositories/prisma-notification-repository'
import { SendNotificationUseCase } from '@application/use-cases/send-notification'
import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification'
import { ReadNotificationUseCase } from '@application/use-cases/read-notification'
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notification'
import { CountRecipientNotificationsUseCase } from '@application/use-cases/count-recipient-notificaitons'
import { GetRecipientNotificationsUseCase } from '@application/use-cases/get-recipient-notifications'
import { ScheduleNotificationUseCase } from '@application/use-cases/schedule-notification'
import { CancelScheduleUseCase } from '@application/use-cases/cancel-schedule-notification'
import { SendScheduledNotificationUseCase } from '@application/use-cases/send-scheduled-notification'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    {
      provide: SendNotificationUseCase,
      useFactory: (notificationRepository: NotificationRepository) => {
        return new SendNotificationUseCase(notificationRepository)
      },
      inject: [PrismaNotificationRepository]
    },
    {
      provide: CancelNotificationUseCase,
      useFactory: (notificationRepository: NotificationRepository) => {
        return new CancelNotificationUseCase(notificationRepository)
      },
      inject: [PrismaNotificationRepository]
    },
    {
      provide: ReadNotificationUseCase,
      useFactory: (notificationRepository: NotificationRepository) => {
        return new ReadNotificationUseCase(notificationRepository)
      },
      inject: [PrismaNotificationRepository]
    },
    {
      provide: UnreadNotificationUseCase,
      useFactory: (notificationRepository: NotificationRepository) => {
        return new UnreadNotificationUseCase(notificationRepository)
      },
      inject: [PrismaNotificationRepository]
    },
    {
      provide: CountRecipientNotificationsUseCase,
      useFactory: (notificationRepository: NotificationRepository) => {
        return new CountRecipientNotificationsUseCase(notificationRepository)
      },
      inject: [PrismaNotificationRepository]
    },
    {
      provide: GetRecipientNotificationsUseCase,
      useFactory: (notificationRepository: NotificationRepository) => {
        return new GetRecipientNotificationsUseCase(notificationRepository)
      },
      inject: [PrismaNotificationRepository]
    },
    {
      provide: ScheduleNotificationUseCase,
      useFactory: (notificationRepository: NotificationRepository) => {
        return new ScheduleNotificationUseCase(notificationRepository)
      },
      inject: [PrismaNotificationRepository]
    },
    {
      provide: CancelScheduleUseCase,
      useFactory: (notificationRepository: NotificationRepository) => {
        return new CancelScheduleUseCase(notificationRepository)
      },
      inject: [PrismaNotificationRepository]
    },
    {
      provide: SendScheduledNotificationUseCase,
      useFactory: (notificationRepository: NotificationRepository) => {
        return new SendScheduledNotificationUseCase(notificationRepository)
      },
      inject: [PrismaNotificationRepository]
    }
  ],
  exports: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientNotificationsUseCase,
    ScheduleNotificationUseCase,
    CancelScheduleUseCase,
    SendScheduledNotificationUseCase
  ]
})
export class HttpModule {}
