import {
  SendNotificationResponse,
  SendNotificationUseCase
} from './send-notification'
import { InMamoryNotificationRepository } from '../../../../../test/stubs/in-mamory-notification-repository'

describe('Notification Use Case', () => {
  it('should be able to create a new Notification', async () => {
    const notificationRepository = new InMamoryNotificationRepository()
    const sendNotification = new SendNotificationUseCase(notificationRepository)

    const { notification } = (
      await sendNotification.execute({
        recipientId: 'recipient-id-uuid',
        content: 'Notification content',
        category: 'notification-category'
      })
    ).value as SendNotificationResponse
    expect(notificationRepository.notifications).toHaveLength(1)
    expect(notificationRepository.notifications.at(0)).toEqual(notification)
  })
})
