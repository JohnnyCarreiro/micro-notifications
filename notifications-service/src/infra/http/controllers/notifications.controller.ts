import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CreatenotificationBody } from '../dtos/create-notification-body'
import { NotificationViewModel } from '../view-models/notification-view-model'
import { SendNotificationUseCase } from '@application/use-cases/send-notification'
import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification'
import { ReadNotificationUseCase } from '@application/use-cases/read-notification'
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notification'
import { CountRecipientNotificationsUseCase } from '@application/use-cases/count-recipient-notificaitons'
import { GetRecipientNotificationsUseCase } from '@application/use-cases/get-recipient-notifications'
import { SetNotificationScheduleBody } from '../dtos/set-notification-schedule-body'
import { ScheduleNotificationUseCase } from '@application/use-cases/schedule-notification'
import { CancelScheduleUseCase } from '@application/use-cases/cancel-schedule-notification'
import { SendScheduledNotificationBody } from '../dtos/send-scheduled-notification'
import { SendScheduledNotificationUseCase } from '@application/use-cases/send-scheduled-notification'

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotification: SendNotificationUseCase,
    private readonly cancelNotification: CancelNotificationUseCase,
    private readonly readNotification: ReadNotificationUseCase,
    private readonly unreadNotification: UnreadNotificationUseCase,
    private readonly countNotificaitons: CountRecipientNotificationsUseCase,
    private readonly getRecipientNotifications: GetRecipientNotificationsUseCase,
    private readonly scheduleNotification: ScheduleNotificationUseCase,
    private readonly cancelSchedule: CancelScheduleUseCase,
    private readonly sendScheduledNotification: SendScheduledNotificationUseCase
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string
  ): Promise<{ count: number }> {
    const response = await this.countNotificaitons.execute({ recipientId })

    if (response.isLeft()) {
      // throw new HttpException(response.value, 404)
      throw new Error(response.value.message)
    }

    return { count: response.value.count }
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string): Promise<{
    notifications: ReturnType<typeof NotificationViewModel.toHttp>[]
  }> {
    const response = await this.getRecipientNotifications.execute({
      recipientId
    })
    if (response.isLeft()) {
      // throw new HttpException(response.value, 404)
      throw new Error(response.value.message)
    }
    const notifications = response.value.notifications.map(
      NotificationViewModel.toHttp
    )
    return { notifications }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id })
  }

  @Patch(':id/schedule')
  async schedule(
    @Param('id') id: string,
    @Body() body: SetNotificationScheduleBody
  ) {
    ;(
      await this.scheduleNotification.execute({
        notificationId: id,
        date: body.scheduledFor
      })
    ).value as void
  }

  @Patch(':id/schedule/cancel')
  async cancelNotificationSchedule(@Param('id') id: string) {
    ;(
      await this.cancelSchedule.execute({
        notificationId: id
      })
    ).value as void
  }

  @Post()
  async createNotification(@Body() body: CreatenotificationBody): Promise<{
    notification: ReturnType<typeof NotificationViewModel.toHttp>
  }> {
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
      const { notification } = response.value

      return {
        notification: NotificationViewModel.toHttp(notification)
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Unexpected error: ' + error)
    }
  }

  @Post('schedule')
  async scheduledNotification(
    @Body() body: SendScheduledNotificationBody
  ): Promise<{
    notification: ReturnType<typeof NotificationViewModel.toHttp>
  }> {
    const { recipientId, content, category, scheduledFor } = body

    try {
      const response = await this.sendScheduledNotification.execute({
        recipientId,
        content,
        category,
        scheduledFor
      })

      if (response.isLeft()) {
        throw new Error(response.value.message)
      }
      const { notification } = response.value

      return {
        notification: NotificationViewModel.toHttp(notification)
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Unexpected error: ' + error)
    }
  }
}
