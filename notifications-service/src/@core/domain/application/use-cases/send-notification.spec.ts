import { SendNotificationUseCase } from './send-notification'

describe('Notification Use Case', () => {
  it('should be able to create a new Notification', async () => {
    const sendNotification = new SendNotificationUseCase()

    const { notification } = await sendNotification.execute({
      recipientId: 'recipient-id-uuid',
      content: 'Notification content',
      category: 'notification-category'
    })
    expect(notification).toBeTruthy()
  })
})
