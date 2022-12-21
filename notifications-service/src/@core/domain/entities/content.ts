import { Either, left, right } from '../../shared/'
import { InvalidContentError } from './content-error'

export class Content {
  private constructor(private readonly content: string) {}

  public static create(content: string): Either<InvalidContentError, Content> {
    if (!!this.isContentLengthValid(content)) {
      const errorMessage = this.isContentLengthValid(content)
      return left(new InvalidContentError(errorMessage as string))
    }
    return right(new Content(content))
  }

  public get value(): string {
    return this.content
  }

  private static isContentLengthValid(value: string): string | boolean {
    if (value.length < 5) {
      return 'Content must be at least 5 characters long.'
    }
    if (value.length > 240) {
      return 'Content must be at most 240 characters long.'
    }
    return true
  }
}
