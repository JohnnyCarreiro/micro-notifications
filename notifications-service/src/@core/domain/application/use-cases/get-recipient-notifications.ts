import { Either, left, right } from '@shared/either'
import { NotificationRepository } from '@repositories/notification-repository'
import { NotificationNotFoundException } from './errors/notification-errors'
import { Notification } from '@entities/notification'

/* eslint-disable @typescript-eslint/no-empty-function */
export interface GetRecipientNotificationsRequest {
  recipientId: string
}

export interface GetRecipientNotificationsResponse {
  notifications: Notification[]
}

export class GetRecipientNotificationsUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  public async execute(
    request: GetRecipientNotificationsRequest
  ): Promise<
    Either<
      NotificationNotFoundException | Error,
      GetRecipientNotificationsResponse
    >
  > {
    const { recipientId } = request

    const notifications =
      await this.notificationRepository.getRecipientNotifications(recipientId)

    if (notifications instanceof Error) {
      return left(notifications as Error)
    }

    return right({ notifications })
  }
}
