import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: PrismaNotificationRepository,
      useFactory: (prisma: PrismaService) => {
        return new PrismaNotificationRepository(prisma)
      },
      inject: [PrismaService]
    }
  ],
  exports: [PrismaNotificationRepository]
})
export class DatabaseModule {}
