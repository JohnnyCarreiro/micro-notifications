import { InMamoryNotificationRepository } from '@test/stubs/in-mamory-notification-repository'
import { NotificationNotFoundException } from './errors/notification-errors'
import { makeNotification } from '@test/factories/notification-factory'
import { UnreadNotificationUseCase } from './unread-notification'

describe('Read Notification UC', () => {
  it('Should be able to Read a notification', async () => {
    const repository = new InMamoryNotificationRepository()
    const unreadNotification = new UnreadNotificationUseCase(repository)

    const notification = makeNotification({
      readAt: new Date()
    })
    await repository.create(notification)

    await unreadNotification.execute({ notificationId: notification.id })
    expect(repository.notifications.at(0)?.readAt).toBeNull()
  })
  it('Should not be able to Read a notification that not exists', async () => {
    const repository = new InMamoryNotificationRepository()
    const unreadNotification = new UnreadNotificationUseCase(repository)

    const canceldNotification = (
      await unreadNotification.execute({
        notificationId: 'non-existing-notification-id'
      })
    ).value as NotificationNotFoundException
    expect(canceldNotification).toBeInstanceOf(NotificationNotFoundException)
  })
})
