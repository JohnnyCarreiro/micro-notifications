import { Either, left, right } from '@shared/either'
import { NotificationRepository } from '@repositories/notification-repository'
import { NotificationNotFoundException } from './errors/notification-errors'

/* eslint-disable @typescript-eslint/no-empty-function */
export interface CountRecipientNotificationsRequest {
  recipientId: string
}

export interface CountRecipientNotificationsResponse {
  count: number
}

export class CountRecipientNotificationsUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  public async execute(
    request: CountRecipientNotificationsRequest
  ): Promise<
    Either<
      NotificationNotFoundException | Error,
      CountRecipientNotificationsResponse
    >
  > {
    const { recipientId } = request

    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId
    )

    return right({ count })
  }
}
