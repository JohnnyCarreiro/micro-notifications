import { Either, left, right } from '@shared/either'
import { Content } from '@entities/notification'
import { Notification } from '@entities/notification'
import { NotificationRepository } from '@repositories/notification-repository'
import { NotificationNotFoundException } from './errors/notification-errors'

/* eslint-disable @typescript-eslint/no-empty-function */
export interface CancelNotificationRequest {
  notificationId: string
}

export type CancelNotificationResponse = void

export class CancelNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  public async execute(
    request: CancelNotificationRequest
  ): Promise<
    Either<NotificationNotFoundException | Error, CancelNotificationResponse>
  > {
    const { notificationId } = request

    const notification = await this.notificationRepository.findById(
      notificationId
    )

    if (!notification) {
      return left(new NotificationNotFoundException())
    }

    notification.cancel()

    await this.notificationRepository.save(notification)

    // return right(undefined)

    return right(
      (() => {
        return
      })()
    )
  }
}
