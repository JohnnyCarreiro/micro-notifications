import { InMamoryNotificationRepository } from '@test/stubs/in-mamory-notification-repository'
import { ReadNotificationUseCase } from './read-notification'
import { NotificationNotFoundException } from './errors/notification-errors'
import { makeNotification } from '@test/factories/notification-factory'

describe('Read Notification UC', () => {
  it('Should be able to Read a notification', async () => {
    const repository = new InMamoryNotificationRepository()
    const readNotification = new ReadNotificationUseCase(repository)

    const notification = makeNotification()
    await repository.create(notification)

    await readNotification.execute({ notificationId: notification.id })
    expect(repository.notifications.at(0)?.readAt).toEqual(expect.any(Date))
  })
  it('Should not be able to Read a notification that not exists', async () => {
    const repository = new InMamoryNotificationRepository()
    const readNotification = new ReadNotificationUseCase(repository)

    const canceldNotification = (
      await readNotification.execute({
        notificationId: 'non-existing-notification-id'
      })
    ).value as NotificationNotFoundException
    expect(canceldNotification).toBeInstanceOf(NotificationNotFoundException)
  })
})
