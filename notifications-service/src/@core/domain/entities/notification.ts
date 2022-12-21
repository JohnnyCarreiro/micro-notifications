import { Replace } from 'src/@core/helpers/replace'
import { Content } from './content'
import { Either, left, right } from '../../shared'
import { InvalidNotificationError } from './notification-error'
import { InvalidContentError } from './content-error'

export interface NotificationProps {
  recipientId: string
  content: Content
  category: string
  readAt?: Date | null
  createdAt: Date
}

export class Notification {
  private props: NotificationProps

  private constructor(props: NotificationProps) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date()
    }
  }

  public static create(
    props: Replace<NotificationProps, { createdAt?: Date }>
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
      new Notification({ ...props, createdAt: props.createdAt ?? new Date() })
    )
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

  public set readAt(value: Date | null | undefined) {
    this.props.readAt = value
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}