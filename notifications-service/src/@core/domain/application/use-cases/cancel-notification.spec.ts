import { InMamoryNotificationRepository } from '@test/stubs/in-mamory-notification-repository'
import { CancelNotificationUseCase } from './cancel-notification'
import { Content, Notification } from '@entities/notification'
import { NotificationNotFoundException } from './errors/notification-errors'

describe('Cancel Notification UC', () => {
  it('Should be able to cancel a notification', async () => {
    const repository = new InMamoryNotificationRepository()
    const cancelNotification = new CancelNotificationUseCase(repository)

    const notification = Notification.create({
      recipientId: 'recipient-id-uuid',
      content: Content.create('Notification content').value as Content,
      category: 'notification-category'
    }).value as Notification

    await repository.create(notification)

    await cancelNotification.execute({ notificationId: notification.id })
    expect(repository.notifications.at(0)?.cancelAt).toEqual(expect.any(Date))
  })
  it('Should not be able to cancel a notification that not exists', async () => {
    const repository = new InMamoryNotificationRepository()
    const cancelNotification = new CancelNotificationUseCase(repository)

    const canceldNotification = (
      await cancelNotification.execute({
        notificationId: 'non-existing-notification-id'
      })
    ).value as NotificationNotFoundException
    expect(canceldNotification).toBeInstanceOf(NotificationNotFoundException)
  })
})
