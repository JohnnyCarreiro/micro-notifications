import { SendNotificationUseCase } from '@application/use-cases/send-notification'
import { Controller } from '@nestjs/common'
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices'

interface SendNotificationPayload {
  recipientId: string
  content: string
  category: string
}

@Controller()
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotificationUseCase) {}
  @EventPattern('notifications.send-notification')
  async handleSendNotification(
    @Payload() { recipientId, content, category }: SendNotificationPayload
  ) {
    await this.sendNotification.execute({
      recipientId,
      content,
      category
    })
  }

  // @MessagePattern('notifications.send-notification')
  // async testNotification(@Payload() message: any) {
  //   console.log('MESSAGE: ', message)
  // }
}
