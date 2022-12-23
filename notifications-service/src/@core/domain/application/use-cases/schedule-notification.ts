import { Either, left, right } from '@shared/either'
import { NotificationRepository } from '@repositories/notification-repository'
import { NotificationNotFoundException } from './errors/notification-errors'

/* eslint-disable @typescript-eslint/no-empty-function */
export interface ScheduleNotificationRequest {
  notificationId: string
  date: string
}

export type ScheduleNotificationResponse = void

export class ScheduleNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  public async execute(
    request: ScheduleNotificationRequest
  ): Promise<
    Either<NotificationNotFoundException | Error, ScheduleNotificationResponse>
  > {
    const { notificationId, date } = request

    const notification = await this.notificationRepository.findById(
      notificationId
    )

    if (!notification) {
      return left(new NotificationNotFoundException())
    }

    notification.setSchedule(new Date(date))

    await this.notificationRepository.save(notification)

    return right(
      (() => {
        return
      })()
    )
  }
}
