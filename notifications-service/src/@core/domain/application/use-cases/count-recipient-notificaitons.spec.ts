import { InMamoryNotificationRepository } from '@test/stubs/in-mamory-notification-repository'
import {
  CountRecipientNotificationsResponse,
  CountRecipientNotificationsUseCase
} from './count-recipient-notificaitons'
import { makeNotification } from '@test/factories/notification-factory'

describe('Count Recipient Notifications UC', () => {
  it('Should be able to count recipient notifications', async () => {
    const repository = new InMamoryNotificationRepository()
    const countRecipientNotifications = new CountRecipientNotificationsUseCase(
      repository
    )

    await repository.create(
      makeNotification({
        recipientId: 'recipient-id-uuid-1'
      })
    )

    await repository.create(
      makeNotification({
        recipientId: 'recipient-id-uuid-1'
      })
    )

    await repository.create(
      makeNotification({
        recipientId: 'recipient-id-uuid-2'
      })
    )

    const { count } = (
      await countRecipientNotifications.execute({
        recipientId: 'recipient-id-uuid-1'
      })
    ).value as CountRecipientNotificationsResponse
    expect(count).toEqual(2)
  })
})
