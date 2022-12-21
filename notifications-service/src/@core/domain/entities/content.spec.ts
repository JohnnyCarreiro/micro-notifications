import { Content } from './content'
import { InvalidContentError } from './content-error'

describe('Notification Content', () => {
  it('Should be able to create a new content', () => {
    const content = Content.create('Notification Content')
    expect(content).toBeDefined()
  })

  it('Should not be able to create a new content with less than 5 characters', () => {
    const contentError = Content.create('aaa').value as InvalidContentError
    console.log(contentError.message)
    expect(contentError).toBeInstanceOf(InvalidContentError)
  })

  it('Should not be able to create a new content with more than 240 characters', () => {
    const contentError = Content.create('a'.repeat(241))
      .value as InvalidContentError
    console.log(contentError.message)
    expect(contentError).toBeInstanceOf(InvalidContentError)
  })
})
