import { Content } from './content'
import { Notification } from './notification'

describe('Notification', () => {
  it('Should be able to create a new Notification', () => {
    const nottification = new Notification({
      recipientId: 'recipient-id-uudi',
      content: new Content('Notification contente'),
      category: 'notification-category'
    })

    expect(nottification).toBeTruthy()
  })
})
