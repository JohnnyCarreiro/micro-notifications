import { Module } from '@nestjs/common'
import { NotificationsController } from './controllers/notifications.controller'
import { NotificationRepository } from 'src/@core/domain/repositories/notification-repository'
import { PrismaNotificationRepository } from '../database/prisma/repositories/prisma-notification-repository'
import { SendNotificationUseCase } from 'src/@core/domain/application/use-cases/send-notification'
import { DatabaseModule } from '../database/database.module'

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
    }
  ]
})
export class HttpModule {}
