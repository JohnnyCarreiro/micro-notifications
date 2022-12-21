import { Either, right } from '../../../shared'
import { Content } from '../../entities/content'
import { Notification } from '../../entities/notification'

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
  constructor() {}

  public async execute(
    request: SendNotificationRequest
  ): Promise<Either<Error, SendNotificationResponse>> {
    const { recipientId, content, category } = request
    const notification = Notification.create({
      recipientId,
      content: Content.create(content).value as Content,
      category
    })

    return right({
      notification: notification.value as Notification
    })
  }
}
