import { Either, left, right } from '@shared/either'
import { NotificationRepository } from '@repositories/notification-repository'
import { NotificationNotFoundException } from './errors/notification-errors'

/* eslint-disable @typescript-eslint/no-empty-function */
export interface CancelScheduleRequest {
  notificationId: string
}

export type CancelScheduleResponse = void

export class CancelScheduleUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  public async execute(
    request: CancelScheduleRequest
  ): Promise<
    Either<NotificationNotFoundException | Error, CancelScheduleResponse>
  > {
    const { notificationId } = request

    const notification = await this.notificationRepository.findById(
      notificationId
    )

    if (!notification) {
      return left(new NotificationNotFoundException())
    }

    notification.cancelSchedule()

    await this.notificationRepository.save(notification)

    return right(
      (() => {
        return
      })()
    )
  }
}
