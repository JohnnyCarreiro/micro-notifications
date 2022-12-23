import { Either, left, right } from '@shared/either'
import { NotificationRepository } from '@repositories/notification-repository'
import { NotificationNotFoundException } from './errors/notification-errors'

/* eslint-disable @typescript-eslint/no-empty-function */
export interface UnreadNotificationRequest {
  notificationId: string
}

export type UnreadNotificationResponse = void

export class UnreadNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  public async execute(
    request: UnreadNotificationRequest
  ): Promise<
    Either<NotificationNotFoundException | Error, UnreadNotificationResponse>
  > {
    const { notificationId } = request

    const notification = await this.notificationRepository.findById(
      notificationId
    )

    if (!notification) {
      return left(new NotificationNotFoundException())
    }

    notification.unread()

    await this.notificationRepository.save(notification)

    return right(
      (() => {
        return
      })()
    )
  }
}
