import { Either, right } from '@shared/either'
import { Content } from '@entities/notification'
import { Notification } from '@entities/notification'
import { NotificationRepository } from '@repositories/notification-repository'

/* eslint-disable @typescript-eslint/no-empty-function */
export interface SendNotificationRequest {
  recipientId: string
  content: string
  category: string
}

export interface SendNotificationResponse {
  notification: Notification
}

export class SendNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  public async execute(
    request: SendNotificationRequest
  ): Promise<Either<Error, SendNotificationResponse>> {
    const { recipientId, content, category } = request
    const notification = Notification.create({
      recipientId,
      content: Content.create(content).value as Content,
      category
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
