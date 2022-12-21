import { Content } from './content'
import { Notification } from './notification'
import { InvalidNotificationError } from './notification-error'

describe('Notification', () => {
  it('Should be able to create a new Notification', () => {
    const nottification = Notification.create({
      recipientId: 'recipient-id-uudi',
      content: Content.create('Notification contente').value as Content,
      category: 'notification-category'
    })

    expect(nottification).toBeTruthy()
  })
  it('Should not be able to create a new Notification with a empty recipientId', () => {
    const notification = Notification.create({
      recipientId: '' as unknown as string,
      content: Content.create('Notification contente').value as Content,
      category: 'notification-category'
    })
    console.log('Empity:', notification.value)
    expect(notification.value).toBeInstanceOf(InvalidNotificationError)
  })
  it('Should not be able to create a new Notification with a null recipientId', () => {
    const notification = Notification.create({
      recipientId: null as unknown as string,
      content: Content.create('Notification contente').value as Content,
      category: 'notification-category'
    })
    console.log('Null:', notification.value)
    expect(notification.value).toBeInstanceOf(InvalidNotificationError)
  })
  it('Should not be able to create a new Notification with a undefined recipientId', () => {
    const notification = Notification.create({
      recipientId: undefined as unknown as string,
      content: Content.create('Notification contente').value as Content,
      category: 'notification-category'
    })
    console.log('Undefined:', notification.value)
    expect(notification.value).toBeInstanceOf(InvalidNotificationError)
  })
})
