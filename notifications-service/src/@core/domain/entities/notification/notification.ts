import { randomUUID } from 'node:crypto'
import { Replace } from 'src/@core/helpers/replace'
import {
  Content,
  InvalidContentError,
  InvalidNotificationError
} from '@entities/notification'
import { Either, left, right } from '@shared/either'

export interface NotificationProps {
  recipientId: string
  content: Content
  category: string
  cancelAt?: Date | null
  readAt?: Date | null
  scheduledFor?: Date | null
  createdAt: Date
}

export class Notification {
  private readonly _id: string
  private props: NotificationProps

  private constructor(props: NotificationProps, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props
  }

  public static create(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string
  ): Either<InvalidNotificationError, Notification> {
    if (props.content instanceof InvalidContentError) {
      return left(props.content as unknown as InvalidNotificationError)
    }
    if (
      props.recipientId?.length == 0 ||
      props.recipientId == null ||
      props.recipientId == undefined
    ) {
      return left(
        new InvalidNotificationError('recipientId could be null or empty')
      )
    }
    return right(
      new Notification(
        {
          ...props,
          createdAt: props.createdAt ?? new Date()
        },
        id
      )
    )
  }
  public cancel() {
    this.props.cancelAt = new Date()
  }

  public read() {
    this.props.readAt = new Date()
  }

  public unread() {
    this.props.readAt = null
  }

  public cancelSchedule() {
    this.props.scheduledFor = null
  }

  public setSchedule(date: Date) {
    this.props.scheduledFor = date
  }

  public get id(): string {
    return this._id
  }

  public get recipientId(): string {
    return this.props.recipientId
  }

  public set recipientId(value: string) {
    if (value.length < 5) {
      throw new Error('recipientId could be null or empty')
    }
    this.props.recipientId = value
  }

  public get content(): Content {
    return this.props.content
  }

  public set content(value: Content) {
    this.props.content = value
  }

  public get category(): string {
    return this.props.category
  }

  public set category(value: string) {
    this.props.category = value
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt
  }

  public get cancelAt() {
    return this.props.cancelAt
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get scheduledFor(): Date | null | undefined {
    return this.props.scheduledFor
  }
}
