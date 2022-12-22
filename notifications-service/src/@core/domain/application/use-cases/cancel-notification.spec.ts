import { InMamoryNotificationRepository } from '@test/stubs/in-mamory-notification-repository'
import { CancelNotificationUseCase } from './cancel-notification'
import { NotificationNotFoundException } from './errors/notification-errors'
import { makeNotification } from '@test/factories/notification-factory'

describe('Cancel Notification UC', () => {
  it('Should be able to cancel a notification', async () => {
    const repository = new InMamoryNotificationRepository()
    const cancelNotification = new CancelNotificationUseCase(repository)

    const notification = makeNotification()
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
