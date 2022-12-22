import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreatenotificationBody } from '../dtos/create-notification-body'
import {
  SendNotificationResponse,
  SendNotificationUseCase
} from '@application/use-cases/send-notification'
import { Notification } from '@entities/notification'

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotificationUseCase) {}
  @Get()
  async getNotifications() {
    return
  }

  @Post()
  async createNotification(@Body() body: CreatenotificationBody) {
    const { recipientId, content, category } = body

    try {
      const response = await this.sendNotification.execute({
        recipientId,
        content,
        category
      })

      if (response.isLeft()) {
        throw new Error(response.value.message)
      }
      const { notification } = response.value as SendNotificationResponse

      console.log('Notification: ', {
        id: notification.id,
        recipientId: notification.recipientId,
        content: notification.content.value,
        category: notification.category,
        createdAt: notification.createdAt.toISOString()
      })

      return {
        notification: {
          id: notification.id,
          recipientId: notification.recipientId,
          content: notification.content.value,
          category: notification.category,
          createdAt: notification.createdAt.toISOString()
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Unexpected error: ' + error)
    }
  }
}
