import { InMamoryNotificationRepository } from '@test/stubs/in-mamory-notification-repository'
import { NotificationNotFoundException } from './errors/notification-errors'
import { makeNotification } from '@test/factories/notification-factory'
import { ScheduleNotificationUseCase } from './schedule-notification'

describe('Schedule Notification UC', () => {
  it('Should be able to Schedule a notification', async () => {
    const repository = new InMamoryNotificationRepository()
    const scheduleNotification = new ScheduleNotificationUseCase(repository)

    const notification = makeNotification()
    await repository.create(notification)

    const date: string = new Date(new Date().getDate() + 2).toISOString()

    await scheduleNotification.execute({
      notificationId: notification.id,
      date
    })
    expect(repository.notifications.at(0)?.scheduledFor).toEqual(
      expect.any(Date)
    )
  })
  it('Should not be able to Schedule a notification that not exists', async () => {
    const repository = new InMamoryNotificationRepository()
    const scheduleNotification = new ScheduleNotificationUseCase(repository)
    const date: string = new Date(new Date().getDate() + 2).toISOString()

    const canceldNotification = (
      await scheduleNotification.execute({
        notificationId: 'non-existing-notification-id',
        date
      })
    ).value as NotificationNotFoundException
    expect(canceldNotification).toBeInstanceOf(NotificationNotFoundException)
  })
})
