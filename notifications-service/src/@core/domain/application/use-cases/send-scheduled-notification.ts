import { Either, right } from '@shared/either'
import { Content } from '@entities/notification'
import { Notification } from '@entities/notification'
import { NotificationRepository } from '@repositories/notification-repository'

/* eslint-disable @typescript-eslint/no-empty-function */
export interface SendScheduledNotificationRequest {
  recipientId: string
  content: string
  category: string
  scheduledFor: string
}

export interface SendScheduledNotificationResponse {
  notification: Notification
}

export class SendScheduledNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  public async execute(
    request: SendScheduledNotificationRequest
  ): Promise<Either<Error, SendScheduledNotificationResponse>> {
    const { recipientId, content, category, scheduledFor } = request
    const notification = Notification.create({
      recipientId,
      content: Content.create(content).value as Content,
      category,
      scheduledFor: new Date(scheduledFor)
    })

    if (notification.isLeft()) {
      throw new Error(notification.value.message)
    }

    await this.notificationRepository.create(notification.value as Notification)

    return right({
      notification: notification.value as Notification
    })
  }
}
