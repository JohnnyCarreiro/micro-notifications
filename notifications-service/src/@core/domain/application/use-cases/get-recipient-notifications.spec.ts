import { InMamoryNotificationRepository } from '@test/stubs/in-mamory-notification-repository'
import { makeNotification } from '@test/factories/notification-factory'
import {
  GetRecipientNotificationsResponse,
  GetRecipientNotificationsUseCase
} from './get-recipient-notifications'

describe('Get Recipient Notifications UC', () => {
  it('Should be able to get recipient notifications', async () => {
    const repository = new InMamoryNotificationRepository()
    const getRecipientNotifications = new GetRecipientNotificationsUseCase(
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

    const { notifications } = (
      await getRecipientNotifications.execute({
        recipientId: 'recipient-id-uuid-1'
      })
    ).value as GetRecipientNotificationsResponse
    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-id-uuid-1' }),
        expect.objectContaining({ recipientId: 'recipient-id-uuid-1' })
      ])
    )
  })
})
