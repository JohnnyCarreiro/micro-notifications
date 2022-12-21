import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreatenotificationBody } from '../dtos/create-notification-body'

@Controller('notifications')
export class NotificationsController {
  @Get()
  async getNotifications() {
    return
  }

  @Post()
  async createNotification(
    @Body() body: CreatenotificationBody
  ): Promise<void> {
    console.log(body)
    const { recipientId, content, category } = body
    // await this.prisma.notification.create({
    //   data: {
    //     id: randomUUID(),
    //     recipientId,
    //     content,
    //     category,
    //     createdAt: new Date(Date.now()).toISOString()
    //   }
    // })
  }
}
