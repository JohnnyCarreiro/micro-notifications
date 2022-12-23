import { Either, left, right } from '@shared/either'
import { NotificationRepository } from '@repositories/notification-repository'
import { NotificationNotFoundException } from './errors/notification-errors'

/* eslint-disable @typescript-eslint/no-empty-function */
export interface ReadNotificationRequest {
  notificationId: string
}

export type ReadNotificationResponse = void

export class ReadNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  public async execute(
    request: ReadNotificationRequest
  ): Promise<
    Either<NotificationNotFoundException | Error, ReadNotificationResponse>
  > {
    const { notificationId } = request

    const notification = await this.notificationRepository.findById(
      notificationId
    )

    if (!notification) {
      return left(new NotificationNotFoundException())
    }

    notification.read()

    await this.notificationRepository.save(notification)

    return right(
      (() => {
        return
      })()
    )
  }
}
