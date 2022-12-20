import { Content } from './content'

describe('Notification Content', () => {
  it('Should be able to create a new content', () => {
    const content = new Content('Notification Content')
    expect(content).toBeDefined()
  })

  it('Should not be able to create a new content with less than 5 characters', () => {
    expect(() => new Content('aaa')).toThrow()
  })

  it('Should not be able to create a new content with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow()
  })
})
