import {
  SendNotificationResponse,
  SendNotificationUseCase
} from './send-notification'
import { Notification } from '../../entities/notification'
import { Content } from '../../entities/content'
import { InvalidNotificationError } from '../../entities/notification-error'
import { InvalidContentError } from '../../entities/content-error'

describe('Notification Use Case', () => {
  it('should be able to create a new Notification', async () => {
    const sendNotification = new SendNotificationUseCase()

    const { notification } = (
      await sendNotification.execute({
        recipientId: 'recipient-id-uuid',
        content: 'Notification content',
        category: 'notification-category'
      })
    ).value as unknown as SendNotificationResponse
    expect(notification).toBeTruthy()
  })
})
