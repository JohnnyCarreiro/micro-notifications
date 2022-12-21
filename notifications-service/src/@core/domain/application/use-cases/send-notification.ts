import { Content } from '../../entities/content'
import { Notification } from '../../entities/notification'

/* eslint-disable @typescript-eslint/no-empty-function */
interface SendNotificationRequest {
  recipientId: string
  content: string
  category: string
}

interface SendNotificationResponse {
  notification: Notification
}

export class SendNotificationUseCase {
  constructor() {}

  async execute(
    request: SendNotificationRequest
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request
    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category
    })

    return {
      notification
    }
  }
}
