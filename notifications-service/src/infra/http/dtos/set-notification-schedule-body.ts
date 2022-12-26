import { IsNotEmpty } from 'class-validator'

export class SetNotificationScheduleBody {
  @IsNotEmpty()
  scheduledFor: string
}
