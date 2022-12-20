export class Content {
  constructor(private readonly content: string) {
    if (!this.isContentLengthValid(content)) {
      throw new Error(
        'Content must be a minimum 5 characters long, and at maximum 240 characters long'
      )
    }
  }

  public get value(): string {
    return this.content
  }

  private isContentLengthValid(value: string): boolean {
    return value.length >= 5 && value.length <= 240
  }
}
