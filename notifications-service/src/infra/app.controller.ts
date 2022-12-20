import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from '../app.service'
import { PrismaService } from './prisma.service'
import { randomUUID } from 'node:crypto'
import { CreatenotificationBody } from './create-notification-body'

@Controller('notifications')
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly service: AppService
  ) {}

  @Get()
  async getNotifications() {
    return await this.prisma.notification.findMany()
  }

  @Post()
  async createNotification(
    @Body() body: CreatenotificationBody
  ): Promise<void> {
    console.log(body)
    const { recipientId, content, category } = body
    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        recipientId,
        content,
        category,
        createdAt: new Date(Date.now()).toISOString()
      }
    })
  }
}
