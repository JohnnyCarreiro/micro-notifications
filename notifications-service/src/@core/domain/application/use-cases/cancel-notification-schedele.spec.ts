import { InMamoryNotificationRepository } from '@test/stubs/in-mamory-notification-repository'
import { NotificationNotFoundException } from './errors/notification-errors'
import { makeNotification } from '@test/factories/notification-factory'
import { CancelScheduleUseCase } from './cancel-schedule-notification'

describe('Cancel Notification UC', () => {
  it('Should be able to cancel a notification', async () => {
    const repository = new InMamoryNotificationRepository()
    const cancelSchedule = new CancelScheduleUseCase(repository)

    const notification = makeNotification()
    await repository.create(notification)

    await cancelSchedule.execute({ notificationId: notification.id })
    expect(repository.notifications.at(0)?.scheduledFor).toBeNull()
  })
  it('Should not be able to cancel a notification that not exists', async () => {
    const repository = new InMamoryNotificationRepository()
    const cancelSchedule = new CancelScheduleUseCase(repository)

    const canceldNotification = (
      await cancelSchedule.execute({
        notificationId: 'non-existing-notification-id'
      })
    ).value as NotificationNotFoundException
    expect(canceldNotification).toBeInstanceOf(NotificationNotFoundException)
  })
})
