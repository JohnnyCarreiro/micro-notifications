import {
  Content,
  Notification,
  NotificationProps
} from '@entities/notification'

type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}) {
  return Notification.create({
    recipientId: 'recipient-id-uuid-2',
    content: Content.create('Notification content').value as Content,
    category: 'notification-category',
    ...override
  }).value as Notification
}
