import { Module } from '@nestjs/common'
import { KafkaConsumerService } from './kafka/kafka-consumer.service'
import { NotificationsController } from './kafka/controllers/notifications.controller'
import { DatabaseModule } from '@infra/database/database.module'
import { HttpModule } from '@infra/http/http.module'

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [KafkaConsumerService],
  controllers: [NotificationsController],
  exports: []
})
export class MessagingModule {}
