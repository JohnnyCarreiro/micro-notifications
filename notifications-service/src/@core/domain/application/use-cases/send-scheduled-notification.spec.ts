import { InMamoryNotificationRepository } from '../../../../../test/stubs/in-mamory-notification-repository'
import {
  SendScheduledNotificationResponse,
  SendScheduledNotificationUseCase
} from './send-scheduled-notification'

describe('Notification Use Case', () => {
  it('should be able to create a new Scheduled Notification', async () => {
    const notificationRepository = new InMamoryNotificationRepository()
    const sendNotification = new SendScheduledNotificationUseCase(
      notificationRepository
    )

    const date: string = new Date(new Date().getDate() + 2).toISOString()

    const { notification } = (
      await sendNotification.execute({
        recipientId: 'recipient-id-uuid',
        content: 'Notification content',
        category: 'notification-category',
        scheduledFor: date
      })
    ).value as SendScheduledNotificationResponse
    expect(notificationRepository.notifications).toHaveLength(1)
    expect(notificationRepository.notifications.at(0)).toEqual(notification)
    expect(
      notificationRepository.notifications.at(0)?.scheduledFor
    ).toBeTruthy()
  })
})
